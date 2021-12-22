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
    firebase.app(); // if already initialized, use that one
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
    const userData = {
      name: user.displayName,
      email: user.email,
    };
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
  } catch (error) {
    alert("Something is wrong, please check network connection");
    console.log(error);
  }
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("Sign out successful");
    })
    .catch(function (error) {
      console.log("Sign out unsuccessful");
      alert("Something is wrong, please check network connection");
    });
};

// Firebase Realtime Database functions
export const doCreateProject = (obj) => {
  firebase.storage().ref(`projectPhoto/${obj.photo.name}`).put(obj.photo).then(({ref}) => {
    ref.getDownloadURL().then((url)=>{
    let user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }
  let title = obj.title;
  let desc = obj.desc;
  let links = obj.links;
  let contactNo = obj.contactNo;
  let githubLink = obj.githubLink;
  let tags = obj.tags;
  let teamMembers = obj.teamMembers;
  let photo = url;
  let uid = user.uid;
  let leaderName = user.displayName;
  const createdAt = Date.now();
  var newProjectID = firebase.database().ref().child("projects").push().key;
  var projectData = {
    name: title,
    desc: desc,
    links: links,
    contactNo: contactNo,
    githubLink: githubLink,
    tags: tags,
    teamMembers: teamMembers,
    photo: photo,
    available: "true",
    createdAt,
    updatedAt: createdAt,
    leader_id: uid,
    leader_name: leaderName,
  };

  firebase
    .database()
    .ref("projects/" + newProjectID)
    .set(projectData)
    .then(function () {
      console.log("Project added sucessfully");
    })
    .catch(function (error) {
      alert("Something went wrong");
      console.log(error);
    });
  });
  });
};

export const doDeleteProject = (project_id) => {
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

  projectRef
    .remove()
    .then(function () {
      console.log("Project deleted sucessfully");
    })
    .catch(function (error) {
      alert("Something went wrong");
      console.log(error);
    });
};

export const getProjects = () => {
  return firebase.database().ref("projects/").once("value");
};

export const getProject = (project_id) => {
  return firebase.database().ref("projects/").child(project_id).once("value");
};

export const getUser = (user_id) => {
  return firebase.database().ref("users/").child(user_id).once("value");
};

export const getCompany = (company_id) => {
  return firebase.database().ref("companies/").child(company_id).once("value");
};

export const getInternships = () => {
  return firebase.database().ref("internships/").once("value");
};

export const getInternship = (internship_id) => {
  return firebase
    .database()
    .ref("internships/")
    .child(internship_id)
    .once("value");
};

export const doDeleteInternship = (internship_id) => {
  let user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login to add a project");
    return;
  }

  let internshipRef = firebase.database().ref("internships/" + internship_id);

  internshipRef
    .child("leader_id")
    .once("value")
    .then(function (snapshot) {
      if (snapshot.val() !== user.uid) {
        return;
      }
    });

  internshipRef
    .remove()
    .then(function () {
      console.log("internship deleted sucessfully");
    })
    .catch(function (error) {
      alert("Something went wrong");
      console.log(error);
    });
};
/*export function getImageURL(image) {
  var storageref = firebase.storage().ref('projectPhoto/' + image);
var uploadTask = storageref.put(image);

uploadTask.on('state_changed', function(snapshot){
}, function(error){
  console.error(error);
}, function() {
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    image = downloadURL;
    
  });
});
 
} */