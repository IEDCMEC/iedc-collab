import ProjectCard from "./ProjectCard";
import React, { useContext } from "react";
import left from "../../assets/left.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import right from "../../assets/right.svg";
function ProjectCarousel() {
  function leftScroll() {
    const left = document.querySelector(".project-carousel__list");
    left.scrollBy(-150, 0);
  }
  function rightScroll() {
    const right = document.querySelector(".project-carousel__list");
    right.scrollBy(150, 0);
  }
  const { projects, setSelectedProject } = useContext(ProjectContext);
  return (
    <>
      <div className="project-carousel">
        {/* <img src={banner} className="banner" alt=""/> */}
        <div className="left_arrow" onClick={leftScroll}>
          <img src={left} alt="" />
        </div>
        <div className="project-carousel__list">
          {projects.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                setSelectedProject(x);
              }}
            >
              <ProjectCard
                name={x.name}
                teamLeader={x.leader_name}
                projectId={x.id}
              />
            </div>
          ))}
        </div>
        <div className="right_arrow" onClick={rightScroll}>
          <img src={right} alt="" />
        </div>
      </div>
    </>
  );
}
export default ProjectCarousel;
