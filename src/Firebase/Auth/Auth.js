import React, { useEffect, useState } from "react";
import firebase from "firebase";

export const AuthContext = React.createContext();
export const validUserContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [validUserState, setValidUserState] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("uesr changed");
      setCurrentUser(user);
      setPending(false);
      // if(user.email.includes("mec.ac.in"))
      setValidUserState(true);
      // else
      //  setValidity(false)
      //   console.log("in set validity  " + validUserState + user + pending)
    });
  }, [pending, validUserState]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      <validUserContext.Provider
        value={{
          validUserState,
        }}
      >
        {children}
      </validUserContext.Provider>
    </AuthContext.Provider>
  );
};
