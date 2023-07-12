import React, { useCallback, useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useHistory } from 'react-router-dom';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { ProjectContext } from '../../contexts/ProjectContext';
import ProjectCard from './ProjectCard';

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
  let i = 0;
  function getPosition() {
    for (i = 0; i < projects.length; i += 1) {
      const projectsList = projects[i].id;
      if (projectsList === project.id) {
        return i;
      }
    }
    return 0;
  }
  return (
    <div className="project-carousel">
      <button type="button" className="left_arrow" onClick={handleLeftClick}>
        <BsArrowLeftCircleFill color="#9e0000" size={30} />
      </button>
      <Swiper
        onSwiper={setSwiperRef}
        spaceBetween={30}
        initialSlide={getPosition()}
        loop
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
            <button
              type="button"
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
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <button type="button" className="right_arrow" onClick={handleRightClick}>
        <BsArrowRightCircleFill color="#9e0000" size={30} />
      </button>
    </div>
  );
}

ProjectCarousel.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCarousel;
