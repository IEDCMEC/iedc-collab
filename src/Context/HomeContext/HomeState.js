import AuthContext from "./HomeContext";
import React, { useReducer } from "react";
import { HELLO_WORLD } from "./types";
import HomeReducer from "./HomeReducer";

const HomeState = (props) => {
  const initState = {
    Name: "",
  };

  const [state, dispatch] = useReducer(HomeReducer, initState);

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

export default HomeState;