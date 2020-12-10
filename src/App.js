import React from "react";
import { AuthProvider } from "./Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import WorkAtMEC from "./Pages/WorkAtMEC/WorkAtMEC";
import Login from './Pages/Login/Login'
import {initialize} from './Auth/Firebase/firebase_init'
initialize()
function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/collab" component={Collab} />
            <Route exact path="/workatmec" component={WorkAtMEC} />
            <Route exact path="/login" component={Login}/>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
 
  );
}
export default App;
