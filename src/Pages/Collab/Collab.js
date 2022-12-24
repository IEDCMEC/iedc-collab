import React, { useContext } from "react";
import "./Collab.scss";
import ProjectsView from "../../Components/Projects/Projects";
import { ProjectContext } from "../../contexts/ProjectContext";
import Navbar from "../../Components/NavigateBar/NavigateBar";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
const Collab = ({ location: { state } }) => {
  const { projects, loading } = useContext(ProjectContext);

  if (loading) {
    return (
      <div>
        <Navbar />

        <SuspenseLoader />
      </div>
    );
  }

  return projects.length === 0 ? (
    <>
      <Navbar />
      <div className="container not-found">
        <h2
          style={{
            display: "inline-block",
            paddingLeft: "20px",
            color: "var(--primaryColor)",
          }}
        >
          NOT FOUND
        </h2>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <ProjectsView showDetailsDirectly={state?.showDetailsDirectly} />
    </>
  );
};

export default Collab;
