import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { parse, stringify } from "flatted";
import "firebase/firestore";
// import { renderEmail } from "react-html-email";

import axios from "axios";

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

export const UpdateUserDetails = async (data, onSuccess = () => {}) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const obj = data[0];
  const myrole = data[1];
  if (!user) {
    signIn();
    return;
  }
  // // console.log(obj.profilePhoto);
  const storage = firebase.storage();
  try {
    // console.log(obj, myrole, data);
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
        uid: user.uid,
        email: user.email,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        available: true,
        createdAt,
        updatedAt: createdAt,
        role: myrole,
      };

      await db.collection("users").doc(user.uid).set(userData);

      // console.log("User profile updated successfully");
      onSuccess("ADD");
    } else {
      const createdAt = Date.now();
      const userData = {
        ...obj,
        profilePhoto: obj.profilePhoto || user.providerData[0]?.photoURL,
        name: user.displayName,
        uid: user.uid,
        email: user.email,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        projectPhotoName: "Default Image",
        available: true,
        createdAt,
        updatedAt: createdAt,
        role: myrole,
      };

      await db.collection("users").doc(user.uid).set(userData);

      // console.log("User profile updated successfully");
      onSuccess("ADD");
    }
  } catch (err) {
    // console.log(err);
  }
};

export const updateCompanyDetails = async (data, onSuccess = () => {}) => {
  const details = { ...data[0], ...data[1] };
  // // console.log(details)
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  // // console.log(obj.profilePhoto);
  const db = firebase.firestore();
  const storage = firebase.storage();
  try {
    const createdAt = Date.now();
    const userData = {
      ...details,
      createdAt,
      updatedAt: createdAt,
    };

    await db.collection("users").doc(user.uid).set(userData);

    // console.log("User profile updated successfully");
    onSuccess("ADD");
  } catch (err) {
    // console.log(err);
  }
};
// Authentication functions
export const signIn = async () => {
  //onSigninSuccess = () => {}
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
    // // console.log(userSnapshot)
    if (userSnapshot.exists) {
      // User already exists in Firestore
    } else {
      const userData = {
        name: user.displayName,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        email: user.email,
        profilePhoto: user.photoURL,
        uid: user.uid,
        // role: myrole,
      };

      await userRef.set(userData);
      // console.log("user added successfully");
    }
  } catch (error) {
    // console.log(error);
    alert("Something is wrong, please check network connection");
  }
};

const defaultPhotoUrl =
  "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // console.log("Sign out successful");
    })
    .catch(function (error) {
      // console.log("Sign out unsuccessful");
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
        projectPhotoName: obj.projectPhotoName || "",
        available: true,
        createdAt,
        updatedAt: createdAt,
        leader_id: user.uid,
        leader_name: user.displayName,
        leaderEmail: user.email,
      };
      const reqid = await user.getIdToken();
      // // console.log(reqid)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/add`,
        projectData,
        {
          headers: {
            "x-auth-token": reqid,
          },
        }
      );
      // console.log(response);
      // console.log("Project added successfully");
      onSuccess("ADD");

      // projectData.teamMembers.forEach(async (member) => {
      //   if (!developers.some((dev) => dev.email === member)) {
      //     await axios.post(emailUrl, {
      //       toEmail: member,
      //       subject: "Invitation to join IEDC Collab",
      //       content: renderEmail(
      //         <InviteEmail data={projectData} member={member} />
      //       ),
      //     });
      //   }
      // });
    } else {
      const createdAt = Date.now();
      var projectData = {
        ...obj,
        projectPhoto: defaultPhotoUrl,
        projectPhotoName: "Default Image",
        available: true,
        createdAt,
        // updatedAt: createdAt,
        leader_id: user.uid,
        leader_name: user.displayName,
        leaderEmail: user.email,
        leaderImg: user.providerData[0]?.photoURL || null,
      };
      // // console.log(projectData);
      // await newProjectRef.set(projectData);
      // // console.log(projectData);
      // const reqdata = JSON.stringify(projectData);
      // // console.log(reqdata);
      const reqid = await user.getIdToken();
      // // console.log(reqid)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/add`,
        projectData,
        {
          headers: {
            "x-auth-token": reqid,
          },
        }
      );
      // console.log(response);
      // console.log("Project added successfully");
      onSuccess("ADD");

      // projectData.teamMembers.forEach(async (member) => {
      //   if (!developers.some((dev) => dev.email === member)) {
      //     await axios.post(emailUrl, {
      //       toEmail: member,
      //       subject: "Invitation to join IEDC Collab",
      //       content: renderEmail(
      //         <InviteEmail data={projectData} member={member} />
      //       ),
      //     });
      //   }
      // });
    }
  } catch (err) {
    // console.log("Something went wrong");
    // console.log(err);
  }
};

export const doDeleteProject = async (
  project_id,
  photoId,
  photoName,
  onSuccess = () => {}
) => {
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
    if (photoName !== "Default Image") {
      // const photoRef = storage.ref(`projectPhoto/${photoId}`)
      // const snapshot = photoRef.getDownloadURL()
      // console.log(snapshot)
      // console.log(photoId.slice(50))
      await storage.ref(`projectPhoto/${photoId}`).delete();
    }

    // Delete the project document from Firestore
    await projectRef.delete();

    // console.log("Project deleted successfully");
    onSuccess();
  } catch (err) {
    // console.log(err);
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
      // await projectRef.set(projectData);
      const reqid = await user.getIdToken();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/project/edit`,
        projectData,
        {
          headers: {
            "x-auth-token": reqid,
          },
        }
      );

      // console.log(response);

      // console.log("Project edited sucessfully");
      onSuccess("EDIT");
      // projectData.teamMembers.forEach(async (member) => {
      //   if (!developers.some((dev) => dev.email === member)) {
      //     await axios.post(emailUrl, {
      //       toEmail: member,
      //       subject: "Invitation to join IEDC Collab",
      //       content: renderEmail(
      //         <InviteEmail data={projectData} member={member} />
      //       ),
      //     });
      //   }
      // });
    } catch (error) {
      alert(
        "Something went wrong during edit. Please try againg after some time"
      );
      // console.log(error);
    }
  } catch (err) {
    // console.log(err);
  }
};

export const doEditProfile = async (data, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  // // console.log(obj.profilePhoto);
  const db = firebase.firestore();
  const myrole = data[0];
  const obj = data[1];

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
        email: user.email,
        uid: user.uid,
        role: myrole,
      };
      // console.log(user);
      await db.collection("users").doc(user.uid).set(userData);

      // console.log("User profile updated successfully");
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
        email: user.email,
        uid: user.uid,
        role: myrole,
      };

      await db.collection("users").doc(user.uid).set(userData);

      // console.log("User profile updated successfully");
      onSuccess("ADD");
    }
  } catch (err) {
    // console.log(err);
  }
};
export const getProjects = async () => {
  const data = [];
  // const projects = await firebase.firestore().collection("projects").get();
  // .then((snapshot) => {
  //   if (snapshot.docs.length > 0) {
  //     snapshot.docs.forEach((doc) => {
  //       data.push(doc.data());
  //     });
  //   }
  // });
  // // console.log(projects)
  // return projects;
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/project?key=${Math.random()}`
  );
  // // console.log(response.data)
  return response.data;
};
export const getDevelopers = async () => {
  // const data = [];
  // const db = firebase.firestore();
  // const users = db.collection("users").get();
  // .then((snapshot) => {
  //   if (snapshot.docs.length > 0) {
  //     snapshot.docs.forEach((doc) => {
  //       data.push(doc.data());
  //     });
  //   }
  // });
  // // console.log(data);
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/developer?key=${Math.random()}`
  );
  // // console.log(response.data)
  const details = response.data.filter((value, index) => value.role == "User");
  // console.log(details)
  return details;
  // return users;
};

export const getProject = async (project_id) => {
  // var data = [];
  // const db = firebase.firestore();
  // const project = db.collection("projects").doc(project_id).get();
  // // .then((snapshot) => {
  // //   // if (snapshot.docs.length > 0) {
  // //    data = snapshot.data()
  // //    // console.log(snapshot.data())
  // //   // }
  // // });
  // // // console.log(data)
  // return project;
  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/api/project/${project_id}?key=${Math.random()}`
  );
  // console.log(response);
  return response.data;
};

export const getUser = async (user_id) => {
  // let data;
  // const db = firebase.firestore();
  // return await db.collection("users").doc(user_id).get();
  // .then((snapshot) => {
  //   // if (snapshot.docs.length > 0) {
  //   //   snapshot.docs.forEach((doc) => {
  //   //     data.push(doc.data());
  //   //   });
  //   // }
  //   // // console.log(snapshot.data())
  //  data = snapshot.data();
  // });
  // // console.log(user)
  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/api/developer/${user_id}?key=${Math.random()}`
  );
  // console.log(
  //   response.data,
  //   `${process.env.REACT_APP_BACKEND_URL}/api/developer/${user_id}`
  // );
  return response.data;
  // return data;
};

export const sendInvite = async (data) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/project/invite`,
    data,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
};

export const sendRequest = async (data) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/project/join`,
    data,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
};

export const acceptRequest = async (invite) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/project/request/accept`,
    invite,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
};
export const acceptInvite = async (invite) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/project/invite/accept`,
    invite,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
};
export const declineRequest = async (invite) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/project/request/decline`,
    invite,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
};
export const getRequests = async (uid) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/api/project/request/sent?key=${Math.random()}`,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
  return response.data;
};
export const getRequestsRecieved = async (uid) => {
  const user = firebase.auth().currentUser;
  const reqid = await user.getIdToken();

  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/api/project/request/recieved?key=${Math.random()}`,
    {
      headers: {
        "x-auth-token": reqid,
      },
    }
  );
  // console.log(response);
  return response.data;
};

export const getSkills = async () => {
  const data = [];
  const skills = await firebase
    .firestore()
    .collection("skills")
    .doc("skills")
    .get();
  // .then((snapshot) => {
  //   if (snapshot.docs.length > 0) {
  //     snapshot.docs.forEach((doc) => {
  //       data.push(doc.data());
  //     });
  //   }
  // });
  console.log(skills);
  return skills;
};

export const addSkills = async (skill) => {
  try {
    const skillsSnapshot = getSkills();

    var skillsArray = {};

    if (!skillsSnapshot.empty) {
      skillsArray = (await skillsSnapshot).data();
    }
    const values = Object.values(skillsArray);
    const updatedArray = { ...values, [values.length]: skill };
    await firebase
      .firestore()
      .collection("skills")
      .doc("skills")
      .set(updatedArray);

    console.log("Skills added successfully");
  } catch (error) {
    console.error("Oops! Couldn't add skills \n more info:", error);
  }
};
export const getTags = async () => {
  const data = [];
  const tags = await firebase.firestore().collection("tags").doc("tags").get();
  // .then((snapshot) => {
  //   if (snapshot.docs.length > 0) {
  //     snapshot.docs.forEach((doc) => {
  //       data.push(doc.data());
  //     });
  //   }
  // });
  return tags;
};
export const addTags = async (tag) => {
  // var skillId = firebase.database().ref().child("skills").push().key;
  try {
    const tagsSnapshot = await getTags();
    var tagsArray = {};

    if (!tagsSnapshot.empty) {
      tagsArray = tagsSnapshot.data();
    }
    const values = Object.values(tagsArray);
    const updatedArray = { ...values, [values.length]: tag };
    await firebase.firestore().collection("tags").doc("tags").set(updatedArray);
    console.log("Tags added successfully");
  } catch (error) {
    console.error("Oops! Couldn't add tags \n more info:", error);
  }
};
