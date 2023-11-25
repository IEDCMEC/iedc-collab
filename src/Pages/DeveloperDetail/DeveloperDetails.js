import MainLayout from "../../Components/MainLayout/MainLayout";
import "./DeveloperDetails.scss";
// import person from "../../assets/details_left.svg";
import InviteToProjectModal from "../../Components/InviteToProjectModal/InviteToProjectModal";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUser } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import animation from "../../animations/developers.json";
import Lottie from "react-lottie";
import { IoMdMail } from "react-icons/io";
import { FaGraduationCap, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { TbNetwork } from "react-icons/tb";
// import { GoMarkGithub } from "react-icons/go";
import { HiUserAdd } from "react-icons/hi";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { ProjectContext } from "../../contexts/ProjectContext";

function DeveloperDetails() {
  let { id } = useParams();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { projects } = useContext(ProjectContext);
  const [count, setCount] = useState(false);
  const [open, setOpen] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  // console.log(id)
  const getDev = async (id) => {
    let user = await getUser(id).then((snapshot)=>snapshot.data())
    user = { ...user, _id: id };
    setSelectedUser(user);
    setLoading(false);
  };
  useEffect(() => {
    getDev(id);
  }, [id]);
  useEffect(() => {
    if (projects)
      projects.forEach((project) => {
        project.teamMembers?.forEach(
          (member) => member === selectedUser?.email && setCount(true)
        );
      });
  }, [projects, selectedUser]);
  if (loading) {
    return (
      <div>
        <MainLayout route={"Developers"}>
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }
  return (
    <>
      <MainLayout route={"Developers"}>
        <div className="developer_details_container">
          <div className="developer_details_navbar">
            <BsArrowLeftCircleFill
              color="#9e0000"
              size={40}
              onClick={() => history.goBack()}
              style={{
                cursor: "pointer",
              }}
            />
            <div className="developer_details_navbar_1">
              <div className="developer_image_div">
                <img
                  className="developer_image"
                  src={
                    selectedUser.profilePhoto ||
                    "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
                  }
                  alt=""
                />
              </div>
              <div className="developer_details">
                <div className="developer_details_header">
                  <div className="developer_name">{selectedUser.name}</div>
                  <div className="developer_icons">
                    {selectedUser.website ? (
                      <a
                        href={selectedUser.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TbNetwork size={33} color="#9e0000" />
                      </a>
                    ) : (
                      ""
                    )}
                    {currentUser ? (
                      selectedUser.contact ? (
                        <a
                          href={`tel:+91${selectedUser?.contact}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaPhoneAlt
                            color="#deb8b8"
                            size={35}
                            style={{
                              backgroundColor: "#9e0000",
                              borderRadius: "50%",
                              padding: "8px",
                            }}
                          />
                        </a>
                      ) : (
                        ""
                      )
                    ) : null}
                    {currentUser ? (
                      selectedUser.email ? (
                        <a
                          href={`mailto:${selectedUser?.email}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoMdMail color="#9e0000" size={45} />
                        </a>
                      ) : (
                        ""
                      )
                    ) : null}

                    {selectedUser.linkedin ? (
                      <a
                        href={selectedUser?.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin color="#9e0000" size={35} />
                      </a>
                    ) : (
                      ""
                    )}
                    {/* {selectedUser.github ? (
                      <a
                        href={selectedUser?.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GoMarkGithub color="#9e0000" size={35} />
                      </a>
                    ) : (
                      " "
                    )} */}
                  </div>
                </div>
                <div className="developer_class">
                  {selectedUser.branch || selectedUser.year ? (
                    <>
                      <FaGraduationCap size={28} />
                      <div>
                        {selectedUser.branch} {selectedUser.year}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {selectedUser.about ? (
                  <div className="developer_bio">{selectedUser.about}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="developer_details_body">
            <div className="developer_details_body_left">
              <Lottie
                animationData={animation}
                loop={true}
                autoPlay={true}
                options={defaultOptions}
              />
            </div>
            <div className="developer_details_body_right">
              <div className="developer_details_body_right_section">
                <div className="developer_details_body_right_header">
                  Skills
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    paddingTop: "0.5rem",
                    gap: "0.5rem",
                  }}
                  className="developer_details_body_right_content"
                >
                  {selectedUser.skills ? (
                    selectedUser.skills.map((skill, index) =>
                      index === selectedUser.skills.length - 1 ? (
                        <div className="skill" key={index}>
                          {skill}
                        </div>
                      ) : (
                        <div className="skill" key={index}>
                          {skill} ,
                        </div>
                      )
                    )
                  ) : (
                    <div className="skill">No Skills Added</div>
                  )}
                </div>
              </div>

              <div className="developer_details_body_right_section_1">
                <div className="developer_details_body_right_header">
                  Projects
                </div>
                <div className="developer_details_body_right_content">
                  <div className="developer_details_body_right_content_projects">
                    {count ? (
                      projects.map((project, index) => {
                        return project.teamMembers?.find(
                          (member) => member === selectedUser.email
                        ) ? (
                          <div
                            className="developer_details_body_right_content_project"
                            key={index}
                            onClick={() => {
                              history.push(`/projects/${project.id}`);
                            }}
                          >
                            <div className="developer_details_body_right_content_project_img">
                              <img
                                src={
                                  project.projectPhoto ||
                                  "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                }
                                alt=""
                              />
                            </div>
                            <div className="developer_details_body_right_content_project_title">
                              {project.name}
                            </div>
                            <div className="developer_details_body_right_content_project_lead">
                              {project.leader_name}
                            </div>
                          </div>
                        ) : null;
                      })
                    ) : (
                      <div className="skill">No Projects Added</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="developer_details_body_right_section">
                <div className="developer_details_body_right_header">
                  Achievements
                </div>
                <div
                  className="developer_details_body_right_content"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {selectedUser.achievements ? (
                    selectedUser.achievements
                  ) : (
                    <div className="skill">No Achievements Added</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {id === currentUser?.uid ? (
            ""
          ) : (
            <div className="developer_details_footer_container">
              <div
                className="developer_details_footer"
                onClick={() => {
                  if (currentUser) {
                    setOpen(true);
                  } else {
                    window.alert("Please Login to continue");
                  }
                }}
              >
                <HiUserAdd size={30} />
                Invite to Project
              </div>
            </div>
          )}
          {currentUser ? (
            <InviteToProjectModal
              open={open}
              onClose={() => setOpen(false)}
              user={currentUser}
              selectedUser={selectedUser}
            />
          ) : (
            ""
          )}
        </div>
      </MainLayout>
    </>
  );
}
export default DeveloperDetails;
