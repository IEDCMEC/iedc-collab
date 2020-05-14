import AuthContext from "./AuthContext";
import React, { useReducer } from "react";
import { HELLO_WORLD } from "./types";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
  const initState = {
    Name: "",
  };

  const [state, dispatch] = useReducer(AuthReducer, initState);

  const SetName = (data) => {
    dispatch({
      type: HELLO_WORLD,
      payload: data,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        SetName,
        Name: state.Name,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;