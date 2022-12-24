import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import React,{ Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Projects ,Landing,Developers,MyProfile,Ideas,DeveloperDetails,ProjectDetail} from "./Pages/index";
import SuspenseLoader from "./Components/SuspenseLoader/SuspenseLoader";
import initialize from "./Firebase/firebase";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Utils/ScrollToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';

initialize();

function App() {
  AOS.init();
  return (
    <div className="App">
      <AuthProvider>
      <ProjectProvider>
        <Suspense fallback={<SuspenseLoader/>}>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/projects/:id" component={ProjectDetail} />
            <Route Route path="/projects" component={Projects} />
            <Route exact path="/developers/:id" component={DeveloperDetails} />
            <Route Route path="/developers" component={Developers} />
            <Route Route path="/profile" component={MyProfile} />
            <Route Route path="/ideas" component={Ideas} />
          </Switch>
        </BrowserRouter>
        </Suspense>
      </ProjectProvider>
    </AuthProvider>
    </div>
    
  );
}
export default App;
