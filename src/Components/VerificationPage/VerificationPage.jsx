import React from "react";
import { Avatar, Dialog, Drawer, Box, Typography } from "@mui/material";
import Navbar from "../NavigateBar/NavigateBar";

const VerificationPage = () => {
  return (
    <Box
      // open={true}
      // onClose={handleApprove}
      // centered
      sx={{
        position: "fixed",
        zIndex: "13000",
        // inset: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 120px)",
          width: "100vw",
          position: "fixed",
          fontWeight: "500",
          bottom: "0",
          left: "0",
          zIndex: "13000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Nunito",
            color: "#9e0000",
            fontSize: "2rem",
          }}
        >
          Your account is under verification, please wait while we check your
          profile
        </Typography>
        <Typography
          sx={{
            fontFamily: "Nunito",
            color: "#9e0000",
            marginTop: "20px",
            fontSize: "1.3rem",
          }}
        >
          Contact iedc@mec.ac.in for more details
        </Typography>
      </Box>
    </Box>
  );
};

export default VerificationPage;
