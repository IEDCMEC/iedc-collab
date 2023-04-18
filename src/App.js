import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Projects,
  Landing,
  Developers,
  MyProfile,
  Ideas,
  DeveloperDetails,
  ProjectDetail,
  Team,
} from "./Pages/index";
import initialize from "./Firebase/firebase";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Utils/ScrollToTop";
import AOS from "aos";
import NavigateBar from "./Components/NavigateBar/NavigateBar";
import "aos/dist/aos.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext } from "react";
export const ThemeContext =createContext();
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Nunito',
    },
  },
  palette: {
    primary: {
      main: "#9e0000",
    },
    secondary: {
      main: "#F9F9F9",
    },
  },
});
initialize();

function App() {
  const [branch, setBranch] = React.useState([]);
  const [yop, setYop] = React.useState([]);
  const [width, setWidth] = React.useState(0);
  AOS.init();
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <AuthProvider>
        <ProjectProvider>
          <BrowserRouter>
            <NavigateBar />
            <ScrollToTop />
            <ToastContainer />
            <ThemeContext.Provider value={{branch,setBranch,yop,setYop,width,setWidth}}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/projects/:id" component={ProjectDetail} />
              <Route Route path="/projects" component={Projects} />
              <Route
                exact
                path="/developers/:id"
                component={DeveloperDetails}
              />
              <Route Route path="/developers" component={Developers} />
              <Route Route path="/profile" component={MyProfile} />
              <Route Route path="/ideas" component={Ideas} />
              <Route Route path="/team" component={Team} />
            </Switch>
            </ThemeContext.Provider>
          </BrowserRouter>
        </ProjectProvider>
      </AuthProvider>
    </div>
    </ThemeProvider>
  );
}
export default App;
