import MainLayout from "../../Components/MainLayout/MainLayout";
import "./Details.scss";
import classIcon from '../../assets/class.svg'
import browser from '../../assets/browser.svg'
import phone from '../../assets/phonecircle.svg'
import mail from '../../assets/mailnew.svg'
import linkedin from '../../assets/linkedin.svg'
import github from '../../assets/githubnew.svg'



function Details() {
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
            <div className="developer_class"><img src={classIcon} alt="" />CS 2024</div>
            <div className="developer_bio">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Details;
