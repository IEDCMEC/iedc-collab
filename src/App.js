import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./Pages/Projects/Projects";
import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import initialize from "./Firebase/firebase";
// import Navbar from "./Components/NavigateBar/NavigateBar";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ToastContainer } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';

initialize();

function App() {
  AOS.init();
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          {/* <Navbar /> */}
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route Route path="/collab" component={Collab} />
            <Route Route path="/projects" component={Projects} />
          </Switch>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
export default App;
