import React, { useContext, useEffect, useState } from "react";
import "./Projects.scss";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Components/MainLayout/MainLayout";
// import { getProjects } from "../../Firebase/firebase";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Pagination } from "@mui/material";
import Drawer from "../Developers/Drawer";
import { ThemeContext } from "../../App";
const Projects = () => {
  // const [projects, setProjects] = useState([]);
  const { projects, loading } = useContext(ProjectContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [works, setWorks] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const getWorks = async () => {
  //   await getProjects().then(async function (snapshot) {
  //     let messageObject = snapshot.docs();
  //     const result = Object.keys(messageObject).map((key) => ({
  //       ...messageObject[key],
  //       id: key,
  //     }));
  //     setProjects(result); setLoading(false);
  //   });
  // };
  // useEffect(() => {
  //   getWorks();

  const filterProjects = () => {
    let filteredProjects = projects;
    if (selectedSkills.length > 0 && selectedTags.length > 0) {
      filteredProjects = filteredProjects.filter((p) => {
        let flag = false;
        p?.skills?.forEach((s) => {
          if (selectedSkills.find((ss) => ss === s)) flag = true;
        });
        p?.tags?.forEach((s) => {
          if (selectedTags.find((ss) => ss === s)) flag = true;
        });
        return flag;
      });
    } else {
      if (selectedSkills.length > 0) {
        filteredProjects = filteredProjects.filter((p) => {
          let flag = false;
          p?.skills?.forEach((s) => {
            if (selectedSkills.find((ss) => ss === s)) flag = true;
          });
          return flag;
        });
      }
      if (selectedTags.length > 0) {
        filteredProjects = filteredProjects.filter((p) => {
          let flag = false;
          p?.tags?.forEach((s) => {
            if (selectedTags.find((ss) => ss === s)) flag = true;
          });
          return flag;
        });
      }
    }
    setWorks(filteredProjects.slice(page * 12, page * 12 + 12));
    setPages(Math.ceil(filteredProjects.length / 12));
  };

  useEffect(() => {
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills, selectedTags]);

  useEffect(() => {
    setPage(0);
    setPages(Math.ceil(projects.length / 12));
    setWorks(projects.slice(page * 12, page * 12 + 12));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);
  useEffect(() => {
    setWorks(projects.slice(page * 12, page * 12 + 12));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const history = useHistory();
  const handleClick = (p) => {
    history.push(`/projects/${p.id}`);
  };
  const [open, setOpen] = useState(false);
  if (loading) {
    return (
      <div>
        <MainLayout route={"Projects"}>
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <MainLayout route={"Projects"}>
        <div
          className="projects_landing"
          style={{
            width: "100vw",
            transition: "0.2s",
          }}
        >
          <Drawer
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            page={"Projects"}
            open={open}
            setOpen={setOpen}
          />
          <div>
            <h3
              style={{ textAlign: "center", padding: "0rem" }}
              className="developer-title"
            >
              {works.length === 0 ? "NOT FOUND" : "PROJECTS"}
            </h3>
            <div>
              {works && works.length === 0 ? (
                <p style={{ fontWeight: "600", color: "black" }}>
                  Refine your filters please ..
                </p>
              ) : null}
            </div>
          </div>
          <div className="projects_cards">
            {works.map((project) => (
              <div
                data-aos="zoom-in"
                key={project.id}
                className="cards"
                onClick={() => handleClick(project)}
              >
                <div className="col-centered">
                  <div className="card" style={{ justifyContent: "center" }}>
                    <div className="card__image-holder">
                      <img
                        className="img-fluid"
                        src={
                          project.projectPhoto ||
                          "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                        }
                        alt="project banner"
                      />
                    </div>
                    <div className="card-title">
                      <h2 className="justify-content-center text-uppercase">
                        {project.name}
                        <small className="justify-content-center text-capitalize">
                          {project.leader_name.toLowerCase()}
                        </small>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            count={pages}
            page={page + 1}
            onChange={(e, val) => {
              setPage(val - 1);
            }}
            color="primary"
            sx={{
              paddingTop: "5rem",
            }}
          />
        </div>
      </MainLayout>
    </div>
  );
};

export default Projects;
