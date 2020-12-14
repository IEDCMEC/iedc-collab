import React from "react";
import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import WorkAtMEC from "./Pages/WorkAtMEC/WorkAtMEC";
import Login from './Pages/Login/Login';
import {initialize} from './Firebase/firebase';
import PrivateRoute from './Firebase/Auth/PrivateRoute';
initialize()
function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={Landing} />
            <PrivateRoute Route exact path="/collab" component={Collab} />
            <PrivateRoute Route exact path="/workatmec" component={WorkAtMEC} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
 
  );
}
export default App;
