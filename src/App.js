import React from 'react';
import { AuthProvider } from "./Firebase/Auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import {
  Projects,
  Landing,
  MyProfile,
  Ideas,
  Team,
  Developers,
  Jobs,
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
import CompanyJobs from "./Pages/CompanyJobs/CompanyJobs";
import ProtectedRoute from "./Components/ProtectedRoute";

export const ThemeContext = createContext();
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
  const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth);
  AOS.init();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <Router>
            <ProjectProvider>
              <NavigateBar />
              <ScrollToTop />
              <ToastContainer />
              <ThemeContext.Provider value={{ branch, setBranch, yop, setYop, width, setWidth, currentWidth, setCurrentWidth }}>
                <Routes>
                <Route path="/" element={<Landing />} />
                  <Route path="/developers" element={<Developers />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/profile" element={<MyProfile />} />
                  
                  <Route element={<ProtectedRoute role={'User'} />}>
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/jobs" element={<Jobs />} />
                  </Route>
                  
                  <Route element={<ProtectedRoute role={'Organization'} />}>
                    <Route path="/MyJobs" element={<CompanyJobs />} />
                  </Route>
                </Routes>
              </ThemeContext.Provider>
            </ProjectProvider>
          </Router>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;