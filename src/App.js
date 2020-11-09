import React from "react";
import AuthState from "./Context/AuthContext/AuthState";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import WorkAtMEC from "./Pages/WorkAtMEC/WorkAtMEC";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/collab" component={Collab} />
          <Route exact path="/workatmec" component={WorkAtMEC} />
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
}
export default App;
