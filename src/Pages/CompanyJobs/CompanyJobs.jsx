import React, { useContext, useEffect } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { ProjectContext } from "../../contexts/ProjectContext";
import VerificationPage from "../../Components/VerificationPage/VerificationPage";
import { useNavigate } from "react-router-dom";
import "./CompanyJobs.scss";
const CompanyJobs = () => {
  const { profile, myJobs, selectedJob, setSelectedJob } = useContext(
    ProjectContext
  );
  const navigate = useNavigate();
  // const navigate = useNavigate()
  function handleClick(jobDeets) {
    setSelectedJob(jobDeets);
    navigate(`/MyJobs/${jobDeets.id}`);
  }
  return (
    <div>
      {profile?.role &&
      profile?.role === "Organization" &&
      profile?.approved === true ? (
        <MainLayout route={"My Jobs"}>
          <div>CompanyJobs</div>
          {myJobs.map((value, index) => {
            const data = JSON.stringify(value);
            return (
              <p
                onClick={() => handleClick(value)}
                className="company_job"
                key={index}
                style={{cursor:"pointer"}}
              >
                {data}
              </p>
            );
          })}
        </MainLayout>
      ) : (
        <MainLayout>
          <VerificationPage />
        </MainLayout>
      )}
    </div>
  );
};

export default CompanyJobs;
