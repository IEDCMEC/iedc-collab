import React, { useContext, useEffect } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { ProjectContext } from "../../contexts/ProjectContext";
import VerificationPage from "../../Components/VerificationPage/VerificationPage";
import { useNavigate } from "react-router-dom";

const CompanyJobs = () => {
  const { profile } = useContext(ProjectContext);
  const navigate = useNavigate();
  return (
    <div>
      {profile?.role &&
      profile?.role === "Organization" &&
      profile?.approved === true ? (
        <MainLayout route={'My Jobs'}>
          <div>CompanyJobs</div>
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
