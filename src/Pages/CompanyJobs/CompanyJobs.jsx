import React, { useContext, useEffect } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { ProjectContext } from "../../contexts/ProjectContext";
import VerificationPage from "../../Components/VerificationPage/VerificationPage";
import { useHistory } from "react-router-dom";

const CompanyJobs = () => {
  const { profile } = useContext(ProjectContext);
  const history = useHistory();
  return (
    <div>
      {profile?.role &&
      profile?.role === "Organization" &&
      profile?.approved === true ? (
        <MainLayout>
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
