import React, { useContext } from "react";
import InternshipBox from "./InternshipBox";
import { Col } from "react-bootstrap";
import InternshipContext from "../../../../WorkAtMEC/InternshipContext";
import { getInternship } from "../../../../../Firebase/firebase";
import { propTypes } from "react-bootstrap/esm/Image";
const InternshipList = (props) => {
  const { internships } = useContext(InternshipContext);
  const { internship } = useContext(InternshipContext);
  function activeInternship(id) {
    getInternship(id)
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        messageObject.id = id;
        internship[1](messageObject);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });
  }
  return (
    <Col className={" overflow "}>
      {internships.map((x) => {
        return (
          <div
            className="content post-item"
            onClick={() => {
              activeInternship(x.id);
              props.setMobileComponent(true);
            }}
          >
            <InternshipBox name={x.name} teamLeader={x.leader_name} />
          </div>
        );
      })}
    </Col>
  );
};

export default InternshipList;
