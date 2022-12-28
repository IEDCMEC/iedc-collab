import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.scss";
import edit_icon from "../../assets/edit_profile_icon.svg";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { BsTelephoneInbound } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { TbNetwork } from "react-icons/tb";
import { VscGithubInverted } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { getRequestsRecieved, getUser, signIn } from "../../Firebase/firebase";
import Received from "../../Components/Request/Received";
import Sent from "../../Components/Request/Sent";
import { getRequests } from "../../Firebase/firebase";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import bubble2 from "../../assets/bubble_2.svg";
import bubble3 from "../../assets/bubble_3.svg";
import bubble1 from "../../assets/bubble_1.svg";
import bubble5 from "../../assets/bubble_5.svg";
const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isReceived, setIsReceived] = useState(true);
  const [requestsRecieved, setRequestsRecieved] = useState([]);
  const newprojectClick = async () => {
    if (currentUser) {
      setShowProfileModal(true);
    } else {
      signIn(() => setShowProfileModal(true));
    }
  };

  const getDev = async (id) => {
    const user = await getUser(id);
    setSelectedUser(await user.val());
    setLoading(false);
  };

  const fetchRequests = async () => {
    setRequests(await getRequests(currentUser.uid));
  };
  const fetchRequestsRecieved = async () => {
    setRequestsRecieved(await getRequestsRecieved(currentUser.uid));
  };
  const getGithubUsername = (url) => {
    const urlArray = url.split("/");
    return urlArray[urlArray.length - 1];
  };
  const getLinkedinUsername = (url) => {
    const urlArray = url.split("/");
    return urlArray[urlArray.length - 1];
  };
  useEffect(() => {
    if (currentUser?.uid !== undefined) {
      getDev(currentUser?.uid);
      fetchRequests(currentUser?.uid);
      fetchRequestsRecieved(currentUser?.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (loading) {
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
                  selectedUser.profilePhoto ||
                  "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
                }
                className="profile_image"
                alt=""
              />
            </div>

            <div className="profile_details_container">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src={edit_icon}
                  style={{
                    width: "2rem",
                    cursor: "pointer",
                    alignItems: "flex-end",
                  }}
                  alt=""
                  onClick={newprojectClick}
                />
              </div>

              <div className="profile_details_header_name">
                {selectedUser.name}
              </div>

              <div className="phone_class">
                <div className="profile_phone">
                  <BsTelephoneInbound size={25} />
                  <div>
                    {selectedUser.contact ? (
                      <a
                        href={`tel:+91${selectedUser.contact}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedUser.contact}
                      </a>
                    ) : (
                      "Change in Edit Profile"
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <HiOutlineAcademicCap size={25} />
                  <div>
                    {selectedUser?.branch || "Change in Edit Profile"}
                    {selectedUser?.year}
                  </div>
                </div>

                <div className="profile_phone">
                  <MdOutlineEmail size={25} />
                  <div>
                    {(
                      <a
                        href={`mailto:${selectedUser?.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedUser?.email}
                      </a>
                    ) || "Change in Edit Profile"}
                  </div>
                </div>
                <div className="profile_phone">
                  <TbNetwork size={25} />
                  <div>
                    {selectedUser.website ? (
                      <a
                        href={selectedUser?.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Portfolio Website
                      </a>
                    ) : (
                      "Change in Edit Profile"
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <VscGithubInverted size={25} />
                  <div>
                    {selectedUser.github ? (
                      <a
                        href={selectedUser?.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @ {getGithubUsername(selectedUser.github)}
                      </a>
                    ) : (
                      "Change in Edit Profile"
                    )}
                  </div>
                </div>
                <div className="profile_phone">
                  <FaLinkedin size={25} />
                  <div>
                    {selectedUser.linkedin ? (
                      <a
                        href={selectedUser.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @ {getLinkedinUsername(selectedUser.linkedin)}
                      </a>
                    ) : (
                      "Change in Edit Profile"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit__pro_box">
            <div className="edit__pro_abtMe">
              <div>About Me</div>
              <div className="edit__pro_abtMe_bx">
                {selectedUser.about ? (
                  selectedUser.about
                ) : (
                  <div className="skill">About Section Not Added</div>
                )}
              </div>
            </div>

            <div className="edit__pro_skls">
              <div>Skills</div>
              <div className="edit__pro_skls_bx">
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

            <div className="edit__pro_achvmts">
              <div>Achivements</div>
              <div className="edit__pro_achvmts_bx">
                {selectedUser.achievements ? (
                  selectedUser.achievements
                ) : (
                  <div className="skill">No Achievements Added</div>
                )}
              </div>
            </div>
            <div className="edit__pro_achvmts">Requests</div>
            <div className="edit__pro_box_1">
              {/* <div className="reqs_invite_bar">
                <div className="reqs_invite_bar__requests">Requests</div>
                <div className="reqs_invite_bar__line">|</div>
                <div className="reqs_invite_bar__invite">Invite</div>
              </div> */}
              <div className="edit__header">
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
                {isReceived
                  ? requestsRecieved?.map((request, index) => (
                      <Received key={index} request={request} />
                    ))
                  : requests?.map((request, index) => (
                      <Sent request={request} key={index} />
                    ))}
              </div>
            </div>
          </div>
        </div>
        <EditProfileModal
          user={selectedUser}
          show={showProfileModal}
          onHide={() => setShowProfileModal(false)}
        />
      </MainLayout>
    </>
  );
};
export default MyProfile;
