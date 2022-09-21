import React, { useEffect, useState } from 'react'
import MainLayout from '../../Components/MainLayout/MainLayout'
import { getDevelopers } from '../../Firebase/firebase'
const Developers = () => {
  const [users, setUsers] = useState([]);

  async function fetchData(){await getDevelopers()
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        const result = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          id: key,
        }));
        setUsers(result);
      })
      .catch(function (error) {
        alert("Something went wrong. Please try again after some time.");
        console.log(error);
      })
    }
useEffect(() => {fetchData()},[])
  return (
    <div>
        <MainLayout>
        <h1>Developers Page Coming soon....</h1>
        {users.map((user)=>{return <h1>{user.name}</h1>})}
        </MainLayout>
        
    </div>
  )
  }

export default Developers