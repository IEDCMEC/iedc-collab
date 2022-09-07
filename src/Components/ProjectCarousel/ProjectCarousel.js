import ProjectCard from "./ProjectCard";
import React, { useCallback, useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import left from "../../assets/left.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import right from "../../assets/right.svg";
function ProjectCarousel() {
  const { projects, setSelectedProject } = useContext(ProjectContext);
  const { selectedProject } = useContext(ProjectContext);
  const [swiperRef, setSwiperRef] = useState();
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);
var i=0;
function getPosition()
{
  for(i=0;i<projects.length;i++){
    const projects_list =projects[i].id;
    if(projects_list===selectedProject.id)
      {
        return i;
      }
      }
      
}
  return (
    <>
    <div className="project-carousel">
    <div className="left_arrow" onClick={handleLeftClick}>
    <img src={left} className="carousel_arrow"alt="" />
        </div>
    <Swiper
    onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        initialSlide={getPosition()}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          768: {
            slidesPerView: 2,
          },
          1275: {
            slidesPerView: 4,
          },
          // when window width is >= 768px
          882: {
            slidesPerView: 3,

          },
          280:
          {
            slidesPerView: 1,
          }
        }}
        className="mySwiper"
      >
        {projects.map((x) => (
            <SwiperSlide><div
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
            </div></SwiperSlide>
          ))}
      </Swiper>
      
      <div className="right_arrow" onClick={handleRightClick}>
          <img src={right} className="carousel_arrow" alt="" />
        </div>
      </div>
    </>
  );
}
export default ProjectCarousel;
