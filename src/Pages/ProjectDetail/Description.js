import React, { useContext } from "react";
import MainLayout from '../../Components/MainLayout/MainLayout'
import ProjectToggle from "../../Components/ProjectToggle/ProjectToggle";
import ProjectCarousel from "../../Components/ProjectCarousel/ProjectCarousel";
import { ProjectContext } from "../../contexts/ProjectContext";
import DescriptionDetails from "../../Components/DescriptionDetails/DescriptionDetails";
import ProjectNav from "../../Components/ProjectNav/ProjectNav";
import './Description.scss'
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
const Description = () => {

  const { projects, loading } = useContext(ProjectContext);
 
  if (loading) {
    return (
      <div>
        <MainLayout>
        <SuspenseLoader />
      </MainLayout>
      </div>

    );
  }

  return projects.length === 0 ? (
    <><MainLayout>
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
    </MainLayout>
    </>
  ) : (
    <>
    <MainLayout>
    <ProjectCarousel/>
    <div className="container__details">
    
    <ProjectNav/>
    <ProjectToggle/>
    </div>
    <div className="details__container">
    <DescriptionDetails/></div>
    </MainLayout>
    </>
  );
};

export default Description;