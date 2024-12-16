import React from "react";
import { formatDistanceToNow } from "date-fns"; // Import the function
import "./JobCards.scss"; // Import SCSS for styling

const JobCard = ({ job }) => {
    const { title, company, location, experience, salary, postedDate, hiringStatus } = job;

    return (
        <div className="job-card">
            {/* Job Title */}
            <h3 className="job-card__title">{title}</h3>

            {/* Company Name and Hiring Status */}
            <div className="job-card__company-status-location">
                <p className="job-card__company">{company}</p>
                <div className="job-card__status">
                    <span>{hiringStatus}</span>
                </div>
            </div>

            {/* Location, Experience, and Salary on the same line */}
            <div className="job-card__location-salary-experience">
                <p className="job-card__location">{location}</p>
                <p className="job-card__experience">{experience}</p>
                <p className="job-card__salary">Salary: {salary}</p>
            </div>

            {/* Relative Job Posting Date */}
            <div className="job-card__posted">
                <span>
                    Posted: {formatDistanceToNow(new Date(postedDate), { addSuffix: true })}
                </span>
            </div>
        </div>
    );
};

export default JobCard;
