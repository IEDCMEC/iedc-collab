import ProjectCard from "./ProjectCard";
import React, { useCallback, useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import left from "../../assets/left.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import right from "../../assets/right.svg";
function ProjectCarousel() {
  const { projects, setSelectedProject } = useContext(ProjectContext);
  const [swiperRef, setSwiperRef] = useState();
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <>
    <div className="project-carousel">
    <div className="left_arrow" onClick={handleLeftClick}>
    <img src={left} alt="" />
        </div>
    <Swiper
    onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        initialSlide={1}
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
          <img src={right} alt="" />
        </div>
      </div>
    </>
  );
}
export default ProjectCarousel;
