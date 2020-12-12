import React from "react";
import "./Landing.css";
import { useHistory } from 'react-router-dom';
import { signOut } from '../../Firebase/firebase';
import 'firebase/auth'


//import {signIn} from '../Firebase/auth';

const Landing = (props) => {
  const history = useHistory();
  // const signUp = () => {
  //   console.log("siged up");
  //   props.firebase.doSignInWithGoogle();
  // };
  return (
    <div>
      <div class="landing">
        <div className="collab">
          
          <div className="centered">
             
            <button class="btn" onClick={() => { history.push("/collab"); }}>
                <b>Collab</b>
            </button> <br /> <br />
              <b>!What is collab?</b>
             
              { <button class="btn" onClick={() => { signOut(); }}k>SignOut</button> }
          </div>
        </div>
        <div className="work_at_mec">
          <div className="centered">
            <button class="btn" onClick={() => { history.push("/workatmec"); }}>
                <b>Work At MEC</b>
            </button> <br /> <br />
            <b>!What is work at mec?</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
/*--------------------------------------------

import { useEffect, useState, useRef } from "react";
import "./Styles/Landing.css";
import { useHistory } from "react-router-dom";
import img from "../assets/robovitics.png";
import google from "../assets/signin.svg";
import svg from "../assets/landingPhoto.svg";
import svg2 from "../assets/landingPhoto2.svg";
import help from "../assets/Help.svg";
import firebase from "firebase";
import { signIn } from "../firebase-codes";
import { Redir } from "../HandleRedir";

const Landing = ({ updateMail }) => {
	const history = useHistory();
	const [width, setWidth] = useState(window.innerWidth);
	const [auth, updateAuth] = useState(false);
	const [helpp, updateHelp] = useState(false);
	// const [mail, updateMail] = useState("");

	const logo = useRef(svg);
	const handleResize = () => setWidth(window.innerWidth);
	if (width < 801) {
		logo.current = svg2;
	} else logo.current = svg;

	useEffect(() => {
		firebase.auth().signOut();

		const uns = firebase.auth().onAuthStateChanged((user) => {
			updateAuth(!!user);
			// console.log(user, "asd");

			if (user) {
				updateMail(user.email);

				if (history.location.pathname == "/") {
					if (Redir(user.email)) {
						history.push("/register");
						// console
					} else {
						// firebase.auth().signOut();
						history.push("/error");
					}
				}
			}
		});
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => {
			uns();
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (

	);
};

export default Landing;
*/