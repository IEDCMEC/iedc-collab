import React from "react";
import { useParams } from "react-router";

const UserJobDetails = () => {
  const { id } = useParams();
  return <div>User Job Details {id}</div>;
};

export default UserJobDetails;