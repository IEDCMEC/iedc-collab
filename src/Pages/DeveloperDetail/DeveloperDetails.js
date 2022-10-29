import MainLayout from "../../Components/MainLayout/MainLayout";
import "./DeveloperDetails.scss";
import classIcon from "../../assets/class.svg";
import browser from "../../assets/browser.svg";
import phone from "../../assets/phonecircle.svg";
import mail from "../../assets/mailnew.svg";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/githubnew.svg";
import person from "../../assets/details_left.svg";
import add from "../../assets/add.svg";
import InviteToProjectModal from "../../Components/InviteToProjectModal/InviteToProjectModal";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../Firebase/firebase";

function DeveloperDetails() {
  let {id}=useParams();
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true)
  const getDev = async (id) => {
    const user = await getUser(id);
    setSelectedUser(await user.val())
    setLoading(false)

  }
  useEffect(() => {
    getDev(id);
    
  }, [id]);
  const [modalShow, setModalShow] = useState(false);
  if (loading) {
    return (
        <div>
           <MainLayout route={'Developers'}>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading Developer...</div>
      </div>
      </MainLayout>
      </div>
    );
  }
  return (
    <>
      <MainLayout route={'Developers'}>
      <div className="developer_details_container">

        <div className="developer_details_navbar">
          <div className="developer_image_div">
            <img
              className="developer_image"
              src={selectedUser.profilePhoto||"https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"}           alt=""
            />
          </div>
          <div className="developer_details">
            <div className="developer_details_header">
              <div className="developer_name">{selectedUser.name}</div>
              <div className="developer_icons">
                <a href={selectedUser?.website} target="_blank" rel="noreferrer"><img src={browser} alt="" /></a>
                <a href= {`tel:+91${selectedUser?.contact}`} target="_blank" rel="noreferrer"><img src={phone} alt="" /></a>
                <a href={`mailto:${selectedUser?.email}`} target="_blank" rel="noreferrer"><img src={mail} alt="" /></a>
                <a href={selectedUser?.linkedin} target="_blank" rel="noreferrer"><img src={linkedin} alt="" /></a>
                <a href={selectedUser?.github} target="_blank" rel="noreferrer"><img src={github} alt="" /></a>
              </div>
            </div>
            <div className="developer_class">
              <img src={classIcon} alt="" />
              {selectedUser?.branch} {selectedUser?.year}
            </div>
            <div className="developer_bio">
             {selectedUser?.about}
            </div>
          </div>
        </div>
        <div className="developer_details_body">
          <div className="developer_details_body_left">
            <img src={person} alt="" className="developer_details_person" />
          </div>
          <div className="developer_details_body_right">
          <div className="developer_details_body_right_section">
            <div className="developer_details_body_right_header">
              Skills
              </div>
              <div className="developer_details_body_right_content">
                {selectedUser?.skills?.map((skill, index) => (
                  <div key={index}>{index+1} . {skill}</div>
                ))}
              </div>
              </div>

              <div className="developer_details_body_right_section_1">
              <div className="developer_details_body_right_header">
              Projects
              </div>
              <div className="developer_details_body_right_content">
                <div className="developer_details_body_right_content_projects">
                <div className="developer_details_body_right_content_project">
                <div className="developer_details_body_right_content_project_img">
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1666569600&Signature=JVC6H3uReIdZf9k6JBF8rBONm5hm5aLOhnv0AUg3tv6lzWsd-yH~j6NUxmWkZnTd2RQC9b3jO0WHk6t2xZVMw0PqLWYYS0qriWQQh6cBGJa4-khHebFKjBwwCtIAfwrMWT8CgkJBmVRtGcPZDuvPN61RYHkV1JzTedOP8BU4jI6kwaFV7bFFEM83FIcUqRwVIMjPLqQrE-GvH5ZUMxx7u3eN7~vop6a-Ja-J78xbNiAo~Z5yEyBxRqUD5ZJlKVDt5nJwaF3aMR~oRKvnQDIZf152t2ejPZPHFxHmguUdyLpSkGGH03PTuIcMmTtHnix~bzv3W3Q6luzuShZ-NUN~PQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                  </div>
                  <div className="developer_details_body_right_content_project_title">PROJECT LIFEBOAT
                  </div>
                  <div className="developer_details_body_right_content_project_lead">MUHAMMED RAZEEN
                  </div>
                  </div>
                  <div className="developer_details_body_right_content_project">
                <div className="developer_details_body_right_content_project_img">
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1666569600&Signature=JVC6H3uReIdZf9k6JBF8rBONm5hm5aLOhnv0AUg3tv6lzWsd-yH~j6NUxmWkZnTd2RQC9b3jO0WHk6t2xZVMw0PqLWYYS0qriWQQh6cBGJa4-khHebFKjBwwCtIAfwrMWT8CgkJBmVRtGcPZDuvPN61RYHkV1JzTedOP8BU4jI6kwaFV7bFFEM83FIcUqRwVIMjPLqQrE-GvH5ZUMxx7u3eN7~vop6a-Ja-J78xbNiAo~Z5yEyBxRqUD5ZJlKVDt5nJwaF3aMR~oRKvnQDIZf152t2ejPZPHFxHmguUdyLpSkGGH03PTuIcMmTtHnix~bzv3W3Q6luzuShZ-NUN~PQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                  </div>
                  <div className="developer_details_body_right_content_project_title">PROJECT LIFEBOAT
                  </div>
                  <div className="developer_details_body_right_content_project_lead">MUHAMMED RAZEEN
                  </div>
                  </div>
                  <div className="developer_details_body_right_content_project">
                <div className="developer_details_body_right_content_project_img">
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1666569600&Signature=JVC6H3uReIdZf9k6JBF8rBONm5hm5aLOhnv0AUg3tv6lzWsd-yH~j6NUxmWkZnTd2RQC9b3jO0WHk6t2xZVMw0PqLWYYS0qriWQQh6cBGJa4-khHebFKjBwwCtIAfwrMWT8CgkJBmVRtGcPZDuvPN61RYHkV1JzTedOP8BU4jI6kwaFV7bFFEM83FIcUqRwVIMjPLqQrE-GvH5ZUMxx7u3eN7~vop6a-Ja-J78xbNiAo~Z5yEyBxRqUD5ZJlKVDt5nJwaF3aMR~oRKvnQDIZf152t2ejPZPHFxHmguUdyLpSkGGH03PTuIcMmTtHnix~bzv3W3Q6luzuShZ-NUN~PQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                  </div>
                  <div className="developer_details_body_right_content_project_title">PROJECT LIFEBOAT
                  </div>
                  <div className="developer_details_body_right_content_project_lead">MUHAMMED RAZEEN
                  </div>
                  </div>
                </div>
                </div>
                </div>

              <div className="developer_details_body_right_section">
              <div className="developer_details_body_right_header">
              Achievements
              </div>
              <div className="developer_details_body_right_content">
             {selectedUser?.achievements}
              </div>
              </div>
          </div>
        </div>
        <div className="developer_details_footer_container">
              <div className="developer_details_footer" onClick={() => setModalShow(true)}>
          <img src={add} alt=''/>Invite to Project
            </div>
            </div>

      <InviteToProjectModal show={modalShow}
        onHide={() => setModalShow(false)} />
      </div>
      </MainLayout>
    </>
  );
}
export default DeveloperDetails;
