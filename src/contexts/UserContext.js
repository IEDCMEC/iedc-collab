import React, { useEffect, useState } from "react";
import { getDevelopers } from "../Firebase/firebase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = (state) => {
    let index = 0;
    switch (state) {
      case "ADD":
        index = allUsers.length;
        break;
      case "EDIT":
        index = allUsers.indexOf(selectedUser);
        break;
      default:
        index = 0;
    }
    setLoading(true);
    getDevelopers()
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        const result = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          id: key,
        }));
        setUsers(result);
        setAllUsers(result);
        setSelectedUser(result[index]);
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        setSelectedUser,
        loading,
        fetchData,
        allUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
