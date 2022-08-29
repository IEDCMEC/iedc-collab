import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./Pages/Projects/Projects";
import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import initialize from "./Firebase/firebase";
import Developers from "./Pages/Developers/Developers";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail";
// import Navbar from "./Components/NavigateBar/NavigateBar";
import { ProjectProvider } from "./contexts/ProjectContext";
import MyProfile from "./Pages/MyProfile/MyProfile";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Utils/ScrollToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';

initialize();

function App() {
  AOS.init();
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
        <ScrollToTop/>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route Route path="/collab" component={Collab} />
            <Route Route path="/projects" component={Projects} />
            <Route Route path="/developers" component={Developers} />
            <Route Route path="/project-detail" component={ProjectDetail} />
            <Route Route path="/profile" component={MyProfile} />  
            {/* endpoint has to be chaged with username */}
          </Switch>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
export default App;
