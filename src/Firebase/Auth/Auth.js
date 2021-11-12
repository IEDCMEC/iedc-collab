import React, { useEffect, useState } from "react";
//import app from "./base.js";
import firebase from "firebase";


export const AuthContext = React.createContext();
export const validUserContext = React.createContext();
export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [validUserState, setValidity ] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("uesr changed");
      setCurrentUser(user)
      setPending(false)
      console.log("out set validity  " + validUserState + user + pending)
      if(user.email.includes("mec.ac.in"))
        setValidity(true)
      else
       setValidity(false)
        console.log("in set validity  " + validUserState + user + pending)

    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      <validUserContext.Provider
      value={{
        validUserState
      }}
      >
        {children}
      </validUserContext.Provider>
    </AuthContext.Provider>
  );
};
