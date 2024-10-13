import React from "react";
import { useParams } from "react-router";

const CompanyJobDetails = () => {
  const { id } = useParams();
  return <div>Job Details {id}</div>;
};

export default CompanyJobDetails