import React, { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ProjectsView from "../Components/Projects/Projects/Projects";

const Collab = () => {
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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h1>No Projects Available</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ProjectsView />
  );
};

export default Collab;
