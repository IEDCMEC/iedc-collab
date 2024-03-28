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
import { ThemeContext } from "../../App";

let devs = [];

const filterDevelopers = (
  developers,
  selectedSkills,
  branch,
  yop,
  page,
  setPages,
  setUsers,
  setLoading1
) => {
  setLoading1(true);
  let developers1 = developers;
  let filteredDevelopers = [...developers1];

  if (selectedSkills.length > 0) {
    filteredDevelopers = filteredDevelopers.filter(
      (dev) =>
        dev.skills && dev.skills.some((skill) => selectedSkills.includes(skill))
    );
  }

  if (branch.length > 0) {
    filteredDevelopers = filteredDevelopers.filter((dev) =>
      branch.includes(dev.branch)
    );
  }

  if (yop.length > 0) {
    filteredDevelopers = filteredDevelopers.filter((dev) =>
      yop.includes(dev.year)
    );
  }

  filteredDevelopers.sort((a, b) => a.name.localeCompare(b.name));

  setPages(Math.ceil(filteredDevelopers.length / 10));
  setUsers(filteredDevelopers.slice(page * 10, page * 10 + 10));
  setLoading1(false);
};

const Developers = () => {
  const [users, setUsers] = useState(null);
  const { developers, loading, setSelectedDevelopers } = useContext(
    ProjectContext
  );
  const {
    branch,
    setBranch,
    yop,
    setYop,
    // width,
    currentWidth,
    // setcurrentWidth,
  } = useContext(ThemeContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading1, setLoading1] = useState(false);
  //const [branch, setBranch] = useState([]);
  // const [yop, setYop] = useState([]);
  const addYop = (selectedYop) => {
    let oldYop = yop;
    if (oldYop.find((s) => s === selectedYop)) {
      if (oldYop.length === 1) oldYop = [];
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

  // useEffect(() => {
  //   window.addEventListener("resize", changedWidth);
  //   function changedWidth(e) {
  //     setcurrentWidth(window.innerWidth);
  //   }
  //   return () => {
  //     window.removeEventListener("resize", changedWidth);
  //   };
  // }, [width, setcurrentWidth]);
  // const getDevs = async () => {
  //   // await getDevelopers().then(async function (snapshot) {
  //   //   let messageObject = snapshot.docs();
  //   //   const result = Object.keys(messageObject).map((key) => ({
  //   //     ...messageObject[key],
  //   //     id: key,
  //   //   }));

  //   setUsers(developers);
  //   setLoading(false);
  //   setAllUsers(developers);
  // };
  useEffect(() => {
    if (developers === null) return;
    devs = developers;
    setPage(0);
    setPages(Math.ceil(developers.length / 10));
    // setUsers(developers.slice(page * 10, page * 10 + 10));
    filterDevelopers(
      developers,
      selectedSkills,
      branch,
      yop,
      page,
      setPages,
      setUsers,
      setLoading1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developers]);

  useEffect(() => {
    if (
      users === undefined ||
      users === null ||
      developers === undefined ||
      developers === null
    ) {
      // console.log(developers)
      // console.log("loading");
    } else {
      filterDevelopers(
        developers,
        selectedSkills,
        branch,
        yop,
        page,
        setPages,
        setUsers,
        setLoading1
      );
    }
    // console.log("running");
  }, [selectedSkills, branch, yop, page]);

  const history = useHistory();

  const handleClick = (u) => {
    history.push(`/developers/${u.id}`);
  };
  const [open, setOpen] = React.useState(false);

  if (loading || loading1 || users === null) {
    return (
      <div>
        <MainLayout route={"Developers"}>
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent:"center",
        width: "100vw",
      }}
    >
      <MainLayout route={"Developers"}>
        <div
          className="parent_container"
          style={{
            width: "100vw",
            transition: "0.2s",
          }}
        >
          <Drawer
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            addBranch={addBranch}
            addYop={addYop}
            open={open}
            setOpen={setOpen}
          />
          <div className="developer_container">
            <h3 className="developer-title" style={{ marginTop: "3rem" }}>
              {users && users.length === 0 ? "NOT FOUND" : "DEVELOPERS"}
            </h3>
            <div>
              {users && users.length === 0 ? (
                <p style={{ fontWeight: "600" }}>
                  Refine your filters please ..
                </p>
              ) : null}
            </div>
            <div className="developer-details">
              {users?.map((user, index) => (
                <div key={index} onClick={() => setSelectedDevelopers(user)}>
                  <DeveloperCard handleClick={handleClick} user={user} />
                </div>
              ))}
            </div>
            <Pagination
              count={pages}
              page={page + 1}
              onChange={(e, val) => {
                setPage(val - 1);
              }}
              color="primary"
              sx={{
                paddingTop: "5rem",
              }}
            />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Developers;
