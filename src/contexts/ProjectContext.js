import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/Auth/Auth";
import {
  getDevelopers,
  getProjects,
  getRequests,
  getRequestsRecieved,
  getUser,
  getTags,
  getSkills,
} from "../Firebase/firebase";
import { useHistory } from "react-router-dom";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [developers, setDevelopers] = useState(null);
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState();
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [requestsRecieved, setRequestsRecieved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [devHash, setDevHash] = useState({});
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({
    description: "",
    website: "",
    address: "",
    linkedin: "",
    district: "",
    state: "",
    approved: false,
    deleted: false,
  });
  const { currentUser } = useContext(AuthContext);

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
      .then((projects) => {
        if (projects.length > 0) {
          setProjects(projects);
          setAllProjects(projects);
          setSelectedProject(projects[index]);
        }
      })
      .catch((error) => {
        alert("Something went wrong. Please try again after some time.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchUserProfile = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const profile = await getUser(currentUser?.uid);
        setProfile(profile);
        if (!profile || profile.length === 0) {
          const fetchedProfile = await getUser(currentUser?.uid);
          setProfile(fetchedProfile);
          if (fetchedProfile?.role === "Organization" && !fetchedProfile?.description) {
            history.push("/profile");
          }
        }
      } catch (error) {
        alert("Error fetching user profile. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
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
      .then((devs) => {
        if (devs.length > 0) {
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
      .catch((error) => {
        alert("Something went wrong. Please try again after some time.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAbilities = async () => {
    try {
      const snapshot = await getSkills();
      setSkills(Object.values(snapshot.data()));
    } catch (error) {
      alert("Error fetching skills. Please try again.");
      console.error(error);
    }
  };

  const getTagDetails = async () => {
    try {
      const snapshot = await getTags();
      setTags(Object.values(snapshot.data()));
    } catch (error) {
      alert("Error fetching tags. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDevelpersData();
  }, []);

  useEffect(() => {
    fetchUserProfile();
    fetchRequests();
    fetchRequestsRecieved();
  }, [currentUser]);

  useEffect(() => {
    getAbilities();
  }, []);

  useEffect(() => {
    getTagDetails();
  }, []);

  const fetchRequests = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const requests = await getRequests(currentUser.uid);
        setRequests(requests);
      } catch (error) {
        alert("Error fetching requests. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchRequestsRecieved = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const requests = await getRequestsRecieved(currentUser.uid);
        setRequestsRecieved(requests);
      } catch (error) {
        alert("Error fetching received requests. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
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
        skills,
        setSkills,
        tags,
        setTags
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
