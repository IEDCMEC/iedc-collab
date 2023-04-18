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
import "./Developers.scss";
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeContext } from "../../App";
import { useRef } from "react";

// const typeDevs = ['Skills','Projects','Developers']
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
// const styles = {
//   fontFamily: "Nunito",
//   fontWeight: "450",
//   fontSize: "1.6rem",
//   lineHeight: "42px",
//   color: "white",
//   padding: "0",
//   margin: "0",
// };
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
  addYop,
}) {
  const [skills, setSkills] = React.useState([]);
  const {branch,setBranch,yop,setYop,setWidth} = React.useContext(ThemeContext);
  const widthRef = useRef();
  // const [branch, setBranch] =  React.useState('')
  // const [yop, setYop] = React.useState('')
  const getAbilities = async () => {
    await getSkills().then(async function (snapshot) {
      let messageObject = snapshot.val();
      setSkills(messageObject);
      // setSkillList(messageObject)
    });
  };
  const [skillList, setSkillList] = React.useState(["React","CSS","Javascript","C++"]);
  React.useEffect(() => {
    getAbilities();
  }, []);
  const branches = ["CSE", "ECE", "EEE", "EBE", "MECH"];
  // const [branch, setBranch] = React.useState(branches);
  const years = ["2023", "2024", "2025", "2026"];
  const matches0 = useMediaQuery("(max-width:500px)");
  const matches1 = useMediaQuery("(max-width:600px)");
  const matches2 = useMediaQuery("(max-width:800px)");
  const matches3 = useMediaQuery("(max-width:865px)");
  const matches4 = useMediaQuery("(max-width:380px)");
  const matches5 = useMediaQuery("(max-width:1000px)")
  const drawerWidth = matches5 ? matches2 ? (matches1 ? (matches0 ? "95vw" : "70vw"): "50vw"  ) : "40vw" : "25vw";

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('')
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  React.useEffect(()=>{
    if (open) {
      setWidth(widthRef.current.offsetWidth)
    }
    else{
      setWidth(0)
    }
    
  },[drawerWidth,open])

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addSkill = (skill) => {
    let oldSkills = selectedSkills;
    if (oldSkills.find((s) => s === skill)) {
      oldSkills = oldSkills.filter((s) => s !== skill);
    } else {
      oldSkills = [...oldSkills, skill];
    }
    setSelectedSkills(oldSkills);
  };
  function handleChange(event) {
    const Name = event.target.value;
    setSearch(Name)
    if (Name.length === 0){
      setSkillList(["React","CSS","Javascript","C++"])
    }
    else{
      setSkillList(skills.filter((location)=>{
        return(
          location.toLowerCase().includes(Name.toLowerCase())     
          );
      }))
    }
  }
  return (
    <div className="drawer__container">
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
        className="menu_button"
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Drawer
        ref={widthRef}
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
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className="menu_button">
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
            {/* <h3 style={styles}>Skills</h3> */}
          </div>
          {/* <div style={{ minWidth: "90%", margin: "25px" }}>
            <h3 style={styles}>Branch/Class</h3>
          </div> */}
          {/* <input type="text" className="input_box" /> */}
          <div className="skills">
          <div style={{width:'100%'}}>
          <TextField 
                name='Skills'
                autoComplete='off'
                value={search}
                onChange={handleChange} 
                sx={{
                    width: '80%',
                    margin: '20px 0 20px 0',
                    fontFamily: 'Nunito',
                    '& .MuiOutlinedInput-root':{
                        background:'transparent',
                        color:'white',
                        // border: '2px solid #D9D9D9',
                        borderRadius: '5px',
                      '& fieldset':{
                        border: '2px solid #D9D9D9',
                        borderRadius: '5px',
                        color:'white'
                      },
                      '&.Mui-focused fieldset': {
                        border: '2px solid #D9D9D9',
                        color: 'white'
                      },
                    },
                    '& .MuiOutlinedInput-root:hover':{
                      '& fieldset':{
                        border: '2px solid #D9D9D9',
                        fontFamily: 'Nunito',
                        borderRadius: '5px',
                        color: 'white'
                      }
                    }
                    }} 
                InputProps={{style: {color:'white',fontFamily: 'Nunito'}}}
                InputLabelProps={{
                  style: { color:'white',fontFamily: 'Nunito'},
                }}
                variant='outlined'
                label="Start typing ..." />
          {/* <input
            type="text"
            placeholder="Start typing..."
            className="input_box"
          /> */}
          <div className="skills">
            {skillList.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes menu_button"
                addSkills={addSkill}
              ></Buttons>
            ))}
          </div>
            <Autocomplete
              id="Branch"
              multiple
              onChange={(event,value)=>(setBranch(value))}
              name='Branch'
              options={branches}
              value={branch}
              sx={{width:'80%',margin: '1.5rem 0'}}
              renderInput={(params) => <TextField {...params}
                                            label="Branch/Class" 
                                            required
                                            sx={{
                                              '& .MuiOutlinedInput-root':{
                                                '& .MuiAutocomplete-endAdornment .MuiButtonBase-root .MuiSvgIcon-root':{
                                                  color:'white'
                                                },
                                                '& fieldset':{
                                                  border: '2px solid #D9D9D9',
                                                  color:'white',                                            
                                                },
                                                '& .MuiChip-root':{
                                                  color:"white",
                                                  background:'transparent',
                                                  border: '2px solid #D9D9D9',

                                                },
                                                '&.Mui-focused fieldset': {
                                                  border: '2px solid #D9D9D9',
                                                  color:'white'                                                  
                                                }
                                              },
                                              '& .MuiOutlinedInput-root:hover':{
                                                '& fieldset':{
                                                  border: '2px solid #D9D9D9',
                                                  color:'white'
                                                }
                                              },
                                              '& label':{
                                                color:'white'
                                              },
                                              '& label.Mui-focused':{
                                                color:'white'
                                              },
                                              "& .MuiOutlinedInput-input ": {
                                                color: 'white'
                                              }
                                              }} 
                                            />}
            />
          </div>
            {/* {branches.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes menu_button"
                addSkills={addBranch}
              ></Buttons>
            ))} */}
          </div>
          {/* placeholder='Start typing...' */}
          {/* <div style={{ minWidth: "90%", margin: "25px" }}>
            <h3 style={styles}>Year of passing</h3>
          </div> */}
          {/* <input type="text" className="input_box" /> */}
          <div className="skills">
          <div style={{width:'100%'}}>
            <Autocomplete
              id="Year"
              multiple
              onChange={(event,value)=>(setYop(value))}
              name='Year'
              options={years}
              value={yop}
              sx={{width:'80%',margin: '1.5rem 0'}}
              renderInput={(params) => <TextField {...params}
                                            label="Year" 
                                            required
                                            sx={{
                                              '& .MuiOutlinedInput-root':{
                                                '& .MuiAutocomplete-endAdornment .MuiButtonBase-root .MuiSvgIcon-root':{
                                                  color:'white'
                                                },
                                                '& fieldset':{
                                                  border: '2px solid #D9D9D9',
                                                  color:'white',
                                                },
                                                '& .MuiChip-root':{
                                                  color:"white",
                                                  background:'transparent',
                                                  border: '2px solid #D9D9D9',

                                                },
                                                '&.Mui-focused fieldset': {
                                                  border: '2px solid #D9D9D9',
                                                  color:'white'                                                  
                                                }
                                              },
                                              '& .MuiOutlinedInput-root:hover':{
                                                '& fieldset':{
                                                  border: '2px solid #D9D9D9',
                                                  color:'white'
                                                }
                                              },
                                              '& label':{
                                                color:'white'
                                              },
                                              '& label.Mui-focused':{
                                                color:'white'
                                              },
                                              "& .MuiOutlinedInput-input ": {
                                                color: 'white'
                                              }
                                              }} 
                                            />}
            />
          </div>
            {/* {years.map((x, id) => (
              <Buttons
                key={id}
                name={x}
                className="skill_boxes menu_button"
                addSkills={addYop}
              ></Buttons>
            ))} */}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
