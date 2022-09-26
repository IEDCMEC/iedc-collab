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
import { useState } from "react";

function DeveloperDetails() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <MainLayout />
      <div className="developer_details_container">

        <div className="developer_details_navbar">
          <div className="developer_image_div">
            <img
              className="developer_image"
              src="https://s3-alpha-sig.figma.com/img/bd44/db64/e0bbb4f5c9487fb9deaeeb5ccb407c39?Expires=1664755200&Signature=Ze-rK0O3CgVF244-6nFZ1cIZRFIgcjAMFI8KcfP9tS1HTdnYe8H5hFM5jEeHu9lnjkA4LEa9THgdrPVhE9~o~89n~4wyc9dmzp6wQibFwoxFCaSD2o88Ap9I4Z99mmmA5Ew0hIvUUO1YKu6owTBchaDfJ2Vs5x2nK0DLDyYDf9aWjE8jCmepIKFohGjp3Eryk3mfoAsn5ynyHlSARLxtkgRCBezkusR5bTXKypwqrVolDdhjfnxMFbWrWksghROX8M6u6upLk3TCAlzk-M74W8hdG1dp4PqilY3PbT7mi4sSYrvhu9DZBLKgXuvjwa5fzL3~vPUFQV6LYuKIqVC1gA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
          </div>
          <div className="developer_details">
            <div className="developer_details_header">
              <div className="developer_name">Annette Black</div>
              <div className="developer_icons">
                <img src={browser} alt="" />
                <img src={phone} alt="" />
                <img src={mail} alt="" />
                <img src={linkedin} alt="" />
                <img src={github} alt="" />
              </div>
            </div>
            <div className="developer_class">
              <img src={classIcon} alt="" />
              CS 2024
            </div>
            <div className="developer_bio">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint.
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
              Python, C, Java, Competitive Programming, DSA, Communication, Math
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
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1665360000&Signature=BVWYrHk54TxN2hBPsxrOz-D2yfX201YT~ZpPbQjvbPinW3AsQnDr09emNH-hmkgcNur41S80SJ8Cs0bIQHU9SGTOGvmdopiI1Pd-sF1v6sOE6T~TYhxsz9uFgCsylPpFeKzFZI2T4nyIl2BPFDbRZkwjCCnJuq9ciHbbqTqM~BW15Hfzm~-D0l8a9ganPfHrmgENFiABH7keIpP6munFLq5tcTebj~UGxRwhXDlSVCnJu4aUDeuAcQ2lZsQFsPjcDgb9x3D1eSxJ199I4CgXwhY~n0DiT7-IoM9PEeUkLPWBR8qqcH-y-VPxWL6lY2lWBGI9gaE4X1Y1W5c-zRQgzw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                  </div>
                  <div className="developer_details_body_right_content_project_title">PROJECT LIFEBOAT
                  </div>
                  <div className="developer_details_body_right_content_project_lead">MUHAMMED RAZEEN
                  </div>
                  </div>
                  <div className="developer_details_body_right_content_project">
                <div className="developer_details_body_right_content_project_img">
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1665360000&Signature=BVWYrHk54TxN2hBPsxrOz-D2yfX201YT~ZpPbQjvbPinW3AsQnDr09emNH-hmkgcNur41S80SJ8Cs0bIQHU9SGTOGvmdopiI1Pd-sF1v6sOE6T~TYhxsz9uFgCsylPpFeKzFZI2T4nyIl2BPFDbRZkwjCCnJuq9ciHbbqTqM~BW15Hfzm~-D0l8a9ganPfHrmgENFiABH7keIpP6munFLq5tcTebj~UGxRwhXDlSVCnJu4aUDeuAcQ2lZsQFsPjcDgb9x3D1eSxJ199I4CgXwhY~n0DiT7-IoM9PEeUkLPWBR8qqcH-y-VPxWL6lY2lWBGI9gaE4X1Y1W5c-zRQgzw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                  </div>
                  <div className="developer_details_body_right_content_project_title">PROJECT LIFEBOAT
                  </div>
                  <div className="developer_details_body_right_content_project_lead">MUHAMMED RAZEEN
                  </div>
                  </div>
                  <div className="developer_details_body_right_content_project">
                <div className="developer_details_body_right_content_project_img">
                  <img src="https://s3-alpha-sig.figma.com/img/d72a/1dee/2889d3a3937b43ea0945e6159fed9e03?Expires=1665360000&Signature=BVWYrHk54TxN2hBPsxrOz-D2yfX201YT~ZpPbQjvbPinW3AsQnDr09emNH-hmkgcNur41S80SJ8Cs0bIQHU9SGTOGvmdopiI1Pd-sF1v6sOE6T~TYhxsz9uFgCsylPpFeKzFZI2T4nyIl2BPFDbRZkwjCCnJuq9ciHbbqTqM~BW15Hfzm~-D0l8a9ganPfHrmgENFiABH7keIpP6munFLq5tcTebj~UGxRwhXDlSVCnJu4aUDeuAcQ2lZsQFsPjcDgb9x3D1eSxJ199I4CgXwhY~n0DiT7-IoM9PEeUkLPWBR8qqcH-y-VPxWL6lY2lWBGI9gaE4X1Y1W5c-zRQgzw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
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
              Python, C, Java, Competitive Programming, DSA, Communication, Math
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
    </>
  );
}
export default DeveloperDetails;
