import React from "react";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Box, Button, Typography } from "@mui/material";
import CustomTextfield from "../CustomTextfield/CustomTextfield";
import { Modal } from "@mui/base/Modal";
import { Dialog } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { updateCompanyDetails } from "../../Firebase/firebase";
import { toast } from "react-toastify";
const OrganizationForm = ({ openModal, setOpenModal }) => {
  const {
    companyDetails,
    setCompanyDetails,
    profile,
    fetchUserProfile,
    fetchDevelpersData,
  } = useContext(ProjectContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(companyDetails);
    updateCompanyDetails([profile, companyDetails], () => {
      fetchUserProfile();
      fetchDevelpersData();
      toast("Edited Profile Successfully", {
        autoClose: 2000,
      });
    });

  };
  const handleClose = (event, reason) => {
    if ((reason === "backdropClick") | "escapeKeyDown") {
      console.log(reason);
    } else {
      setOpenModal(false);
    }
  };

  const handleBackdropClick = (event) => {
    //these fail to keep the modal open
    event.stopPropagation();
    return false;
  };
  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      onBackdropClick={handleBackdropClick}
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
            backgroundColor: "rgba(0, 0, 0, 0)",
            zIndex: "10000",
          },
        },
      }}
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
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        method="post"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Box
          sx={{
            fontFamily: "Nunito",
            height: "calc(100vh - 60px)",
            width: "100vw",
            position: "fixed",
            fontWeight: "500",
            bottom: "0",
            left: "0",
            zIndex: "13000",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: "8px",
            // overflow: "hidden",
            overflowX: "hidden",
            overflowY: "scroll",
            backgroundColor: "white",
            //   borderRadius: "8px",
            // border: "2px solid #9e0000",
            // boxShadow: "0 4px 12px rgb(0 0 0 / 0.5)",
            // color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]},
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              //   minHeight: "5%",
              width: "100%",
              //   position: "fixed",
              padding: "10px 0px 0px 0px",
              //   top: "0",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#9e0000", textAlign: "center" }}
            >
              Enter your details for verification
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              minHeight: { xs: "105vh", md: "80%" },
              width: "100%",
              //   position: "fixed",
              padding: "20px",
              //   margin:'5px'
              //   bottom: "0",
            }}
          >
            <Box
              sx={{
                width: { xs: "95%", md: "45%" },
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Describe your organization
              </Typography>
              <CustomTextfield
                id={"desc"}
                label={"Description"}
                minRows={4}
                type={"string"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={true}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.description}
                onChange={setCompanyDetails}
                name="description"
                generalcolor="#9e0000"
                margin="15px 0"
              />
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Where is your organization located?
              </Typography>
              <CustomTextfield
                id={"address"}
                label={"Address"}
                minRows={4}
                type={"string"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={true}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.address}
                onChange={setCompanyDetails}
                name="address"
                generalcolor="#9e0000"
                margin="15px 0"
              />
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                What's your Company website?
              </Typography>
              <CustomTextfield
                id={"website"}
                label={"Company Website"}
                type={"url"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={false}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.website}
                onChange={setCompanyDetails}
                name="website"
                generalcolor="#9e0000"
                margin="15px 0"
              />
            </Box>
            <Box
              sx={{
                width: { xs: "95%", md: "45%" },
                height: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Enter your LinkedIn profile
              </Typography>
              <CustomTextfield
                id={"linkedin"}
                label={"LinkedIn"}
                type={"url"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={false}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.linkedin}
                onChange={setCompanyDetails}
                name="linkedin"
                generalcolor="#9e0000"
                margin="15px 0"
              />
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Enter District
              </Typography>
              <CustomTextfield
                id={"district"}
                label={"District"}
                type={"string"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={false}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.district}
                onChange={setCompanyDetails}
                name="district"
                generalcolor="#9e0000"
                margin="20px 0"
              />
              <Typography
                sx={{
                  width: { xs: "100%", md: "80%" },
                  color: "black",
                  fontSize: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Enter State
              </Typography>
              <CustomTextfield
                id={"state"}
                label={"State"}
                type={"string"}
                // height="50px"
                width={{ xs: "100%", md: "80%" }}
                generalbgcolor="#fff"
                fieldsetbgcolor="#fff"
                fieldsetborder="2px solid #9e0000"
                multiline={false}
                fieldsetborderradius="8px"
                InputProps={{
                  style: {
                    color: "black",
                    fontFamily: "Nunito",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#9e0000",
                    fontFamily: "Nunito",
                    fontSize: "12px",
                  },
                }}
                value={companyDetails.state}
                onChange={setCompanyDetails}
                name="state"
                generalcolor="#9e0000"
                margin="20px 0"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              //   height: "%",
              width: "100%",
              //   position: "fixed",
              // padding: "20px",
              bottom: "0",
            }}
          >
            <Button
              type="submit"
              sx={{
                backgroundColor: "#9e0000",
                color: "white",
                textAlign: "center",
                textTransform: "none",
                width: "150px",
                border: "none",
                margin: { xs: "20px 0", md: "0" },
                "&:hover": {
                  backgroundColor: "#9e0000",
                  color: "white",
                },
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>Submit</Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default OrganizationForm;
