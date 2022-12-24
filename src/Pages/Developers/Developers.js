import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getDevelopers } from "../../Firebase/firebase";
import "./Developers.scss";
import DeveloperCard from "./DeveloperCard";
import Drawer from "./Drawer";
import { IndeterminateCheckBox } from "@mui/icons-material";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
const Developers = () => {
  const [users, setUsers] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([])
  const [allUsers, setAllUsers]= useState([])
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState('')
  const [yop, setYop] = useState('')
  const getDevs = async () => {
    await getDevelopers().then(async function (snapshot) {
      let messageObject = snapshot.val();
      const result = Object.keys(messageObject).map((key) => ({
        ...messageObject[key],
        id: key,
      }));
      
      setUsers(result); setLoading(false); setAllUsers(result)
    });
  };
  useEffect(() => {
    getDevs();
   
  }, []);
  const filterDevelopers = ()=>{
    setLoading(true)
   let developers = allUsers;
   let skills = selectedSkills
   if(skills.length<=0){setUsers(allUsers);}
   else{
    console.log(skills)
   let devs = []
      developers.forEach(dev=>{
        for(let s in skills){
          console.log(s)
        if(dev.skills && dev?.skills?.find((sk)=>sk==skills[s]))
        {
          devs=[...devs, dev]
          break;
        }
        }
      
      })  
      console.log(devs)
      setUsers(devs)
      setLoading(false)
    }
    
  }
  useEffect(()=>{
   filterDevelopers()
  },[selectedSkills])
  useEffect(()=>{
    if(users.length>0)
    setLoading(false)
  },[users])
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
  return (<>
    <MainLayout route={'Developers'}>
      <div className="parent_container">
          <Drawer selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} setBranch={setBranch} setYop={setYop}/>
        <div className="developer_container">
          <h1 className="developer-title">DEVELOPERS</h1>
          <div className="developer-details">
            {users.map((user,index) => {
              return (
                
                <DeveloperCard key={index} handleClick={handleClick} user={user}/>
              );
            })}
          </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Developers;
