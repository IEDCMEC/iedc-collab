import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.scss";
import edit_icon from "../../assets/edit_profile_icon.svg";
import accept_icon from "../../assets/accepticon.svg";
import decline_icon from "../../assets/declineicon.svg";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { BsTelephoneInbound } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { Button } from "@mui/material";
import { TbNetwork } from "react-icons/tb";
import { VscGithubInverted } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { getUser, signIn } from "../../Firebase/firebase";
const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const newprojectClick = async () => {
    if (currentUser) {
      setShowProfileModal(true);
    } else {
      signIn(() => setShowProfileModal(true));
    }
  };
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const getDev = async (id) => {
    const user = await getUser(id);
    setSelectedUser(await user.val());
    setLoading(false);
  };
  useEffect(() => {
    if (currentUser?.uid) getDev(currentUser?.uid);
  }, [currentUser]);
  if (loading) {
    return (
      <div>
        <MainLayout route={"My Profile"}>
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ height: "90vh" }}
          >
            <div className="spinner-border" role="status"></div>
            <div className="mt-3">Loading Profile...</div>
          </div>
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
              <div className="profile_details_header">
                <p className="c">{selectedUser.name}</p>
                <img
                  src={edit_icon}
                  style={{ width: "2rem", cursor: "pointer" }}
                  alt=""
                  onClick={newprojectClick}
                />
              </div>
              <div className="phone_class">
                <div className="profile_phone">
                  <BsTelephoneInbound style={{ width: "3rem" }} />
                  <p>
                    {(selectedUser.contact)?
                    (
                      <a
                        href={`tel:+91${selectedUser.contact}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedUser.contact}
                      </a>
                    ) :("Change in Edit Profile")}
                  </p>
                </div>
                <div className="profile_class">
                  <HiOutlineAcademicCap style={{ width: "3rem" }} />
                  <p>
                    {selectedUser?.branch || "Change in Edit Profile"}
                    {selectedUser?.year}
                  </p>
                </div>
              </div>
              <div className="profile_email">
                <MdOutlineEmail style={{ width: "3rem" }} />
                <p>
                  {(
                    <a
                      href={`mailto:${selectedUser?.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser?.email}
                    </a>
                  ) || "Change in Edit Profile"}
                </p>
              </div>
              <div className="profile_web">
                <TbNetwork style={{ width: "3rem" }} />
                <p>
                  {(selectedUser.website)?(
                    <a
                      href={selectedUser?.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.website}
                    </a>
                  ) : "Change in Edit Profile"}
                </p>
              </div>
              <div className="profile_github">
                <VscGithubInverted style={{ width: "3rem" }} />
                <p>
                  {(selectedUser.github)?(
                    <a
                      href={selectedUser?.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.github}
                    </a>
                  ) : "Change in Edit Profile"}
                </p>
              </div>
              <div className="profile_linkedin">
                <FaLinkedin style={{ width: "3rem" }} />
                <p>
                  {(selectedUser.linkedin)?(
                    <a
                      href={selectedUser.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.linkedin}
                    </a>
                  ) : "Change in Edit Profile"}
                </p>
              </div>
            </div>
          </div>

          <div className="edit__pro_box">
            <div className="reqs_invite_bar">
              <div className="reqs_invite_bar__requests">Requests</div>
              <div className="reqs_invite_bar__line">|</div>
              <div className="reqs_invite_bar__invite">Invite</div>
            </div>
            <div className="edit__header">
              <div className="received">Recieved</div>
              <div className="sent">Sent</div>
            </div>

            <div className="received_sent_box">
              <div className="received_bpx_header">
                <p>Project Name</p>
                <Button
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                  }}
                  variant="outlined"
                >
                  View Projects
                </Button>
              </div>
              <div className="req_profile_box">
                <img
                  className="req_profile_img"
                  src="https://vpnoverview.com/wp-content/uploads/what-is-a-hacker-what-is-hacking-featured-800x400.png"
                  alt=""
                />
                <div className="req_profile_details">
                  <h4>Guy Hawkins</h4>
                  <p>
                    Invite Message - Add a default Message if user doesnot
                    customize it
                  </p>
                </div>
              </div>

              <div className="received_btns">
                <button className="received_btn_accept">
                  <img src={accept_icon} alt="" />
                  Accept
                </button>
                <button className="received_btn_decline">
                  <img src={decline_icon} alt="" />
                  Decline
                </button>
              </div>
            </div>

            <div className="edit__pro_abtMe">
              <div>About Me</div>
              <div className="edit__pro_abtMe_bx">{selectedUser.achievements ? (
                    selectedUser.achievements
                  ) : (
                    <div className="skill">About Section Not Added</div>
                  )}</div>
            </div>

            <div className="edit__pro_skls">
              <div>Skills</div>
              <div className="edit__pro_skls_bx">
                {selectedUser.skills ? (
                  selectedUser.skills.map((skill, index) => {
                    return (
                      <div className="skill" key={index}>
                        {index + 1} . {skill}
                      </div>
                    );
                  })
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
