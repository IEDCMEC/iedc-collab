import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ProjectsView from "../Components/Projects/Projects/Projects";
import { ProjectProvider } from "./ProjectContext";

const Collab = (props) => {
  const { projects } = useContext(ProjectContext);
  if (projects.length === 0)
    return (
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
    );
  return (
    <div>
      <ProjectsView />;
    </div>
  );
};

export default Collab;
