import MainLayout from "../../Components/MainLayout/MainLayout";
import "./DeveloperDetails.scss";
import classIcon from "../../assets/class.svg";
import browser from "../../assets/browser.svg";
import phone from "../../assets/phonecircle.svg";
import mail from "../../assets/mailnew.svg";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/githubnew.svg";
// import person from "../../assets/details_left.svg";
import add from "../../assets/add.svg";
import InviteToProjectModal from "../../Components/InviteToProjectModal/InviteToProjectModal";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUser } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import animation from '../../animations/developers.json'
import Lottie from "react-lottie";

function DeveloperDetails() {
  let { id } = useParams();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  const getDev = async (id) => {
    let user = await getUser(id);
    user = await user.val();
    user = { ...user, _id: id };
    setSelectedUser(user);
    setLoading(false);
  };
  useEffect(() => {
    getDev(id);
  }, [id]);
  const [modalShow, setModalShow] = useState(false);
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
                      <img src={browser} alt="" />
                    </a>
                  ) : (
                    ""
                  )}
                  {selectedUser.contact ? (
                    <a
                      href={`tel:+91${selectedUser?.contact}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={phone} alt="" />
                    </a>
                  ) : (
                    ""
                  )}
                  {selectedUser.email ? (
                    <a
                      href={`mailto:${selectedUser?.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={mail} alt="" />
                    </a>
                  ) : (
                    ""
                  )}
                  {selectedUser.linkedin ? (
                    <a
                      href={selectedUser?.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={linkedin} alt="" />
                    </a>
                  ) : (
                    ""
                  )}
                  {selectedUser.github ? (
                    <a
                      href={selectedUser?.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={github} alt="" />
                    </a>
                  ) : (
                    " "
                  )}
                </div>
              </div>
              <div className="developer_class">
                {selectedUser.branch || selectedUser.year ? (
                  <>
                    <img src={classIcon} alt="" />
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
              <div className="developer_details_body_right_header">Skills</div>
              <div style={{
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
                    {selectedUser.projects ? (
                      selectedUser.projects.map((project, index) => {
                        return (
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
                        );
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
                <div className="developer_details_body_right_content">
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
                    setModalShow(true);
                  } else {
                    window.alert("Please Login to continue");
                  }
                }}
              >
                <img src={add} alt="" />
                Invite to Project
              </div>
            </div>
          )}
          {currentUser ? (
            <InviteToProjectModal
              show={modalShow}
              onHide={() => setModalShow(false)}
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
