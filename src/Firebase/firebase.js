import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { renderEmail } from "react-html-email";
import InviteEmail from "../Components/InviteEmail/InviteEmail";
import { emailUrl } from "../Utils/urls";

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
const initialize = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    // firebase.app(); // if firebase is already initialized, use that instance
    firebase.firestore();
  }
};
export default initialize;

// Authentication functions
export const signIn = async (onSigninSuccess = () => {}) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const userRef = firebase.firestore().collection("users").doc(user.uid);

    // Check if the user already exists in Firestore
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      // User already exists in Firestore
    } else {
      const userData = {
        name: user.displayName,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        email: user.email,
        profilePhoto: user.photoURL,
      };

      await userRef.set(userData);
      console.log("user added successfully");
    }
  } catch (error) {
    alert("Something is wrong, please check network connection");
    console.log(error);
  }
};

const defaultPhotoUrl =
  "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Sign out successful");
    })
    .catch(function (error) {
      console.log("Sign out unsuccessful");
      alert("Something is wrong, please check network connection");
    });
};

export const doCreateProject = async (
  obj,
  developers,
  onSuccess = () => {}
) => {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please login to add a project");
    return;
  }
  // var newProjectID = firebase.database().ref().child("projects").push().key;
  const db = firebase.firestore();
  const storage = firebase.storage();
  try {
    const newProjectRef = db.collection("projects").doc();
    const newProjectID = newProjectRef.id;
    if (obj.projectPhoto) {
      const photoRef = storage.ref(`projectPhoto/${newProjectID}`);
      await photoRef.put(obj.projectPhoto);

      const photoUrl = await photoRef.getDownloadURL();

      const createdAt = Date.now();
      const projectData = {
        ...obj,
        projectPhoto: photoUrl,
        id: newProjectID,
        projectPhotoName: obj.projectPhotoName || "",
        available: true,
        createdAt,
        updatedAt: createdAt,
        leader_id: user.uid,
        leader_name: user.displayName,
        leaderEmail: user.email,
      };

      await newProjectRef.set(projectData);

      console.log("Project added successfully");
      onSuccess("ADD");

      projectData.teamMembers.forEach(async (member) => {
        if (!developers.some((dev) => dev.email === member)) {
          await axios.post(emailUrl, {
            toEmail: member,
            subject: "Invitation to join IEDC Collab",
            content: renderEmail(
              <InviteEmail data={projectData} member={member} />
            ),
          });
        }
      });
    } else {
      const createdAt = Date.now();
      var projectData = {
        ...obj,
        projectPhoto: defaultPhotoUrl,
        projectPhotoName: "Default Image",
        available: true,
        id: newProjectID,
        createdAt,
        updatedAt: createdAt,
        leader_id: user.uid,
        leader_name: user.displayName,
        leaderEmail: user.email,
        leaderImg: user.providerData[0]?.photoURL || null,
      };
      console.log(projectData);
      await newProjectRef.set(projectData);

      console.log("Project added successfully");
      onSuccess("ADD");

      projectData.teamMembers.forEach(async (member) => {
        if (!developers.some((dev) => dev.email === member)) {
          await axios.post(emailUrl, {
            toEmail: member,
            subject: "Invitation to join IEDC Collab",
            content: renderEmail(
              <InviteEmail data={projectData} member={member} />
            ),
          });
        }
      });
    }
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
};

export const doDeleteProject = async (project_id, onSuccess = () => {}) => {
  let user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }

  // let projectRef = firebase.database().ref("projects/" + project_id);
  const db = firebase.firestore();
  const storage = firebase.storage();
  try {
    const projectRef = db.collection("projects").doc(project_id);

    const snapshot = await projectRef.get();
    const leader_id = snapshot.get("leader_id");

    if (leader_id !== user.uid) {
      // If the current user is not the leader of the project, return
      return;
    }

    // Delete project photo from storage
    await storage.ref(`projectPhoto/${project_id}`).delete();

    // Delete the project document from Firestore
    await projectRef.delete();

    console.log("Project deleted successfully");
    onSuccess();
  } catch (err) {
    console.log(err);
  }
};

export const doEditProject = async (
  obj,
  project_id,
  developers,
  onSuccess = () => {}
) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  // const projectRef = firebase.database().ref("projects/" + project_id);
  const db = firebase.firestore();
  const storage = firebase.storage();
  try {
    const projectRef = db.collection("projects").doc(project_id);
    const projectDoc = await projectRef.get();

    const leaderId = projectDoc.get("leader_id");

    if (leaderId !== user.uid) {
      alert("Only the project creator can edit the project!");
      return;
    }

    const storedPhoto = projectDoc.get("projectPhoto");

    let photoUrl;
    if (!obj.projectPhoto) {
      photoUrl = defaultPhotoUrl;
    } else if (obj.projectPhoto !== storedPhoto) {
      try {
        const imgRef = storage.ref(`projectPhoto/${project_id}`);
        await imgRef.put(obj.projectPhoto);
        photoUrl = await imgRef.getDownloadURL();
      } catch (error) {
        alert("Something went wrong");
        console.error(error);
      }
    } else {
      photoUrl = obj.projectPhoto;
    }
    try {
      const projectData = {
        ...obj,
        projectPhoto: photoUrl,
        id: project_id,
        available: true,
        updatedAt: new Date(),
        leader_id: user.uid,
        leader_name: user.displayName,
        leaderEmail: user.email,
        leaderImg: user.providerData[0]?.photoURL || null,
      };
      await projectRef.set(projectData);
      console.log("Project edited sucessfully");
      onSuccess("EDIT");
      projectData.teamMembers.forEach(async (member) => {
        if (!developers.some((dev) => dev.email === member)) {
          await axios.post(emailUrl, {
            toEmail: member,
            subject: "Invitation to join IEDC Collab",
            content: renderEmail(
              <InviteEmail data={projectData} member={member} />
            ),
          });
        }
      });
    } catch (error) {
      alert(
        "Something went wrong during edit. Please try againg after some time"
      );
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const doEditProfile = async (obj, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  // console.log(obj.profilePhoto);
  const db = firebase.firestore();
  const storage = firebase.storage();
  try {
    if (obj.profilePhoto && typeof obj.profilePhoto !== "string") {
      const photoRef = storage.ref(`profilePhoto/${user.uid}`);
      const newPhotoSnapshot = await photoRef.put(obj.profilePhoto);
      const photoUrl = await newPhotoSnapshot.ref.getDownloadURL();

      const createdAt = Date.now();
      const userData = {
        ...obj,
        profilePhoto: photoUrl,
        profilePhotoName: obj.profilePhotoName || "",
        name: user.displayName,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        available: true,
        createdAt,
        updatedAt: createdAt,
      };

      await db.collection("users").doc(user.uid).set(userData);

      console.log("User profile updated successfully");
      onSuccess("ADD");
    } else {
      const createdAt = Date.now();
      const userData = {
        ...obj,
        profilePhoto: obj.profilePhoto || user.providerData[0]?.photoURL,
        name: user.displayName,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        projectPhotoName: "Default Image",
        available: true,
        createdAt,
        updatedAt: createdAt,
      };

      await db.collection("users").doc(user.uid).set(userData);

      console.log("User profile updated successfully");
      onSuccess("ADD");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProjects = async () => {
  const db = firebase.firestore();
  return await db.collection("projects").get();
};
export const getDevelopers = async () => {
  const db = firebase.firestore();
  return await db.collection("users").get();
};

export const getProject = async (project_id) => {
  const db = firebase.firestore();
  return await db.collection("projects").doc(project_id).get();
};

export const getUser = async (user_id) => {
  const db = firebase.firestore();
  return await db.collection("users").doc(user_id).get();
};

export const sendInvite = async (data) => {
  const db = firebase.firestore();
  const requestId = db.collection("requests").doc().id;
  try {
    await db
      .collection("requests")
      .doc(requestId)
      .set({
        ...data,
        status: "pending",
        type: "invite",
        createdAt: Date.now(),
      });

    console.log("Invite sent successfully");
  } catch (error) {
    console.error("Oops! Invite wasn't sent \n more info:", error);
  }
};

export const sendRequest = async (data) => {
  const db = firebase.firestore();
  const requestId = db.collection("requests").doc().id;
  try {
    await db
      .collection("requests")
      .doc(requestId)
      .set({
        ...data,
        status: "pending",
        type: "request",
        createdAt: Date.now(),
      });

    console.log("Request sent successfully");
  } catch (error) {
    console.error("Oops! Request wasn't sent \n more info:", error);
  }
};

export const acceptRequest = async (invite) => {
  try {
    const projectDoc = await getProject(invite.project_id);

    if (projectDoc.exists) {
      const projectData = projectDoc.data();
      let users = projectData.teamMembers || [];
      users.push(invite.sender_email);

      await firebase
        .firestore()
        .collection("projects")
        .doc(invite.project_id)
        .update({
          teamMembers: users,
        });
    }

    //let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
    await firebase.firestore().collection("requests").doc(invite.id).update({
      status: "accepted",
    });

    console.log("Request accepted successfully");
  } catch (error) {
    console.log("Oops! counldn't accept request \n more info:", error);
  }
};
export const acceptInvite = async (invite) => {
  try {
    const projectDoc = await getProject(invite.project_id);

    if (projectDoc.exists) {
      const projectData = projectDoc.data();
      let users = projectData.teamMembers || [];
      users.push(invite.receiver_email);

      await firebase
        .firestore()
        .collection("projects")
        .doc(invite.project_id)
        .update({
          teamMembers: users,
        });
    }

    await firebase.firestore().collection("requests").doc(invite.id).update({
      status: "accepted",
    });

    console.log("Invite accepted successfully");
  } catch (error) {
    console.error("Oops! Couldn't accept invite \n more info:", error);
  }
};
export const declineRequest = async (invite) => {
  try {
    await firebase.firestore().collection("requests").doc(invite.id).update({
      status: "declined",
    });

    console.log("Request declined successfully");
  } catch (error) {
    console.error("Oops! Couldn't decline request \n more info:", error);
  }
};
export const getRequests = async (uid) => {
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection("requests")
      .where("sender_id", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    const requests = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return requests;
  } catch (error) {
    console.error(error);
  }
};
export const getRequestsRecieved = async (uid) => {
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection("requests")
      .where("receiver_id", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    const requests = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return requests;
  } catch (error) {
    console.error(error);
  }
};

export const getSkills = async () => {
  return await firebase.firestore().collection("skills").get();
};

export const addSkills = async (skill) => {
  try {
    const skillsSnapshot = getSkills();

    let skillsArray = [];

    if (!skillsSnapshot.empty) {
      skillsSnapshot.forEach((doc) => {
        skillsArray.push(doc.data());
      });
    }
    skillsArray.push(skill);

    await firebase.firestore().collection('skills').doc("skills").set({
      skills: skillsArray,
    });

    console.log("Skills added successfully");
  } catch (error) {
    console.error("Oops! Couldn't add skills \n more info:", error);
  }
};
export const getTags = async () => {
  const db = firebase.firestore();
  return await db.collection("tags").get();
};
export const addTags = async (tag) => {
  // var skillId = firebase.database().ref().child("skills").push().key;
  try {
    const tagsSnapshot = await getTags();

    let tagsArray = [];

    if (!tagsSnapshot.empty) {
      tagsSnapshot.forEach((doc) => {
        tagsArray.push(doc.data());
      });
    }

    tagsArray.push(tag);

    await firebase.firestore().collection('tags').doc('tags').set({
      tags: tagsArray,
    });

    console.log('Tags added successfully');
  } catch (error) {
    console.error("Oops! Couldn't add tags \n more info:", error);
  }
};
