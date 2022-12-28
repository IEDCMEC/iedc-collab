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
const Developers = () => {
  const [users, setUsers] = useState([]);
  const { developers, loading, setSelectedDevelopers } = useContext(
    ProjectContext
  );
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [loading1, setLoading1] = useState(true);
  const [branch, setBranch] = useState([]);
  const [yop, setYop] = useState([]);

  const addYop = (selectedYop) => {
    let oldYop = yop;
    console.log(oldYop);
    if (oldYop.find((s) => s === selectedYop)) {
      oldYop = oldYop.filter((s) => s !== selectedYop);
    } else {
      oldYop = [...oldYop, selectedYop];
    }
    setYop(oldYop);
  };
  const addBranch = (b) => {
    console.log("hello");
    let oldBranch = branch;
    console.log(oldBranch);
    if (oldBranch.find((s) => s === b)) {
      oldBranch = oldBranch.filter((s) => s !== b);
    } else {
      oldBranch = [...oldBranch, b];
    }
    setBranch(oldBranch);
  };
  console.log(branch);
  console.log(yop);
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
    setUsers(developers);
    setAllUsers(developers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developers, allUsers]);
  const filterDevelopers = () => {
    // setLoading(true);
    setUsers(developers);
    setAllUsers(developers);
    let developers1 = allUsers;
    let skills = selectedSkills;
    let devs = [];
    if (skills.length <= 0) {
      devs = allUsers;
    } else {
      developers1.forEach((dev) => {
        for (let s in skills) {
          console.log(s);
          if (dev.skills && dev?.skills?.find((sk) => sk === skills[s])) {
            devs = [...devs, dev];
            break;
          }
        }
      });

      // setLoading(false);
    }
    if (branch.length > 0)
      devs = devs.filter((d) => {
        if (branch.find((br) => br === d.branch)) {
          return true;
        } else return false;
      });
    if (yop.length > 0)
      devs = devs.filter((d) => {
        if (yop.find((yp) => yp === d.year)) {
          return true;
        } else return false;
      });
    console.log(devs);
    setUsers(devs);
  };
  useEffect(() => {
    filterDevelopers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills, branch, yop]);
  useEffect(() => {
    if (users?.length > 0) setLoading1(false);
  }, [users]);
  const history = useHistory();
  const handleClick = (u) => {
    history.push(`/developers/${u.id}`);
  };
  if (loading || loading1) {
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
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Developers;
