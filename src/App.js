import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./Pages/Projects/Projects";
import Landing from "./Pages/Landing/Landing";
import Collab from "./Pages/Collab/Collab";
import initialize from "./Firebase/firebase";
import Developers from "./Pages/Developers/Developers";
import { ProjectProvider } from "./contexts/ProjectContext";
import MyProfile from "./Pages/MyProfile/MyProfile";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Utils/ScrollToTop";
import Ideas from "./Pages/Ideas/Ideas";
import AOS from 'aos';
import 'aos/dist/aos.css';
import DeveloperDetails from "./Pages/DeveloperDetail/DeveloperDetails";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail";

initialize();

function App() {
  AOS.init();
  return (
    <div className="App">
      <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Landing} />
            {/* <Route Route path="/collab" component={Collab} /> */}
            <Route exact path="/projects/:id" component={ProjectDetail} />
            <Route Route path="/projects" component={Projects} />
            
            <Route exact path="/developers/:id" component={DeveloperDetails} />
            <Route Route path="/developers" component={Developers} />
            
            {/* also add project name or id */}
            <Route Route path="/profile" component={MyProfile} />
            {/* endpoint has to be chaged with username */}
            <Route Route path="/ideas" component={Ideas} />
          </Switch>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
    </div>
    
  );
}
export default App;
