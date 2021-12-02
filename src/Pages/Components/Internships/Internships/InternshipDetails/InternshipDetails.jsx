import React, { useContext, useEffect, useState } from "react";
import "./InternshipDetails.scss";
import { Row, Col, Button } from "react-bootstrap";
import InternshipContext from "../../../../WorkAtMEC/InternshipContext";
import { AuthContext } from "../../../../../Firebase/Auth/Auth";
import {
  doDeleteInternship,
  getCompany,
} from "../../../../../Firebase/firebase";
const InternshipDetails = (props) => {
  const { internship } = useContext(InternshipContext);
  const { currentCompany } = useContext(AuthContext);
  const [deleteinternship, setDeleteinternship] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log(internship[0].id)
  useEffect(() => {
    if (internship[0].leader_id !== undefined) {
      getCompany(internship[0].leader_id)
        .then(async function (snapshot) {
          let result = snapshot.val();
          setEmail(result.email);
          setPhoneNumber(result.phone_number);
        })
        .catch(function (error) {
          alert("Something went wrong");
          console.log(error);
        });
    }
    console.log(currentCompany);
  }, [internship]);
  function deleteProj(id) {
    doDeleteInternship(id);
    window.location.reload(false);
  }
  return (
    <div className={"d-flex h-100 flex-column "}>
      {props.mobileComponentClicked ? (
        <Row>
          <Col
            className={"  heading col-sm background-color-white"}
            style={{ padding: "1rem 1rem 1rem 2rem" }}
          >
            <Button
              variant="light"
              onClick={() => props.setMobileComponent(false)}
            >
              Project List
            </Button>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col
          className={"p-4 shadow-bottom heading col-sm background-color-white"}
        >
          <div className={"flex-grow-1"}>
            <h5 className={"text-size-responsive"}>{internship[0].name}</h5>
          </div>
          <div className={" fix-flex left-right-margin"}>
            <div>
              <h5 className={"text-size-responsive"}>
                {internship[0].leader_name}
              </h5>
            </div>
          </div>
          <div className={"fix-flex"}>
            <div>
              <h5 className={"text-size-responsive"}>
                {email}
              </h5>
              <h5 className={"text-size-responsive"}>
                {phoneNumber}
              </h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={"p-5 flex-grow-1 overflow"}>
        <div className="contents">
          <div>
            <h4>Description</h4>
            {internship[0].desc}
            <h4>Links</h4>
            <a href="${links}" rel="noopener noreferrer" target="_blank">
              {internship[0].links}
            </a>
          </div>
          {deleteinternship ? (
            <Button
              onClick={() => {
                deleteProj(internship[0].id);
              }}
            >
              Delete internship
            </Button>
          ) : null}
        </div>
      </Row>
    </div>
  );
};

export default InternshipDetails;
