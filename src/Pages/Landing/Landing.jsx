import React from "react";
import "./Landing.scss";
import { Container, Row, Col } from "react-bootstrap";
import Collab from "../../assets/collab.png";
import Work from "../../assets/work.png";
import Logo from "../../assets/logo.svg";
import { useHistory } from 'react-router-dom';
import 'firebase/auth'


//import {signIn} from '../Firebase/auth';

const Landing = (props) => {
  const history = useHistory();
  // const signUp = () => {
  //   console.log("siged up");
  //   props.firebase.doSignInWithGoogle();
  // };

  // {/* <button class="btn" onClick={() => { signUp(); }}k>LoginWithGoogle</button> */}

  return (
    <>
      <Container className={"landing"}>
        <Row>
          <Col>
            <img src={Logo} className={"mt-5"} alt="" />
          </Col>
        </Row>
        <Col className={"ml-auto mr-auto text-center text-md-left"} md={8}>
          <Row
          onClick={() => { history.push("/collab"); }}
            className={
              "box mt-5 p-3 pt-4 pb-4 justify-content center flex-column-reverse flex-md-row align-items-md-center"
            }
          >
            <Col className={"mt-3 mt-md-0"} md={8}>
              <h4>IEDC COLLAB PLATFORM</h4>
              <p>
                  Find, share and collaborate on projects with other students
                  on-campus.
              </p>
            </Col>
            <Col className={"d-flex justify-content-center align-items-center"}>
              <img src={Collab} alt="" />
            </Col>
          </Row>
          <Row
          onClick={() => { history.push("/workatmec"); }}
            className={
              "box mt-5 p-3 pt-4 mb-4 pb-4 justify-content center flex-column-reverse flex-md-row align-items-md-center card-2"
            }
          >
            <Col className={"mt-3 mt-md-0"} md={8}>
              <h4>WORK AT MEC</h4>
              <p>
                  Internship opportunities on a project basis.

                  An intiative in association with Placement Cell.
              </p>
            </Col>
            <Col className={"d-flex justify-content-center align-items-center"}>
              <img src={Work} alt="" />
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

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
