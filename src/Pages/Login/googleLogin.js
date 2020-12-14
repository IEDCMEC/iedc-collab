import React, { useContext,useState } from "react";
import { signIn,signOut } from '../../Firebase/firebase';
import GoogleButton from 'react-google-button';

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

export default logIn;