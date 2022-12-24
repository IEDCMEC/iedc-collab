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
import { getUser, signIn } from "../../Firebase/firebase";
import Received from "../../Components/Request/Received"
import Sent from "../../Components/Request/Sent"
import {getRequests} from "../../Firebase/firebase"


const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [requests, setRequests] = useState([])
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isReceived, setIsReceived] = useState(true);
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
    setRequests(await getRequests(currentUser.uid))
  }
 
  useEffect(() => {
    if (currentUser?.uid!==undefined) {
      getDev(currentUser?.uid)
      fetchRequests(currentUser?.uid)
    }
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
                  <BsTelephoneInbound size={15} style={{ width: "3rem" }} />
                  <p>
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
                  </p>
                </div>
                <div className="profile_class">
                  <HiOutlineAcademicCap size={15} style={{ width: "3rem" }} />
                  <p>
                    {selectedUser?.branch || "Change in Edit Profile"}
                    {selectedUser?.year}
                  </p>
                </div>
              </div>
              <div className="profile_email">
                <MdOutlineEmail size={15} style={{ width: "3rem" }} />
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
                  {selectedUser.website ? (
                    <a
                      href={selectedUser?.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.website}
                    </a>
                  ) : (
                    "Change in Edit Profile"
                  )}
                </p>
              </div>
              <div className="profile_github">
                <VscGithubInverted style={{ width: "3rem" }} />
                <p>
                  {selectedUser.github ? (
                    <a
                      href={selectedUser?.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.github}
                    </a>
                  ) : (
                    "Change in Edit Profile"
                  )}
                </p>
              </div>
              <div className="profile_linkedin">
                <FaLinkedin style={{ width: "3rem" }} />
                <p>
                  {selectedUser.linkedin ? (
                    <a
                      href={selectedUser.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedUser.linkedin}
                    </a>
                  ) : (
                    "Change in Edit Profile"
                  )}
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
              <div className={isReceived? "rec_active":"received"} onClick={()=> setIsReceived(true)}>Recieved</div>
              <div className={isReceived? "sent":"sent_active"} onClick={()=> setIsReceived(false)}>Sent</div>
            </div>

            {isReceived ?
            <Received />
            :
            requests.map((request,index)=> 
            <Sent request={request} key={index}/>
            )
            }

            <div className="edit__pro_abtMe">
              <div>About Me</div>
              <div className="edit__pro_abtMe_bx">
                {selectedUser.achievements ? (
                  selectedUser.achievements
                ) : (
                  <div className="skill">About Section Not Added</div>
                )}
              </div>
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
