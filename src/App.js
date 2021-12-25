import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import initialize from "./Firebase/firebase";
import Navbar from "./Components/NavigateBar/NavigateBar";
import { ProjectProvider } from "./contexts/ProjectContext";

initialize();

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route Route path="/collab" component={Collab} />
          </Switch>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
export default App;
