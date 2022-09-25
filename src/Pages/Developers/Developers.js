import React, { useEffect, useState } from 'react'
import MainLayout from '../../Components/MainLayout/MainLayout'
import  "./Developers.scss"
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
            <h1 className="developer-title">Developers</h1>
            <div className="container mx-auto" id="developer-details">
                {
                    users.map((user) => {
                        return (
                            <div className="developer-card">
                                <img alt="Profile"
                                     className="developer-card-image"
                                     src={user.photoURL||"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}/>
                                <div>
                                    <h1 className="developer-card-name">{user.name}</h1>
                                    <p className="developer-card-email">{user.email}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MainLayout>

    </div>
  )
  }

export default Developers