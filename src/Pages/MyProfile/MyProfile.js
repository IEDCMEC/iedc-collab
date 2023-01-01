import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.scss";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { BsTelephoneInbound } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { TbNetwork } from "react-icons/tb";
import { VscGithubInverted } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { signIn } from "../../Firebase/firebase";
import Received from "../../Components/Request/Received";
import Sent from "../../Components/Request/Sent";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import bubble2 from "../../assets/bubble_2.svg";
import bubble3 from "../../assets/bubble_3.svg";
import bubble1 from "../../assets/bubble_1.svg";
import bubble5 from "../../assets/bubble_5.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { profile, loading, projects } = useContext(ProjectContext);
  const [count, setCount] = useState(false);
  // const [requests, setRequests] = useState([]);
  // const [profile, setSelectedUser] = useState({});
  // const [loading, setLoading] = useState(true);
  const [isReceived, setIsReceived] = useState(true);
  // const [requestsRecieved, setRequestsRecieved] = useState([]);
  const { requests, requestsRecieved } = useContext(ProjectContext);
  const history = useHistory();
  const newprojectClick = async () => {
    if (currentUser) {
      setShowProfileModal(true);
    } else {
      signIn(() => setShowProfileModal(true));
    }
  };
  useEffect(() => {
    if (projects)
      projects.forEach((project) => {
        project.teamMembers?.forEach(
          (member) => member === currentUser?.email && setCount(true)
        );
      });
  }, [projects, currentUser]);
  // const getDev = async (id) => {
  //   const user = await getUser(id);
  //   setSelectedUser(await user.val());
  //   setLoading(false);
  // };

  // const fetchRequests = async () => {
  //   setRequests(await getRequests(currentUser.uid));
  // };
  // const fetchRequestsRecieved = async () => {
  //   setRequestsRecieved(await getRequestsRecieved(currentUser.uid));
  // };
  const getGithubUsername = (url) => {
    const urlArray = url.split("/");
    if (urlArray[urlArray.length - 1] === "") {
      return urlArray[urlArray.length - 2];
    }
    return urlArray[urlArray.length - 1];
  };
  const getLinkedinUsername = (url) => {
    const urlArray = url.split("/");
    if (urlArray[urlArray.length - 1] === "") {
      return urlArray[urlArray.length - 2];
    }
    return urlArray[urlArray.length - 1];
  };
  // useEffect(() => {
  //   if (currentUser?.uid !== undefined) {
  //     // getDev(currentUser?.uid);
  //     // fetchRequests(currentUser?.uid);
  //     // fetchRequestsRecieved(currentUser?.uid);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser]);
  if (loading || !profile) {
    return (
      <div>
        <MainLayout route={"My Profile"}>
          <img src={bubble2} alt="" className="bubble_2_1" />
          <img src={bubble3} alt="" className="bubble_3" />
          <img src={bubble5} alt="" className="bubble_5" />
          <img src={bubble1} alt="" className="bubble_1" />
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }
  return (
    <>
      <MainLayout route={"My Profile"}>
        <div className="my_profile_container">
          <div className="profile_board">
            <div className="pro_image_container">
              <img
                src={
                  profile.profilePhoto ||
                  "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
                }
                className="profile_image"
                data-aos="fade-up"
                alt=""
              />
            </div>

            <div
              className="profile_details_container"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <FiEdit
                  size={36}
                  style={{
                    cursor: "pointer",
                    alignItems: "flex-end",
                  }}
                  alt=""
                  onClick={newprojectClick}
                />
              </div>

              <div className="profile_details_header_name">
                {profile.name.toUpperCase()}
              </div>

              <div className="phone_class">
                <div className="profile_phone">
                  <BsTelephoneInbound size={25} />
                  <div>
                    {profile.contact ? (
                      <a
                        href={`tel:+91${profile.contact}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profile.contact}
                      </a>
                    ) : (
                      <div className="change-in-edit">{"<empty>"}</div>
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <HiOutlineAcademicCap size={25} />
                  <div>
                    {profile?.branch || (
                      <div className="change-in-edit">{"<empty>"}</div>
                    )}
                    {"  "}
                    {profile?.year}
                  </div>
                </div>

                <div className="profile_phone">
                  <MdOutlineEmail size={25} />
                  <div>
                    {(
                      <a
                        href={`mailto:${profile?.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profile?.email}
                      </a>
                    ) || <div className="change-in-edit">{"<empty>"}</div>}
                  </div>
                </div>
                <div className="profile_phone">
                  <TbNetwork size={25} />
                  <div>
                    {profile.website ? (
                      <a
                        href={profile?.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Portfolio Website
                      </a>
                    ) : (
                      <div className="change-in-edit">{"<empty>"}</div>
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <VscGithubInverted size={25} />
                  <div>
                    {profile.github ? (
                      <a
                        href={profile?.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @{getGithubUsername(profile.github)}
                      </a>
                    ) : (
                      <div className="change-in-edit">{"<empty>"}</div>
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <FaLinkedin size={25} />
                  <div>
                    {profile.linkedin ? (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @{getLinkedinUsername(profile.linkedin)}
                      </a>
                    ) : (
                      <div className="change-in-edit">{"<empty>"}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit__pro_box">
            <div
              className="edit__pro_abtMe"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div>About Me</div>
              <div
                className="edit__pro_abtMe_bx"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {profile.about ? (
                  profile.about
                ) : (
                  <div className="skill">About Section Not Added</div>
                )}
              </div>
            </div>

            <div
              className="edit__pro_skls"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div>Skills</div>
              <div className="edit__pro_skls_bx">
                {profile.skills ? (
                  profile.skills.map((skill, index) =>
                    index === profile.skills.length - 1 ? (
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

            <div
              className="edit__pro_achvmts"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div>Achivements</div>
              <div
                className="edit__pro_achvmts_bx"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {profile.achievements ? (
                  profile.achievements
                ) : (
                  <div className="skill">No Achievements Added</div>
                )}
              </div>
            </div>
            <div
              className="edit__pro_projects"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div>Projects</div>
              <div className="developer_details_body_right_content_1">
                <div className="developer_details_body_right_content_projects_1">
                  {count ? (
                    projects.map((project, index) => {
                      return project.teamMembers?.find(
                        (member) => member === currentUser.email
                      ) ? (
                        <div
                          className="developer_details_body_right_content_project"
                          key={index}
                          data-aos="fade-up"
                          data-aos-duration="1500"
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
            <div
              className="edit__pro_achvmts"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              Requests
            </div>
            <div className="edit__pro_box_1">
              {/* <div className="reqs_invite_bar">
                <div className="reqs_invite_bar__requests">Requests</div>
                <div className="reqs_invite_bar__line">|</div>
                <div className="reqs_invite_bar__invite">Invite</div>
              </div> */}
              <div
                className="edit__header"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                <div
                  className={isReceived ? "rec_active" : "received"}
                  onClick={() => setIsReceived(true)}
                >
                  Recieved
                </div>
                <div
                  className={isReceived ? "sent" : "sent_active"}
                  onClick={() => setIsReceived(false)}
                >
                  Sent
                </div>
              </div>
              <div className="requests__cards">
                {isReceived ? (
                  !requestsRecieved ? (
                    <div className="received_sent_box skill">
                      No Requests Recieved
                    </div>
                  ) : (
                    requestsRecieved?.map((request, index) => (
                      <div
                        data-aos="fade-up"
                        key={index}
                        data-aos-duration="1500"
                      >
                        <Received request={request} />
                      </div>
                    ))
                  )
                ) : !requests ? (
                  <div className="received_sent_box skill">
                    No Requests Sent
                  </div>
                ) : (
                  requests?.map((request, index) => (
                    <div
                      data-aos="fade-up"
                      key={index}
                      data-aos-duration="1500"
                    >
                      <Sent
                        request={request}
                        data-aos="fade-up"
                        data-aos-duration="1500"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <EditProfileModal
          user={profile}
          show={showProfileModal}
          onHide={() => setShowProfileModal(false)}
        />
      </MainLayout>
    </>
  );
};
export default MyProfile;
