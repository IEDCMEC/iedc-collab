import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
    firebase.app(); // if firebase is already initialized, use that instance
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
    const userfromDB = await getUser(user.uid);
    if (userfromDB.val()) {
    } else {
      const userData = {
        name: user.displayName,
        first_name: user.displayName.split(" ").shift(),
        last_name: user.displayName.split(" ").slice(1).join(" "),
        email: user.email,
        profilePhoto: user.photoURL,
      };
      console.log(userData);

      firebase
        .database()
        .ref("users/" + user.uid)
        .set(userData)
        .then(function () {
          console.log("User added sucessfully");
          onSigninSuccess();
        })
        .catch(function (error) {
          alert("Something went wrong");
          console.log(error);
        });
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

export const doCreateProject = (obj, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  var newProjectID = firebase.database().ref().child("projects").push().key;
  if (obj.projectPhoto) {
    firebase
      .storage()
      .ref(`projectPhoto/${newProjectID}`)
      .put(obj.projectPhoto)
      .then(({ ref }) => {
        ref.getDownloadURL().then((photoUrl) => {
          const createdAt = Date.now();
          var projectData = {
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
          console.log(projectData);

          firebase
            .database()
            .ref("projects/" + newProjectID)
            .set(projectData)
            .then(function () {
              console.log("Project added sucessfully");
              onSuccess("ADD");
            })
            .catch(function (error) {
              alert("Something went wrong");
              console.log(error);
            });
        });
      });
  } else {
    const createdAt = Date.now();
    var projectData = {
      ...obj,
      projectPhoto: defaultPhotoUrl,
      projectPhotoName: "Default Image",
      available: true,
      createdAt,
      updatedAt: createdAt,
      leader_id: user.uid,
      leader_name: user.displayName,
      leaderEmail: user.email,
      leaderImg: user.providerData[0]?.photoURL || null,
    };
    console.log(projectData);

    firebase
      .database()
      .ref("projects/" + newProjectID)
      .set(projectData)
      .then(function () {
        console.log("Project added sucessfully");
        onSuccess("ADD");
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });
  }
};

export const doDeleteProject = (project_id, onSuccess = () => {}) => {
  let user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }

  let projectRef = firebase.database().ref("projects/" + project_id);

  projectRef
    .child("leader_id")
    .once("value")
    .then(function (snapshot) {
      if (snapshot.val() !== user.uid) {
        return;
      }
    });
  firebase.storage().ref(`projectPhoto/${project_id}`).delete();
  projectRef
    .remove()
    .then(function () {
      console.log("Project deleted sucessfully");
      onSuccess();
    })
    .catch(function (error) {
      alert("Something went wrong");
      console.log(error);
    });
};

export const doEditProject = async (obj, project_id, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  const projectRef = firebase.database().ref("projects/" + project_id);
  const leaderId = (await projectRef.child("leader_id").once("value")).val();
  if (leaderId !== user.uid) {
    alert("Only the project creator can edit the project!");
    return;
  }

  const storedPhoto = (
    await projectRef.child("projectPhoto").once("value")
  ).val();

  let photoUrl;
  if (!obj.projectPhoto) {
    photoUrl = defaultPhotoUrl;
  } else if (obj.projectPhoto !== storedPhoto) {
    try {
      let imgDb = firebase.storage().ref(`projectPhoto/${project_id}`);
      let newimg = await imgDb.put(obj.projectPhoto);
      photoUrl = await newimg.ref.getDownloadURL();
    } catch (error) {
      alert("Something went wrong");
    }
  } else {
    photoUrl = obj.projectPhoto;
  }
  try {
    await projectRef.set({
      ...obj,
      projectPhoto: photoUrl,
      available: true,
      updatedAt: new Date(),
      leader_id: user.uid,
      leader_name: user.displayName,
      leaderEmail: user.email,
      leaderImg: user.providerData[0]?.photoURL || null,
    });
    console.log("Project edited sucessfully");
    onSuccess("EDIT");
  } catch (error) {
    alert(
      "Something went wrong during edit. Please try againg after some time"
    );
    console.log(error);
  }
};

export const doEditProfile = (obj, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  console.log(obj.profilePhoto);

  if (obj.profilePhoto && typeof obj.profilePhoto !== "string") {
    firebase
      .storage()
      .ref(`profilePhoto/${user.uid}`)
      .put(obj.profilePhoto)
      .then(({ ref }) => {
        ref.getDownloadURL().then((photoUrl) => {
          const createdAt = Date.now();
          var userData = {
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
          console.log(userData);

          firebase
            .database()
            .ref("users/" + user.uid)
            .set(userData)
            .then(function () {
              console.log("User added sucessfully");
              onSuccess("ADD");
            })
            .catch(function (error) {
              alert("Something went wrong");
              console.log(error);
            });
        });
      });
  } else {
    const createdAt = Date.now();

    var userData = {
      ...obj,
      profilePhoto: obj.profilePhoto
        ? obj.profilePhoto
        : user.providerData[0]?.photoURL,
      name: user.displayName,
      first_name: user.displayName.split(" ").shift(),
      last_name: user.displayName.split(" ").slice(1).join(" "),
      projectPhotoName: "Default Image",
      available: true,
      createdAt,
      updatedAt: createdAt,
    };

    firebase
      .database()
      .ref("users/" + user.uid)
      .set(userData)
      .then(function () {
        console.log("User added sucessfully");
        onSuccess("ADD");
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });
  }
};

export const getProjects = () => {
  return firebase.database().ref("projects/").once("value");
};
export const getDevelopers = () => {
  return firebase.database().ref("users/").once("value");
};

export const getProject = (project_id) => {
  return firebase.database().ref("projects/").child(project_id).once("value");
};

export const getUser = (user_id) => {
  return firebase.database().ref("users/").child(user_id).once("value");
};


export const sendInvite = async (data) =>{
  await firebase.database().ref(`projects/${data.project_id}/members/${data.sender_id}`).set({name:data.receiver, id:data.receiver_id, status:"pending"});
  var requestId = firebase.database().ref().child("requests").push().key;
  return firebase.database().ref("requests/" + requestId).set(
    {
      ...data,
      status: "pending",
      type:"invite",
      createdAt:Date.now()
    }
  ).then(()=>{
    console.log("invite send successfully");
  }).catch((error)=>{
     console.log("Oops! invite wasn't sent \n more info:", error)
    }
  )
}

export const acceptInvite = async (invite) =>{
 try{ 
   await firebase.database().ref(`projects/${invite.project_id}/members/${invite.sender_id}`).update({status:"accepted"});
  //let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
  firebase.database().ref(`requests/${invite._id}`).update({
     [`status`]:"accepted",
  }).then(()=>{

    console.log("invite accepted successfully");
  })
}
  catch(error){
     console.log("Oops! counldn't accept invite \n more info:", error)
    }
  
}

export const sendRequest = (data, type) =>{
  var requestId = firebase.database().ref().child("requests").push().key;
  return firebase.database().ref("requests/" + requestId).set(
    {
      ...data,
      status: "pending",
      type:"request",
      createdAt:Date.now()
    }
  ).then(()=>{
    console.log("invite send successfully");
  }).catch((error)=>{
     console.log("Oops! invite wasn't sent \n more info:", error)
    }
  )
}

export const acceptRequest = async (invite) =>{
  try{ 
   await firebase.database().ref(`projects/${invite.project_id}/members/${invite.sender_id}`).set({name:invite.sender, id:invite.sender_id, status:"accepted"});
   //let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
   await firebase.database().ref("requests/").update({
      [`/${invite.id}/status`]:"accepted",
   }).then(()=>{
 
     console.log("invite accepted successfully");
   })
 }
   catch(error){
      console.log("Oops! counldn't accept invite \n more info:", error)
     }
   
 }

export const getRequests = async (uid)=>{
  let data = await firebase.database().ref("requests/").orderByChild("sender_id").equalTo(uid).once("value")
  let objval = data.val()
  
  let requests = Object.keys(objval).map((key) => ({
    ...objval[key],
    id: key,
  }));
  return requests ? requests : []
}