import React from "react";
import { signIn } from '../../Auth/Firebase/firebase_init';
import GoogleButton from 'react-google-button';

const GoogleLogIn = () =>{
    return (
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

export default GoogleLogIn;