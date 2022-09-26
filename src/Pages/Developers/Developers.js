import React, { useContext  } from 'react'
import { useHistory } from 'react-router-dom';
import MainLayout from '../../Components/MainLayout/MainLayout'
import { UserContext } from '../../contexts/UserContext';
import  "./Developers.scss"
const Developers = () => {
  const { users, setSelectedUser, loading } = useContext(
    UserContext
  );
  const history = useHistory();
  const handleClick = (u) => {
    history.push("/developer-details", { showDetailsDirectly: true });
    setSelectedUser(u);
  };
  if (loading) {
    return (
        <div>
           <MainLayout/>
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
    <div>
        <MainLayout>
            <h1 className="developer-title">Developers</h1>
            <div onClick={(e)=>{
              window.location.assign('/developer-details')
            }} style={{cursor:'pointer'}} className="container mx-auto" id="developer-details">
                {
                    users.map((user) => {
                        return (
                            <div className="developer-card" key={user.id}
                            onClick={() => handleClick(user)}>
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