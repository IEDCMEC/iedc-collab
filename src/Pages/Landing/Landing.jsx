import React from "react";
import "./Landing.scss";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Collab from "../../assets/collab.png";
import Work from "../../assets/work.png";
import Logo from "../../assets/logo.svg";

const Landing = (props) => {
  // const history = useHistory();
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
            className={
              "box mt-5 p-3 pt-4 pb-4 justify-content center flex-column-reverse flex-md-row align-items-md-center"
            }
          >
            <Col className={"mt-3 mt-md-0"} md={8}>
              <h4>IEDC COLLAB PLATFORM</h4>
              <p>
                What is collab and lorem ipsum des dolor set emet.What is collab
                and lorem ipsum des dolor set emet.What is collab and lorem
                ipsum des dolor set emet.What is collab and lorem ipsum des
                dolor set emet.
              </p>
            </Col>
            <Col className={"d-flex justify-content-center align-items-center"}>
              <img src={Collab} alt="" />
            </Col>
          </Row>
          <Row
            className={
              "box mt-5 p-3 pt-4 mb-4 pb-4 justify-content center flex-column-reverse flex-md-row align-items-md-center"
            }
          >
            <Col className={"mt-3 mt-md-0"} md={8}>
              <h4>WORK AT MEC</h4>
              <p>
                What is collab and lorem ipsum des dolor set emet.What is collab
                and lorem ipsum des dolor set emet.What is collab and lorem
                ipsum des dolor set emet.What is collab and lorem ipsum des
                dolor set emet.
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
