import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import initialize from "./Firebase/firebase";
import Navbar from "./Components/NavigateBar/NavigateBar";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ToastContainer } from "react-toastify";

initialize();

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
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
