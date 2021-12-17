import React, { useEffect, useState } from "react";
import { getProjects } from "../Firebase/firebase";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        setSelectedProject(result[0]);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (searchtext) => {
    if (searchtext !== "") {
      let modified = allProjects.filter((itm) =>
        itm.name.toLowerCase().includes(searchtext.toLowerCase())
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
