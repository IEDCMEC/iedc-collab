import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var defaultImage = 'https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
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
export const signIn = async () => {
 
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  // firebase.auth().signOut();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    var user = result.user;
    console.log(user);

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
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });

    return true;
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
  
  var newProjectID = firebase.database().ref().child("projects").push().key;
  if(obj.photo){
  firebase.storage().ref(`projectPhoto/${newProjectID}`).put(obj.photo).then(({ref}) => {
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
    updatedAt: createdAt,
    leader_id: uid,
    leader_name: leaderName,
    createdAt
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
  }, (error) => {alert("Something went wrong\n"+ error); console.log("something went wrong")})
  .catch(error => {alert("Something went wrong\n"+ error); console.log("something went wrong")});}

  //in the absence of image
  else{
    let url = defaultImage
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
      updatedAt: createdAt,
      leader_id: uid,
      leader_name: leaderName,
      createdAt
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
  }
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


export const doEditProject = async (obj,project_id) => {
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
  let photoUrl='';  
   projectRef.child("photo").once("value").then(await function(snapshot){if(snapshot.val()){photoUrl= snapshot.val()}
  else{return 'https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'}});
  if(obj.photo!==''){
 try{
  let imgDb = await firebase.storage().ref(`projectPhoto/${project_id}`)
  let newimg= await imgDb.put(obj.photo)
    photoUrl = await newimg.ref.getDownloadURL()
   alert()
  let uid = user.uid;
  let leaderName = user.displayName;
  const createdAt = Date.now();
  console.log(photoUrl)
projectRef
  .set( {
    name: obj.title,
    desc: obj.desc,
    links: obj.links,
    contactNo: obj.contactNo,
    githubLink: obj.githubLink,
    tags: obj.tags,
    teamMembers: obj.teamMembers,
    photo: photoUrl,
    available: "true",
    updatedAt: createdAt,
    leader_id: uid,
    leader_name: leaderName,
  }

  )
  .then(function () {
    console.log("Project edited sucessfully");
  })
}
catch(error){
  alert("Something went wrong");
  console.log(error);
};
  }}
