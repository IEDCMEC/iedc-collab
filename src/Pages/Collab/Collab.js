import React, { useContext } from "react";
import "./Collab.scss";
import ProjectsView from "../../Components/Projects/Projects";
import { ProjectContext } from "../../contexts/ProjectContext";
import notfound from "../../assets/notfound.jpg";

const Collab = ({ location: { state } }) => {
  const { projects, loading } = useContext(ProjectContext);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading projects...</div>
      </div>
    );
  }

  return projects.length === 0 ? (
    <div className="container not-found">
      <img
        style={{
          height: "120px",
          width: "120px",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
        src={notfound}
        alt="not-found"
      />
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
  ) : (
    <ProjectsView showDetailsDirectly={state?.showDetailsDirectly} />
  );
};

export default Collab;
