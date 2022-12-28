import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/Auth/Auth";
import { getDevelopers, getProjects, getRequests, getRequestsRecieved, getUser } from "../Firebase/firebase";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState();
  const [profile, setProfile] = useState();
  const [allDevelopers, setAllDevelopers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [requestsRecieved, setRequestsRecieved] = useState([]);
  const [loading, setLoading] = useState(false);

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
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        const result = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          id: key,
        }));
        setProjects(result);
        setAllProjects(result);
        setSelectedProject(result[index]);
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchUserProfile = async () => {
    if (currentUser) {
      setLoading(true);
      const profileUser = await getUser(currentUser?.uid);
      setProfile(await profileUser.val());
      setLoading(false);
    }
  };
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
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        const result1 = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          id: key,
        }));
        setDevelopers(result1);
        setAllDevelopers(result1);
        setSelectedDevelopers(result1[index1]);
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    fetchDevelpersData();
    if (currentUser) {
      fetchUserProfile();
      fetchRequests();
      fetchRequestsRecieved();
    }
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
      setRequests(await getRequests(currentUser.uid))
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
      const modified = allDevelopers.filter(
        (itm) =>
          itm.name && itm.name.toLowerCase().includes(searchtext.toLowerCase())
      );
      setDevelopers(modified);
    } else {
      setDevelopers(allDevelopers);
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        projects,
        developers,
        profile,
        requests,
        requestsRecieved,
        selectedDevelopers,
        allDevelopers,
        setSelectedDevelopers,
        selectedProject,
        setSelectedProject,
        loading,
        handleSearch,
        handleSearchDevelopers,
        fetchData,
        allProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
