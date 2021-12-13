import React, { useEffect, useState } from "react";
import { getProjects } from "../Firebase/firebase";
// import { getProjects } from "../../Firebase/firebase";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([{}]);
  const [project, setProject] = useState([{}]);

  useEffect(() => {
    getProjects()
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        const result = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          id: key,
        }));
        setProjects(result);
        setProject(result[0]);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project, // selectedProject
        setProject, // setSelectedProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
