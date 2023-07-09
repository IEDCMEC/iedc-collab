import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { renderEmail } from 'react-html-email';
import InviteEmail from '../Components/InviteEmail/InviteEmail';
import { emailUrl } from '../Utils/urls';

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
    prompt: 'select_account',
  });

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const { user } = result;
    const userfromDB = await getUser(user.uid);
    if (userfromDB.val()) {
    } else {
      const userData = {
        name: user.displayName,
        first_name: user.displayName.split(' ').shift(),
        last_name: user.displayName.split(' ').slice(1).join(' '),
        email: user.email,
        profilePhoto: user.photoURL,
      };

      firebase
        .database()
        .ref(`users/${user.uid}`)
        .set(userData)
        .then(() => {
          console.log('User added sucessfully');
          if (onSigninSuccess.typeOf === 'function') onSigninSuccess();
        })
        .catch((error) => {
          alert('Something went wrong');
          console.log(error);
        });
    }
  } catch (error) {
    alert('Something is wrong, please check network connection');
    console.log(error);
  }
};

const defaultPhotoUrl =
  'https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60';

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign out successful');
    })
    .catch((error) => {
      console.log('Sign out unsuccessful');
      alert('Something is wrong, please check network connection');
    });
};

export const doCreateProject = (obj, developers, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert('Please login to add a project');
    return;
  }
  const newProjectID = firebase.database().ref().child('projects').push().key;
  if (obj.projectPhoto) {
    firebase
      .storage()
      .ref(`projectPhoto/${newProjectID}`)
      .put(obj.projectPhoto)
      .then(({ ref }) => {
        ref.getDownloadURL().then((photoUrl) => {
          const createdAt = Date.now();
          const projectData = {
            ...obj,
            projectPhoto: photoUrl,
            id: newProjectID,
            projectPhotoName: obj.projectPhotoName || '',
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
            .ref(`projects/${newProjectID}`)
            .set(projectData)
            .then(() => {
              console.log('Project added sucessfully');
              onSuccess('ADD');
              projectData.teamMembers.forEach((member) => {
                let sent = false;
                developers.forEach((dev) => {
                  if (dev.email === member) {
                    sent = true;
                  }
                });
                if (sent === false) {
                  axios.post(emailUrl, {
                    toEmail: member,
                    subject: 'Invitation to join IEDC Collab',
                    content: renderEmail(
                      <InviteEmail data={projectData} member={member} />
                    ),
                  });
                }
              });
            })
            .catch((error) => {
              alert('Something went wrong');
              console.log(error);
            });
        });
      });
  } else {
    const createdAt = Date.now();
    const projectData = {
      ...obj,
      projectPhoto: defaultPhotoUrl,
      projectPhotoName: 'Default Image',
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

    firebase
      .database()
      .ref(`projects/${newProjectID}`)
      .set(projectData)
      .then(() => {
        console.log('Project added sucessfully');
        onSuccess('ADD');
        projectData.teamMembers.forEach((member) => {
          let sent = false;
          developers.forEach((dev) => {
            if (dev.email === member) {
              sent = true;
            }
          });
          if (sent === false) {
            axios.post(emailUrl, {
              toEmail: member,
              subject: 'Invitation to join IEDC Collab',
              content: renderEmail(
                <InviteEmail data={projectData} member={member} />
              ),
            });
          }
        });
      })
      .catch((error) => {
        alert('Something went wrong');
        console.log(error);
      });
  }
};

export const doDeleteProject = (project_id, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('Please login to add a project');
    return;
  }

  const projectRef = firebase.database().ref(`projects/${project_id}`);

  projectRef
    .child('leader_id')
    .once('value')
    .then((snapshot) => {
      if (snapshot.val() !== user.uid) {
      }
    });
  firebase.storage().ref(`projectPhoto/${project_id}`).delete();
  projectRef
    .remove()
    .then(() => {
      console.log('Project deleted sucessfully');
      onSuccess();
    })
    .catch((error) => {
      alert('Something went wrong');
      console.log(error);
    });
};

export const doEditProject = async (
  obj,
  project_id,
  developers,
  onSuccess = () => {}
) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('Please login to add a project');
    return;
  }
  const projectRef = firebase.database().ref(`projects/${project_id}`);
  const leaderId = (await projectRef.child('leader_id').once('value')).val();
  if (leaderId !== user.uid) {
    alert('Only the project creator can edit the project!');
    return;
  }

  const storedPhoto = (
    await projectRef.child('projectPhoto').once('value')
  ).val();

  let photoUrl;
  if (!obj.projectPhoto) {
    photoUrl = defaultPhotoUrl;
  } else if (obj.projectPhoto !== storedPhoto) {
    try {
      const imgDb = firebase.storage().ref(`projectPhoto/${project_id}`);
      const newimg = await imgDb.put(obj.projectPhoto);
      photoUrl = await newimg.ref.getDownloadURL();
    } catch (error) {
      alert('Something went wrong');
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
    console.log('Project edited sucessfully');
    onSuccess('EDIT');
    projectData.teamMembers.forEach((member) => {
      let sent = false;
      developers.forEach((dev) => {
        if (dev.email === member) {
          sent = true;
        }
      });
      if (sent === false) {
        axios.post(emailUrl, {
          toEmail: member,
          subject: 'Invitation to join IEDC Collab',
          content: renderEmail(
            <InviteEmail data={projectData} member={member} />
          ),
        });
      }
    });
  } catch (error) {
    alert(
      'Something went wrong during edit. Please try againg after some time'
    );
    console.log(error);
  }
};

export const doEditProfile = (obj, onSuccess = () => {}) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('Please login to add a project');
    return;
  }
  console.log(obj.profilePhoto);

  if (obj.profilePhoto && typeof obj.profilePhoto !== 'string') {
    firebase
      .storage()
      .ref(`profilePhoto/${user.uid}`)
      .put(obj.profilePhoto)
      .then(({ ref }) => {
        ref.getDownloadURL().then((photoUrl) => {
          const createdAt = Date.now();
          const userData = {
            ...obj,
            profilePhoto: photoUrl,
            profilePhotoName: obj.profilePhotoName || '',
            name: user.displayName,
            first_name: user.displayName.split(' ').shift(),
            last_name: user.displayName.split(' ').slice(1).join(' '),
            available: true,
            createdAt,
            updatedAt: createdAt,
          };
          console.log(userData);

          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set(userData)
            .then(() => {
              console.log('User added sucessfully');
              onSuccess('ADD');
            })
            .catch((error) => {
              alert('Something went wrong');
              console.log(error);
            });
        });
      });
  } else {
    const createdAt = Date.now();

    const userData = {
      ...obj,
      profilePhoto: obj.profilePhoto
        ? obj.profilePhoto
        : user.providerData[0]?.photoURL,
      name: user.displayName,
      first_name: user.displayName.split(' ').shift(),
      last_name: user.displayName.split(' ').slice(1).join(' '),
      projectPhotoName: 'Default Image',
      available: true,
      createdAt,
      updatedAt: createdAt,
    };

    firebase
      .database()
      .ref(`users/${user.uid}`)
      .set(userData)
      .then(() => {
        console.log('User added sucessfully');
        onSuccess('ADD');
      })
      .catch((error) => {
        alert('Something went wrong');
        console.log(error);
      });
  }
};

export const getProjects = () =>
  firebase.database().ref('projects/').once('value');
export const getDevelopers = () =>
  firebase.database().ref('users/').once('value');

export const getProject = (project_id) =>
  firebase.database().ref('projects/').child(project_id).once('value');

export const getUser = (user_id) =>
  firebase.database().ref('users/').child(user_id).once('value');

export const sendInvite = async (data) => {
  const requestId = firebase.database().ref().child('requests').push().key;
  return firebase
    .database()
    .ref(`requests/${requestId}`)
    .set({
      ...data,
      status: 'pending',
      type: 'invite',
      createdAt: Date.now(),
    })
    .then(() => {
      console.log('invite send successfully');
    })
    .catch((error) => {
      console.log("Oops! invite wasn't sent \n more info:", error);
    });
};

export const sendRequest = async (data) => {
  const requestId = firebase.database().ref().child('requests').push().key;
  return firebase
    .database()
    .ref(`requests/${requestId}`)
    .set({
      ...data,
      status: 'pending',
      type: 'request',
      createdAt: Date.now(),
    })
    .then(() => {
      console.log('request send successfully');
    })
    .catch((error) => {
      console.log("Oops! Request wasn't sent \n more info:", error);
    });
};

export const acceptRequest = async (invite) => {
  try {
    await getProject(invite.project_id).then((project) => {
      console.log(project.val());
      const p = project.val();
      const users = p.teamMembers;
      users.push(invite.sender_email);
      firebase
        .database()
        // .ref(`projects/${invite.project_id}/members/${invite.sender_id}`)
        // .set({ name: invite.sender});
        .ref(`projects/${invite.project_id}/teamMembers/`)
        .set(users);
    });

    // let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
    await firebase
      .database()
      .ref('requests/')
      .update({
        [`/${invite.id}/status`]: 'accepted',
      })
      .then(() => {
        console.log('request accepted successfully');
      });
  } catch (error) {
    console.log("Oops! counldn't accept request \n more info:", error);
  }
};
export const acceptInvite = async (invite) => {
  try {
    await getProject(invite.project_id).then((project) => {
      console.log(project.val());
      const p = project.val();
      const users = p.teamMembers;
      users.push(invite.reciever_email);
      firebase
        .database()
        // .ref(`projects/${invite.project_id}/members/${invite.sender_id}`)
        // .set({ name: invite.sender});
        .ref(`projects/${invite.project_id}/teamMembers/`)
        .set(users);
    });

    // let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
    await firebase
      .database()
      .ref('requests/')
      .update({
        [`/${invite.id}/status`]: 'accepted',
      })
      .then(() => {
        console.log('invite accepted successfully');
      });
  } catch (error) {
    console.log("Oops! counldn't accept invite \n more info:", error);
  }
};
export const declineRequest = async (invite) => {
  try {
    // let addProject = await firebase.database().ref("users/").update({projects: firebase.firestore.FieldValue.arrayUnion({name:invite.project, id:invite.project_id})});
    await firebase
      .database()
      .ref('requests/')
      .update({
        [`/${invite.id}/status`]: 'declined',
      })
      .then(() => {
        console.log('invite declined successfully');
      });
  } catch (error) {
    console.log("Oops! counldn't decline invite \n more info:", error);
  }
};
export const getRequests = async (uid) => {
  try {
    const data = await firebase
      .database()
      .ref('requests/')
      .orderByChild('sender_id')
      .equalTo(uid)
      .once('value');
    const objval = data.val();

    const requests = Object.keys(objval).map((key) => ({
      ...objval[key],
      id: key,
    }));
    const orderedRequests = requests.reverse();

    return orderedRequests;
  } catch (error) {
    console.log(error);
  }
};
export const getRequestsRecieved = async (uid) => {
  try {
    const data = await firebase
      .database()
      .ref('requests/')
      .orderByChild('receiver_id')
      .equalTo(uid)
      .once('value');
    const objval = data.val();

    const requests = Object.keys(objval).map((key) => ({
      ...objval[key],
      id: key,
    }));
    const orderedRequests = requests.reverse();

    return orderedRequests;
  } catch (error) {
    console.log(error);
  }
};

export const getSkills = () => firebase.database().ref('skills/').once('value');

export const addSkills = async (skill) => {
  // var skillId = firebase.database().ref().child("skills").push().key;
  const skills = await getSkills();
  let skillsArray = skills.val();
  if (!skillsArray) {
    skillsArray = [];
  }
  skillsArray.push(skill);

  return firebase
    .database()
    .ref('skills/')
    .set({
      ...skillsArray,
    });
};

export const getTags = () => firebase.database().ref('tags/').once('value');

export const addTags = async (skill) => {
  // var skillId = firebase.database().ref().child("skills").push().key;
  const tags = await getTags();
  let tagsArray = tags.val();
  if (!tagsArray) {
    tagsArray = [];
  }
  tagsArray.push(skill);

  return firebase
    .database()
    .ref('tags/')
    .set({
      ...tagsArray,
    });
};
