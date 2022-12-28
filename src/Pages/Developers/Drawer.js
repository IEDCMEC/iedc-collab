import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Buttons from "./Buttons";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getSkills } from "../../Firebase/firebase";

// const typeDevs = ['Skills','Projects','Developers']
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const styles = {
  fontFamily: "Nunito",
  fontWeight: "450",
  fontSize: "1.6rem",
  lineHeight: "42px",
  color: "white",
  padding: "0",
  margin: "0",
};
const styles1 = {
  fontFamily: "Nunito",
  fontWeight: "600",
  fontSize: "2rem",
  lineHeight: "42px",
  color: "white",
  padding: "0",
  margin: "0",
};
export default function PersistentDrawerLeft({
  selectedSkills,
  setSelectedSkills,
  addBranch,
  addYop
}) {
  const [skills, setSkills] = React.useState([]);
  // const [branch, setBranch] =  React.useState('')
  // const [yop, setYop] = React.useState('')
  const getAbilities = async () => {
    await getSkills().then(async function (snapshot) {
      let messageObject = snapshot.val();
      setSkills(messageObject);
    });
  };
  React.useEffect(() => {
    getAbilities();
  }, []);
  const branches=["CSE","ECE","EEE","EBE","MECH"]
  const years=["2023","2024","2025","2026"]
  const matches1 = useMediaQuery("(max-width:600px)");
  const matches2 = useMediaQuery("(max-width:800px)");
  const matches3 = useMediaQuery("(max-width:865px)");
  const matches4 = useMediaQuery("(max-width:380px)");
  const drawerWidth = matches2 ? (matches1 ? "60vw" : "70vw") : "35vw";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addSkill = (skill) => {
    let oldSkills = selectedSkills;
    console.log(oldSkills);
    if (oldSkills.find((s) => s === skill)) {
      oldSkills = oldSkills.filter((s) => s !== skill);
    } else {
      oldSkills = [...oldSkills, skill];
    }
    console.log(oldSkills);
    setSelectedSkills(oldSkills);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          mr: 5,
          position: "fixed",
          left: matches4 ? "15px" : "30px",
          top: matches3 ? "184px" : "140px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(90deg, #8B1010 0%, #C71111 100%)",
            borderBottomRightRadius: "16px",
            borderTopRightRadius: "16px",
            bottom: "0",
            height: "100%",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="filter_box">
          {/* <div style={{minWidth: '90%', margin:'15px'}}><h3 style={styles}>Search By:</h3></div>
                <div className="buttons">
                {typeDevs.map((x,id)=>(<Buttons key={id} name={x} className='buttons'/>))}
                </div> */}
          <div style={{ minWidth: "90%", margin: "25px" }}>
            <h3 style={styles1}>Filter By:</h3>
          </div>
          <div
            style={{
              minWidth: "90%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "centre",
              flexDirection: "row",
            }}
          >
            <h3 style={styles}>
              Skills
            </h3>
          </div>
          {/* <input
            type="text"
            placeholder="Start typing..."
            className="input_box"
          /> */}
          <div className="skills">
            {skills.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes"
                addSkills={addSkill}
              ></Buttons>
            ))}
          </div>
          <div style={{ minWidth: "90%", margin: "25px" }}>
            <h3 style={styles}>Branch/Class</h3>
          </div>
          {/* <input type="text" className="input_box" /> */}
          <div className="skills">
            {branches.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes"
                addSkills={addBranch}
              ></Buttons>
            ))}
          </div>
          {/* placeholder='Start typing...' */}
          <div style={{ minWidth: "90%", margin: "25px" }}>
            <h3 style={styles}>Year of passing</h3>
          </div>
          {/* <input type="text" className="input_box" /> */}
          <div className="skills">
            {years.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes"
                addSkills={addYop}
              ></Buttons>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
