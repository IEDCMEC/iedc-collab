import React, { useContext } from "react";
import "./Collab.scss";
// import ProjectsView from "../../Components/Projects/Projects";
import { ProjectContext } from "../../contexts/ProjectContext";
// import Nav from "../../Components/Navbar/Navbar";
import MainLayout from "../../Components/MainLayout/MainLayout";
import Navbar from "../../Components/NavigateBar/NavigateBar";
import ProjectCarousel from "../../Components/ProjectCarousel/ProjectCarousel";
const Collab = ({ location: { state } }) => {
  const { projects, loading } = useContext(ProjectContext);

  if (loading) {
    return (
      <div>
        <Navbar/>
        <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading projects...</div>
      </div>
      </div>

    );
  }

  return projects.length === 0 ? (
    <><Navbar/>
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
    <MainLayout/>
    {/* <ProjectsView showDetailsDirectly={state?.showDetailsDirectly} /> */}
    <ProjectCarousel/>
    </>
  );
};

export default Collab;
