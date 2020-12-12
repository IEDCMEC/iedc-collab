import React, { useContext,useState } from "react";
import { signIn,signOut } from '../../Firebase/firebase';
import GoogleButton from 'react-google-button';
import { AuthContext,validUserContext } from "../../Firebase/Auth/Auth";
import { useHistory } from "react-router-dom";
import {withRouter, Redirect} from 'react-router-dom'
import logIn from './googleLogin'
/*
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
}*/

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
        
    }
    else{
        signOut();
         return (

    <div>
     <h3>Please Sign In </h3>
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
        
        
       // return  <Redirect to="/error" />
    }
    return (

    <div>
     
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

export default withRouter(GoogleLogIn);