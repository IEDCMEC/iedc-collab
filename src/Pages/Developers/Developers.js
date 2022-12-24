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
  const [loading, setLoading] = useState(true);
  const getDevs = async () => {
    await getDevelopers().then(async function (snapshot) {
      let messageObject = snapshot.val();
      const result = Object.keys(messageObject).map((key) => ({
        ...messageObject[key],
        id: key,
      }));
      setUsers(result);
      setLoading(false);
    });
  };
  useEffect(() => {
    getDevs();
  }, [users]);
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
          <Drawer />
          <div className="developer_container">
            <h1 className="developer-title">DEVELOPERS</h1>
            <div className="developer-details">
              {users.map((user, index) => {
                return (
                  <DeveloperCard
                    key={index}
                    handleClick={handleClick}
                    user={user}
                  />
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
