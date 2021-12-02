import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


export const initialize = () => {
	if (!firebase.apps.length) {
		 firebase.initializeApp(config);
	} else {
		firebase.app(); // if already initialized, use that one
	}
};

	
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
		firebase.database()
		.ref("users/" + user.uid)
		.set(userData)
		.then(function() {
			console.log("User added sucessfully");
		}).catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		});

		return true;
	} catch (error) {
		alert('Something is wrong, please check network connection')
		console.log(error);
		// var errorCode = error.code;
		// var errorMessage = error.message;
		// var email = error.email;
		// var credential = error.credential;
	}
};


export const signOut = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Sign out successful");
      }).catch(function(error) {
		console.log("Sign out unsuccessful");
		alert('Something is wrong, please check network connection')
      });
};


// Firebase Realtime Database functions

export const doCreateProject = (name, desc, links) => {
	let user = firebase.auth().currentUser;
	if(!user) {
		alert('Please login to add a project');
		return;
	}

	let uid = user.uid;
	let leaderName = user.displayName;
    const updatedAt = Date.now();
	var newProjectID = firebase.database().ref().child("projects").push().key;
    var projectData = {
      name: name,
      available: "true",
      desc: desc,
      links: links,
      updatedAt: updatedAt,
	  leader_id: uid,
	  leader_name: leaderName,
	};

	firebase.database()
		.ref("projects/" + newProjectID)
		.set(projectData)
		.then(function() {
			console.log("Project added sucessfully");
		}).catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		});
};


export const doDeleteProject = (project_id) => {
	let user = firebase.auth().currentUser;
	if(!user) {
		alert('Please login to add a project');
		return;
	}

	let projectRef = firebase.database()
						.ref("projects/" + project_id);

	projectRef.child("leader_id").once("value").then(function(snapshot) {
		if(snapshot.val() !== user.uid) {
			return;
		}
	});

	projectRef
		.remove()
		.then(function() {
			console.log("Project deleted sucessfully");
		  })
		  .catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		  })
};


export const getProjects = () => {
	return firebase.database()
		.ref("projects/")
		.once("value")		
}


export const getProject = (project_id) => {
	return firebase.database()
	.ref("projects/")
	.child(project_id)
	.once("value")
}

export const getUser = (user_id) => {
	return firebase.database()
	.ref("users/")
	.child(user_id)
	.once("value")
}

export const getCompany = (company_id) => {
	return firebase.database()
	.ref("companies/")
	.child(company_id)
	.once("value")
}

export const getInternships = () => {
	return firebase.database()
		.ref("internships/")
		.once("value")		
}

export const getInternship = (internship_id) => {
	return firebase.database()
	.ref("internships/")
	.child(internship_id)
	.once("value")
}

export const doDeleteInternship = (internship_id) => {
	let user = firebase.auth().currentUser;
	if(!user) {
		alert('Please login to add a project');
		return;
	}

	let internshipRef = firebase.database()
						.ref("internships/" + internship_id);

	internshipRef.child("leader_id").once("value").then(function(snapshot) {
		if(snapshot.val() !== user.uid) {
			return;
		}
	});

	internshipRef
		.remove()
		.then(function() {
			console.log("internship deleted sucessfully");
		  })
		  .catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		  })
};
