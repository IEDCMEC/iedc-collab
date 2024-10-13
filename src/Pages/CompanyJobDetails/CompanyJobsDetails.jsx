import React, { useContext } from "react";
import { useParams } from "react-router";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./CompanyJobsDetails.scss";
const CompanyJobDetails = () => {
  const { id } = useParams();
  const { selectedJob } = useContext(ProjectContext);
  return (
    <MainLayout>
      <div className="job-card">
        <h2 className="job-title">{selectedJob.job_name}</h2>
        <div className="job-details">
          <p className="job-info">
            <strong>Role:</strong> {selectedJob.role}
          </p>
          <p className="job-info">
            <strong>Location:</strong> {selectedJob.location}
          </p>
          <p className="job-info">
            <strong>Duration:</strong> {selectedJob.duration} months
          </p>
          <p className="job-info">
            <strong>Start Date:</strong> {selectedJob.start_date}
          </p>
          <p className="job-info">
            <strong>Work Hours:</strong> {selectedJob.work_hours} hours/day
          </p>
          <p className="job-info">
            <strong>Contact Email:</strong>{" "}
            <a
              className="contact-link"
              href={`mailto:${selectedJob.contact_email}`}
            >
              {selectedJob.contact_email}
            </a>
          </p>
          <p className="job-info">
            <strong>Contact Phone:</strong>{" "}
            <a className="contact-link" href={`tel:${selectedJob.phone_no}`}>
              {selectedJob.phone_no}
            </a>
          </p>
        </div>

        <div className="job-section">
          <h3 className="section-title">Responsibilities</h3>
          <ul className="job-list">
            {selectedJob.responsibilities.map((responsibility, index) => (
              <li key={index} className="list-item">
                {responsibility}
              </li>
            ))}
          </ul>
        </div>

        <div className="job-section">
          <h3 className="section-title">Requirements</h3>
          <ul className="job-list">
            {selectedJob.requirements.map((requirement, index) => (
              <li key={index} className="list-item">
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        <div className="job-section">
          <h3 className="section-title">Hiring Process</h3>
          <ul className="job-list">
            {selectedJob.hiring_process.map((process, index) => (
              <li key={index} className="list-item">
                {process}
              </li>
            ))}
          </ul>
        </div>

        <div className="job-section">
          <h3 className="section-title">Extra Benefits</h3>
          <ul className="job-list">
            {selectedJob.extra_benefits.map((benefit, index) => (
              <li key={index} className="list-item">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyJobDetails;
