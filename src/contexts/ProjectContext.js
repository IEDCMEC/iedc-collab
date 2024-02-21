import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/Auth/Auth";
import {
  getDevelopers,
  getProjects,
  getRequests,
  getRequestsRecieved,
  getUser,
} from "../Firebase/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const history = useHistory()
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [developers, setDevelopers] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [allJobs, setAllJobs] = useState([])
  const [selectedDevelopers, setSelectedDevelopers] = useState();
  const [profile, setProfile] = useState(null);
  const [allDevelopers, setAllDevelopers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [requestsRecieved, setRequestsRecieved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [devHash, setDevHash] = useState({});
  const [companyDetails, setCompanyDetails] = useState({
    // name: profile?.name || "",
    description: "",
    // company_logo: profile?.profilePhoto || "",
    // role: profile?.role ? profile.role : "Organization",
    website: "",
    address: "",
    // phone: profile?.contact || "",
    // github: "",
    linkedin: "",
    // email: profile?.email || "",
    district: "",
    state: "",
    approved: false,
    deleted: false,
  });
  const fetchData = (state) => {
    let index = 0;
    switch (state) {
      case "ADD":
        index = allProjects.length;
        break;
      case "EDIT":
        index = allProjects.indexOf(selectedProject);
        break;
      default:
        index = 0;
    }
    setLoading(true);
    getProjects()
      // .then(async function (snapshot) {
      //   let messageObject = snapshot;
      //   const result = Object.keys(messageObject).map((key) => ({
      //     ...messageObject[key],
      //     id: key,
      //   }));
      //   setProjects(result);
      //   setAllProjects(result);
      //   setSelectedProject(result[index]);
      // })
      .then((projects) => {
        // var data = [];
        // // console.log(snapshot.docs)
        if (projects.length > 0) {
          // snapshot.docs.forEach((doc) => {
          //   data.push(doc.data());
          // });
          // // // console.log(data)
          // const result = data.map((value, index) => {
          //   return {
          //     ...value,
          //     id: value.id,
          //   };
          // });
          // // console.log(projects)
          setProjects(projects);
          setAllProjects(projects);
          // // console.log(projects);
          setSelectedProject(projects[index]);
        }
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchUserProfile = async () => {
    if (currentUser) {
      // console.log(currentUser);
      setLoading(true);
      getUser(currentUser?.uid).then((profile) => {
        setProfile(profile);
        // // console.log(snapshot.data())
      });
      if ((profile && profile?.length === 0) || profile === null) {
        getUser(currentUser?.uid).then((profile) => {
          setProfile(profile);
          // // console.log(snapshot.data())
          if (profile?.role === "Organization"){
            history.push('/profile')
          }
        });
      }
      // setProfile(profileUser);
      setLoading(false);

    }
  };
  let devMap = {};
  const fetchDevelpersData = (state1) => {
    let index1 = 0;
    switch (state1) {
      case "ADD":
        index1 = allDevelopers.length;
        break;
      case "EDIT":
        index1 = allDevelopers.indexOf(selectedDevelopers);
        break;
      default:
        index1 = 0;
    }
    setLoading(true);
    getDevelopers()
      // .then(async function (snapshot) {
      //   let messageObject = snapshot;
      //   const result1 = Object.keys(messageObject).map((key) => ({
      //     ...messageObject[key],
      //     id: key,
      //   }));
      //   setDevelopers(result1);
      //   setAllDevelopers(result1);
      //   setSelectedDevelopers(result1[index1]);
      //   result1.forEach((itm) => {
      //     devMap[itm.email] = {
      //       name: itm.name,
      //       id: itm.id,
      //     };
      //   });
      //   setDevHash(devMap);
      // })
      .then((devs) => {
        //var data = [];
        if (devs.length > 0) {
          // // console.log(snapshot.docs)
          // devs.forEach((doc) => {
          //   data.push({
          //     ...doc,
          //     id: doc.id,
          //   });
          // });
          setDevelopers(devs);
          setAllDevelopers(devs);
          setSelectedDevelopers(devs[index1]);
          devs.forEach((itm) => {
            devMap[itm.email] = {
              name: itm.name,
              id: itm.id,
            };
          });
          setDevHash(devMap);
        }
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    fetchDevelpersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchUserProfile();
    fetchRequests();
    fetchRequestsRecieved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const fetchRequests = async () => {
    if (currentUser) {
      setLoading(true);
      setRequests(await getRequests(currentUser.uid));
      setLoading(false);
    }
  };
  const fetchRequestsRecieved = async () => {
    if (currentUser) {
      setLoading(true);
      setRequestsRecieved(await getRequestsRecieved(currentUser.uid));
      setLoading(false);
    }
  };
  const handleSearch = (searchtext) => {
    if (searchtext !== "") {
      const modified = allProjects.filter(
        (itm) =>
          itm.name && itm.name.toLowerCase().includes(searchtext.toLowerCase())
      );
      setProjects(modified);
    } else {
      setProjects(allProjects);
    }
  };
  const handleSearchDevelopers = (searchtext) => {
    if (searchtext !== "") {
      setLoading(true);
      const modified = allDevelopers.filter(
        (itm) =>
          itm.name && itm.name.toLowerCase().includes(searchtext.toLowerCase())
      );
      setDevelopers(modified);
      setLoading(false);
    } else {
      setLoading(true);
      setDevelopers(allDevelopers);
      setLoading(false);
    }
  };
  // // console.log(projects, developers);
  return (
    <ProjectContext.Provider
      value={{
        projects,
        developers,
        devHash,
        profile,
        requests,
        requestsRecieved,
        selectedDevelopers,
        allDevelopers,
        setSelectedDevelopers,
        setDevelopers,
        selectedProject,
        setProjects,
        setSelectedProject,
        loading,
        handleSearch,
        handleSearchDevelopers,
        fetchData,
        fetchDevelpersData,
        fetchUserProfile,
        setProfile,
        fetchRequests,
        fetchRequestsRecieved,
        allProjects,
        companyDetails,
        setCompanyDetails,
        allJobs,
        setJobs,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
