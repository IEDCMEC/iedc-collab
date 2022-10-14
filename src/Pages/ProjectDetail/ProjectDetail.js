import { useState } from "react";
import ProjectToggle from "../../Components/ProjectToggle/ProjectToggle";
import MainLayout from "../../Components/MainLayout/MainLayout";
import ProjectCarousel from "../../Components/ProjectCarousel/ProjectCarousel";
import ProjectNav from "../../Components/ProjectNav/ProjectNav";
import DiscussionDetails from "../../Components/DisussionDetails/DiscussionDetails";
import RequirementDetails from "../../Components/RequirementDetails/RequirementDetails";
import DescriptionDetails from "../../Components/DescriptionDetails/DescriptionDetails";
import './ProjectDetail.scss'
function ProjectDetail() {
  const [toggle, setToggle] = useState(1);
  return (
    <>
      <MainLayout />
      <ProjectCarousel project/>
      <ProjectToggle setToggle={setToggle} />
      <ProjectNav />
      <div className="details__container">
        {toggle===1 && <DescriptionDetails/>}
        {toggle===2 && <RequirementDetails/>}
        {toggle===3 && <DiscussionDetails />}
      </div>
    </>
  );
}
export default ProjectDetail;
