import React, { useEffect, useState } from "react";
import { getProjects } from "../Firebase/firebase";
// import { getProjects } from "../../Firebase/firebase";

export const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([{}]);
  const [project, setProject] = useState([{}]);
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
        setProject(result[0]);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project, // selectedProject
        setProject, // setSelectedProject
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
