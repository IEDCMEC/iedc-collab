import ProjectCard from "./ProjectCard";
import React, { useCallback, useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useHistory } from "react-router-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
function ProjectCarousel({ project }) {
  const { projects } = useContext(ProjectContext);
  const history = useHistory();
  const [swiperRef, setSwiperRef] = useState();
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);
  var i = 0;
  function getPosition() {
    for (i = 0; i < projects.length; i++) {
      const projects_list = projects[i].id;
      if (projects_list === project.id) {
        return i;
      }
    }
  }
  return (
    <>
      <div className="project-carousel">
        <div className="left_arrow" onClick={handleLeftClick}>
          <BsArrowLeftCircleFill color="#9e0000" size={30} />
        </div>
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={30}
          initialSlide={getPosition()}
          loop={true}
          breakpoints={{
            // when window width is >= 640px
            768: {
              slidesPerView: 2,
            },
            1275: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            882: {
              slidesPerView: 2,
            },
            280: {
              slidesPerView: 1,
            },
          }}
          className="mySwiper"
        >
          {projects.map((x) => (
            <SwiperSlide key={x.id}>
              <div
                key={x.id}
                onClick={() => {
                  history.push(`/projects/${x.id}`);
                }}
              >
                <ProjectCard
                  name={x.name}
                  teamLeader={x.leader_name}
                  projectId={x.id}
                  project={project}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="right_arrow" onClick={handleRightClick}>
          <BsArrowRightCircleFill color="#9e0000" size={30} />
        </div>
      </div>
    </>
  );
}
export default ProjectCarousel;
