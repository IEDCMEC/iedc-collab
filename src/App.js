import React from "react";
import AuthState from "./Context/AuthContext/AuthState";
import Landing from "./Pages/Landing/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";


import Project_page from "./Pages/Landing/Project_page";



function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} /> 
          <Route exact path="/home" component={Project_page}/>
        </Switch>
      </BrowserRouter>
    </AuthState>

    
  );
}
export default App;
