import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getDevelopers } from "../../Firebase/firebase";
import "./Developers.scss";
import DeveloperCard from "./DeveloperCard";
import Drawer from "./Drawer";
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
      setUsers(result); setLoading(false);
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
        <MainLayout route={'Developers'}>
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "90vh" }}
        >
          <div className="spinner-border" role="status"></div>
          <div className="mt-3">Loading Developers...</div>
        </div>
        </MainLayout>
      </div>
    );
  }
  return (<>
    <MainLayout route={'Developers'}>
      <div className="parent_container">
          <Drawer/>
        <div className="developer_container">
          <h1 className="developer-title">DEVELOPERS</h1>
          <div className="developer-details">
            {users.map((user) => {
              return (
                
                <DeveloperCard handleClick={handleClick} user={user}/>
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
