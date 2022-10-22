import { useEffect, useState } from "react";
import ProjectToggle from "../../Components/ProjectToggle/ProjectToggle";
import MainLayout from "../../Components/MainLayout/MainLayout";
import ProjectCarousel from "../../Components/ProjectCarousel/ProjectCarousel";
import ProjectNav from "../../Components/ProjectNav/ProjectNav";
import DiscussionDetails from "../../Components/DisussionDetails/DiscussionDetails";
import RequirementDetails from "../../Components/RequirementDetails/RequirementDetails";
import DescriptionDetails from "../../Components/DescriptionDetails/DescriptionDetails";
import './ProjectDetail.scss'
import { useParams } from "react-router-dom";

import { getProject} from "../../Firebase/firebase";
function ProjectDetail() {
  let {id}=useParams();
  const [selectedProject, setSelectedProject] = useState({});
  const [loading, setLoading] = useState(true)
  const getWork = async (id) => {
    const project = await getProject(id);
    let p=await project.val()
    p.id = id
    setSelectedProject(p)
    setLoading(false);

  }

  useEffect(() => {
    getWork(id);
    
  }, [id]);
  const [toggle, setToggle] = useState(1);
  if (loading) {
    return (
        <div>
           <MainLayout/>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading Project...</div>
      </div>
      </div>
    );
  }
  return (
    <>
      <MainLayout />
      <ProjectCarousel project={selectedProject} />
      <ProjectToggle toggle={toggle} setToggle={setToggle} selectedProject={selectedProject} />
      <ProjectNav selectedProject={selectedProject} />
      <div className="details__container">
        {toggle===1 && <DescriptionDetails selectedProject={selectedProject}/>}
        {toggle===2 && <RequirementDetails selectedProject={selectedProject}/>}
        {toggle===3 && <DiscussionDetails selectedProject={selectedProject}/>}
      </div>
    </>
  );
}
export default ProjectDetail;
