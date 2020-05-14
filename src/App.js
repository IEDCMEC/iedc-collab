import React from "react";
import AuthState from "./Context/AuthContext/AuthState";
import Landing from "./Pages/Landing/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </AuthState>

    
  );
}
export default App;
