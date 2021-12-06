import React from "react";
import { signIn} from '../../Firebase/firebase';
import GoogleButton from 'react-google-button';
import Login from 'Glogin'

const logIn= () =>{
    return(
        <div style={{justifyContent:"center",margin:"0 Auto"}}>
    <Login  
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