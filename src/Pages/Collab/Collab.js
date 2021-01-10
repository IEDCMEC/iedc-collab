import React,{ useEffect,useState}  from "react";
import Projects from "../Components/Projects/Projects";
import Navigate from "../Components/NavigateBar/NavigateBar";
import {getProjects}from '../../Firebase/firebase';
import {ProjectProvider}from './ProjectContext';
const Collab = (props) => {
    const [projects,setProjects]=useState([{}]);
    const [project,setProject]=useState([{}]);
    useEffect(()=>{
        getProjects().then(async function(snapshot) {
            let messageObject=snapshot.val();
            const result = Object.keys(messageObject).map(key => ({
                ...messageObject[key],
                id:key
              }));
              setProjects(result);
              setProject(result[0]);
		}).catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		});
        
    },[]);
  
    return (
        <ProjectProvider value={{projects:projects,project:[project,setProject]}}>
            <Navigate />
            <Projects />
        </ProjectProvider>
    
    );
}

export default Collab;

