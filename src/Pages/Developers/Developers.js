import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollabFooter from "../../Components/CollabFooter/CollabFooter";
import MainLayout from "../../Components/MainLayout/MainLayout";
import "./Developers.scss";
import DeveloperCard from "./DeveloperCard";
import Drawer from "./Drawer";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Pagination } from "@mui/material";
import { ThemeContext } from "../../App";

const Developers = () => {
  const { developers, loading, setSelectedDevelopers } = useContext(
    ProjectContext
  );
  const {
    branch,
    setBranch,
    yop,
    setYop,
  } = useContext(ThemeContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [page, setPage] = useState(0);
  const cardsPerPage = 6; // Total number of cards per page
  const cardsPerColumn = 3; // Number of cards per column
  const [loading1, setLoading1] = useState(false);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);

  // Function to filter developers
  const filterDevelopers = () => {
    setLoading1(true);

    let filteredDevs = [...developers];

    if (selectedSkills.length > 0) {
      filteredDevs = filteredDevs.filter(
        (dev) =>
          dev.skills && dev.skills.some((skill) => selectedSkills.includes(skill))
      );
    }

    if (branch.length > 0) {
      filteredDevs = filteredDevs.filter((dev) =>
        branch.includes(dev.branch)
      );
    }

    if (yop.length > 0) {
      filteredDevs = filteredDevs.filter((dev) =>
        yop.includes(dev.year)
      );
    }

    filteredDevs.sort((a, b) => a.name.localeCompare(b.name));

    setLoading1(false);
    setFilteredDevelopers(filteredDevs);
  };

  useEffect(() => {
    if (!developers) return;

    filterDevelopers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills, branch, yop, developers]);

  const navigate = useNavigate();

  const handleClick = (user) => {
    setSelectedDevelopers(user);
    navigate(`/developers/${user.id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1); // value is 1-based index, but page state should be 0-based
  };

  if (loading || loading1 || developers === null) {
    return (
      <div>
        <MainLayout route={"Developers"}>
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }

  // Pagination logic to slice developers for the current page
  const startIndex = page * cardsPerPage;
  const paginatedDevelopers = filteredDevelopers.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  // Calculate number of columns needed
  const numColumns = Math.ceil(cardsPerPage / cardsPerColumn);

  return (
    <div className="parent_container">
      <MainLayout route={"Developers"}>
        <Drawer
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          addBranch={setBranch}
          addYop={setYop}
        />
        <div className="developer_container">
          <h3 className="developer-title" style={{ marginTop: "3rem" }}>
            {filteredDevelopers.length === 0 ? "NOT FOUND" : "DEVELOPERS"}
          </h3>
          {filteredDevelopers.length === 0 && (
            <p style={{ fontWeight: "600" }}>Refine your filters please ..</p>
          )}
          <div className="developer-details">
            {Array.from({ length: numColumns }).map((_, columnIndex) => (
              <div key={columnIndex} className="developer-column">
                {paginatedDevelopers
                  .slice(
                    columnIndex * cardsPerColumn,
                    (columnIndex + 1) * cardsPerColumn
                  )
                  .map((user, index) => (
                    <div key={index}>
                      <DeveloperCard user={user} handleClick={handleClick}/>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <Pagination
            count={Math.ceil(filteredDevelopers.length / cardsPerPage)}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            sx={{ paddingTop: "5rem" }}
          />
        </div>
      </MainLayout>
      <CollabFooter />
    </div>
  );
};

export default Developers;
