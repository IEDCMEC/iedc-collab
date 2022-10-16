import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getDevelopers } from "../../Firebase/firebase";
import "./Developers.scss";
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
        <MainLayout />
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "90vh" }}
        >
          <div className="spinner-border" role="status"></div>
          <div className="mt-3">Loading Developers...</div>
        </div>
      </div>
    );
  }
  return (
    <MainLayout>
      <div className="developer_container">
        <h1 className="developer-title">DEVELOPERS</h1>
        <div className="developer-details">
          {users.map((user) => {
            return (
              <div
                className="developer-card"
                key={user.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(user)}
              >
                <img
                  alt="Profile"
                  className="developer-card-image"
                  src={
                    user.photoURL ||
                    "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
                  }
                />
                <div>
                  <h1 className="developer-card-name">
                    {user.name.toLowerCase()}
                  </h1>
                  <div className="developer-card-email">{user.email}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Developers;
