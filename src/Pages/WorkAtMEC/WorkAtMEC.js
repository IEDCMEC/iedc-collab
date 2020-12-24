import React,{useEffect,useState}  from "react";

import Internships from "../Components/Internships/Internships";
import Navigate from "../Components/NavigateBar/NavigateBar";
import {getInternships}from '../../Firebase/firebase';
import {InternshipProvider}from './InternshipContext';
const WorkAtMec = () => {
    const [internships,setinternships]=useState([{}]);
    const [internship,setinternship]=useState([{}]);
    useEffect(()=>{
        getInternships().then(async function(snapshot) {
            let messageObject=snapshot.val();
            const result = Object.keys(messageObject).map(key => ({
                ...messageObject[key],
                id:key
              }));
              setinternships(result);
              setinternship(result[0]);
		}).catch(function(error) {
			alert('Something went wrong');
			console.log(error);
		});
        
    },[]);
    return (
        <InternshipProvider value={{internships:internships,internship:[internship,setinternship]}}>
            <Navigate />
            <Internships />
        </InternshipProvider>
    );
}

export default WorkAtMec;