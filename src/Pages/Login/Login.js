import React, { useContext } from "react";
import { signIn,signOut } from '../../Firebase/firebase';
import GoogleButton from 'react-google-button';
import { AuthContext,validUserContext } from "../../Firebase/Auth/Auth";
import { Row} from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom'
import logo from '../../assets/logo.png'
import Login from './googlebutton'
 
import './Login.css'

const logIn= () =>{
    return(
        <div style={{justifyContent:"center",margin:"0 Auto"}}>
    <GoogleButton  
        label = "sign in"
        onClick={
            () => {
                signIn();
                console.log('Google button clicked')
            }
        }
    />
    </div>
    )
}
 
const GoogleLogIn = () =>{
    const {currentUser} = useContext(AuthContext);
    const {validUserState} = useContext(validUserContext)
    //const [validUserState, updateValidity] = useState(false)
    /*
    const logIn = () =>{
    signIn();
    }*/
    //&& validUserState
    //&& currentUser.email.includes("vitstudent.ac.in")
    if(!!currentUser ){
        if(currentUser.email.includes("mec.ac.in")){
            console.log("in redirect" + validUserState)
            return  <Redirect to="/" />
        }
        else{
            return (
 
    <div>
     <h3>Please Sign In with @mec.ac.in </h3>
   
    />
    </div>
   
    )
        }
       
    }
    else{
        signOut();
         return (
 
    <div className="signInButton">
    <Login  
        
    />
    </div>
   
    )
       
       
       // return  <Redirect to="/error" />
    }
    return (
 
    <div>
     
   
    </div>
   
    )
}
 
const login = () => {
    return(
        <div className="main">
           
            <div className="login-container">
 
                <Row className={"d-flex justify-content-center align-items-center"}>
                    <img src={logo} className={"mr-2"} alt="" />
                </Row>
                <Row className={"d-flex justify-content-center align-items-center"}>
                    <p className="intro">
                        Welcome to Collab, a Place exclusively for MECians to find like minded people with desired skillsets to Collaborate
                        on your project.
                        Work At Mec also provides internship opportunities listed by the Placement Cell
                    </p>
                    <p className="intro2">
                        Sign in to Continue
                    </p>
                </Row>
                <Row className={"d-flex justify-content-center align-items-center"}>
                    <GoogleLogIn />
                </Row>
 
            </div>
        </div>
    )
}
 
export default withRouter(login);
