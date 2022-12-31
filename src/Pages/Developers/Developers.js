import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Components/MainLayout/MainLayout";
// import { getDevelopers } from "../../Firebase/firebase";
import "./Developers.scss";
import DeveloperCard from "./DeveloperCard";
import Drawer from "./Drawer";
// import { IndeterminateCheckBox } from "@mui/icons-material";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Pagination } from "@mui/material";
const Developers = () => {
  const [users, setUsers] = useState([]);
  const { developers, loading, setSelectedDevelopers } = useContext(
    ProjectContext
  );
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const [loading1, setLoading1] = useState(false);
  const [branch, setBranch] = useState([]);
  const [yop, setYop] = useState([]);

  const addYop = (selectedYop) => {
    let oldYop = yop;
    if (oldYop.find((s) => s === selectedYop)) {
      if(oldYop.length==1)oldYop=[]
     else oldYop = oldYop.filter((s) => s !== selectedYop);
    } else {
      oldYop = [...oldYop, selectedYop];
    }
    setYop(oldYop);
  };
  const addBranch = (b) => {
    let oldBranch = branch;
    if (oldBranch.find((s) => s === b)) {
      oldBranch = oldBranch.filter((s) => s !== b);
    } else {
      oldBranch = [...oldBranch, b];
    }
    setBranch(oldBranch);
    
  };
  // const getDevs = async () => {
  //   // await getDevelopers().then(async function (snapshot) {
  //   //   let messageObject = snapshot.val();
  //   //   const result = Object.keys(messageObject).map((key) => ({
  //   //     ...messageObject[key],
  //   //     id: key,
  //   //   }));

  //   setUsers(developers);
  //   setLoading(false);
  //   setAllUsers(developers);
  // };
  useEffect(() => {
    setLoading1(true)
    if(developers.length>0 && users.length!=developers.length)
    {   setUsers([])
      alert(developers.length)
      alert(users)
       for(let i = 0; i < developers.length+20;i+=20){
          
          setTimeout(() => {
            if(i>developers.length)i = developers.length;
          setUsers((prev)=>[...prev, ...developers.slice(i,i+20)])  
          }, 200);
        }
      }   
    setLoading1(false)
    
    
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developers]);
  const filterDevelopers = () => {
//if(branch.length==0 && yop.length==0 && selectedSkills.length==0 && developers.length == users.length){alert("hello");return;}
     setLoading1(true)
   // setAllUsers(developers);
    let developers1 = developers;
    let skills = selectedSkills;
    let devs = [];
    if (skills.length === 0 ) {
      devs = developers;
    } else {
      developers1.forEach((dev) => {
        for (let s in skills) {
          if (dev.skills && dev?.skills?.find((sk) => sk === skills[s])) {
            devs = [...devs, dev];
            break;
          }
        }
      });

      
     
    }

    
    if (branch.length > 0){
      devs = devs.filter((d) => {
        if (branch.find((br) => br === d.branch)) {
          return true;
        } else return false;
      });
     
    }
    if (yop.length > 0){
      devs = devs.filter((d) => {
        if (yop.find((yp) => yp === d.year)) {
          return true;
        } else return false;
      });
   
    }
    
    if(devs)
{   setUsers([])
   for(let i = 0; i < devs.length+10;i+=10){
      
      setTimeout(() => {
        if(i>devs.length)i = devs.length;
      setUsers((prev)=>[...prev, ...devs.slice(i,i+10)])  
      }, 100);
    }
  }   
  setLoading1(false)
  };

  

  useEffect(() => {
    console.log(branch);
    
    filterDevelopers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills, branch, yop]);

 
 
  const history = useHistory();
  const handleClick = (u) => {
    history.push(`/developers/${u.id}`);
  };
  if (loading) {
    return (
      <div>
        <MainLayout route={"Developers"}>
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }
  return (
    <>
      <MainLayout route={"Developers"}>
        <div className="parent_container">
          <Drawer
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            addBranch={addBranch}
            addYop={addYop}
          />
          <div className="developer_container">
            <h3 style={{ textAlign: "center" }}>DEVELOPERS</h3>
            <div className="developer-details">
            
              {users?.map((user, index) => {
                return (
                  <div key={index} onClick={() => setSelectedDevelopers(user)}>
                    <DeveloperCard handleClick={handleClick} user={user} />
                  </div>
                );
              })}
            </div>
            <Pagination count={10} color="primary" sx={{
              paddingTop:"5rem",
            }} />
          </div>
          

        </div>
      </MainLayout>
    </>
  );
};

export default Developers;
