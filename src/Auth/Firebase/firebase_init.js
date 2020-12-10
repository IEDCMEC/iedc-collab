import firebase from "firebase";
import "firebase/auth";

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

	

export const signIn = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({
		prompt: "select_account",
	});

	// firebase.auth().signOut();
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		var user = result.user;
		console.log(user)
		return true
	} catch (error) {
		alert('Something is wrong, please check network connection')
		console.log(error);
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
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
  } 