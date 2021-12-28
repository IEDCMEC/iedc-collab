import React, { useEffect, useState } from "react";
import { getProjects } from "../Firebase/firebase";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [allProjects, setAllProjects] = useState([]);
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        setSelectedProject,
        loading,
        handleSearch,
        fetchData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
