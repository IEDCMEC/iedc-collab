import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import Login from "./Pages/Login/Login";
import initialize from "./Firebase/firebase";
import Navbar from "./Pages/Components/NavigateBar/NavigateBar";
import { ProjectProvider } from "./contexts/ProjectContext";

initialize();

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <ProjectProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route Route path="/collab" component={Collab} />
            {/* <PrivateRoute Route exact path="/workatmec" component={WorkAtMEC} /> */}
          </Switch>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
export default App;
