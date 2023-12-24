import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Modal } from "@mui/base/Modal";
import Backdrop from "@mui/material/Backdrop";
import { signIn, UpdateUser, UpdateUserDetails } from "../../Firebase/firebase";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { toast } from "react-toastify";

// import { UpdateUserDetails } from "../../Firebase/firebase";
const SignupOptions = ({ openModal, setOpenModal }) => {
  //   console.log(openModal);
  const { profile, fetchUserProfile, fetchDevelpersData } = useContext(
    ProjectContext
  );
  function handleSignin(typeofuser) {
    if (profile === null) {
      signIn(typeofuser);
    } else {
      UpdateUserDetails([profile, typeofuser], () => {
        fetchUserProfile();
        fetchDevelpersData();
        toast("Edited Profile Successfully", {
          autoClose: 2000,
        });
      });
    }
    setOpenModal(false);
  }
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      //   show={openModal}
      //   onHide={() => setOpenModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            //Your style here....
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: "10000",
          },
        },
      }}
      sx={{
        position: "fixed",
        zIndex: "13000",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          fontFamily: "Nunito",
          height: "300px",
          width: { xs: "45vw", md: "50vw", lg: "40vw" },
          position: "fixed",
          fontWeight: "500",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          //   marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          textAlign: "start",
          //   position: "relative",
          zIndex: "13000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
          overflow: "hidden",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "2px solid #9e0000",
          boxShadow: "0 4px 12px rgb(0 0 0 / 0.5)",
          padding: "24px",
          // color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]},

          "& .modal-title": {
            margin: 0,
            lineHeight: "1.5rem",
            marginBottom: "8px",
          },
          "& .modal-description": {
            margin: "0",
            lineHeight: "1.5rem",
            fontWeight: "400",
            //   color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]},
            marginBottom: "4px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            minHeight: "50%",
            width: "95%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#9e0000",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            How do you want to proceed?
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: { xs: "95%", md: "75%" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                handleSignin("User");
              }}
              sx={{
                backgroundColor: "#9e0000",
                color: "white",
                textAlign: "center",
                textTransform: "none",
                width: "150px",
                border: "none",
                "&:hover": {
                  backgroundColor: "#9e0000",
                  color: "white",
                },
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>User</Typography>
            </Button>
            <Button
              onClick={() => {
                handleSignin("Organization");
              }}
              sx={{
                backgroundColor: "#9e0000",
                color: "white",
                textAlign: "center",
                textTransform: "none",
                width: "150px",
                border: "none",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#9e0000",
                },
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>Organization</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignupOptions;
