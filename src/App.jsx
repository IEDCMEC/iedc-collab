import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import { AuthProvider } from './Firebase/Auth/Auth';
import {
  Projects,
  Landing,
  Developers,
  MyProfile,
  Ideas,
  DeveloperDetails,
  ProjectDetail,
  Team,
} from './Pages';
import initialize from './Firebase/firebase';
import { ProjectProvider } from './contexts/ProjectContext';
import ScrollToTop from './Utils/ScrollToTop';
import NavigateBar from './Components/NavigateBar/NavigateBar';
import 'aos/dist/aos.css';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Nunito',
    },
  },
  palette: {
    primary: {
      main: '#9e0000',
    },
    secondary: {
      main: '#F9F9F9',
    },
  },
});
initialize();

function App() {
  // const [branch, setBranch] = React.useState([]);
  // const [yop, setYop] = React.useState([]);
  // const [width, setWidth] = React.useState(0);
  // const [currentWidth, setcurrentWidth] = React.useState(window.innerWidth);
  // const memoizedValue = useMemo(
  //   () => ({
  //     branch,
  //     setBranch,
  //     yop,
  //     setYop,
  //     width,
  //     setWidth,
  //     currentWidth,
  //     setcurrentWidth,
  //   }),
  //   [
  //     branch,
  //     setBranch,
  //     yop,
  //     setYop,
  //     width,
  //     setWidth,
  //     currentWidth,
  //     setcurrentWidth,
  //   ]
  // );

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
              {/* <ThemeContext.Provider value={memoizedValue}> */}
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
              {/* </ThemeContext.Provider> */}
            </BrowserRouter>
          </ProjectProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}
export default App;
