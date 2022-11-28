import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Buttons from './Buttons';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import vector from '../../assets/Vector.svg';

const typeDevs = ['Skills','Projects','Developers']
const skills=['React Js','Vanilla Js','Vue Js','Angular Js','Arduino','Rasberry Pi','IOT','C++','Python','Django','Flask','Java','Spring','Node JS','MySQL','PostgreSQL','SQLite']
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const styles={
  fontFamily:'Nunito', fontWeight: '450',fontSize: '1.6rem',lineHeight: '42px',color:'white',padding:'0',margin:'0'
}

export default function PersistentDrawerLeft() {
  const matches1 = useMediaQuery('(max-width:600px)');
  const matches2 = useMediaQuery('(max-width:800px)');
  const matches3 = useMediaQuery('(max-width:865px)');
  const matches4 = useMediaQuery('(max-width:380px)');
  const drawerWidth = matches2 ? matches1 ? '90vw' : '60vw' : '40vw';
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 5,position:'fixed', left: matches4 ? '15px':'30px', top: matches3 ? '184px' :'140px', ...(open && { display: 'none' }) }}>
            <MenuIcon sx={{fontSize:'2rem'}}/>
          </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(90deg, #8B1010 0%, #C71111 100%)',
            borderBottomRightRadius: '16px',
            borderTopRightRadius:'16px',
            bottom: '0',
            height: '100%'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{fontSize:'2rem',color:'black'}}/> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
            <div className="filter_box">
                <div style={{minWidth: '90%', margin:'15px'}}><h3 style={styles}>Search By:</h3></div>
                <div className="buttons">
                {typeDevs.map((x,id)=>(<Buttons key={id} name={x} className='buttons'/>))}
                </div>
                <div style={{minWidth: '90%', margin:'25px'}}><h3 style={styles}>Filter By:</h3></div>
                  <div style={{
                      minWidth: '90%',
                      display: 'flex',
                      justifyContent:'flex-start',
                      alignItems:'centre',
                      flexDirection:'row'}}>
                  <img alt="" style={{marginRight:'10px'}}src={vector}/><h3 style={{fontFamily:'Nunito', fontWeight: '450',fontSize: '1rem',lineHeight: '42px',color:'white',padding:'0',margin:'0'}}>Hashtags</h3>
                </div>
                <input type='text' placeholder='Start typing...' className='input_box'/>
                <div className='skills'>
                  {Skills.map((x,id)=>(<Buttons key={id} name={x} className='skill_boxes'></Buttons>))}
                </div>
                <div style={{minWidth:'90%',margin:'25px'}}><h3 style={styles}>Branch/Class</h3></div>
                <input type='text' className='input_box'/>
                {/* placeholder='Start typing...' */}
                <div style={{minWidth:'90%',margin:'25px'}}><h3 style={styles}>Year of passing</h3></div>
                <input type='text' className='input_box'/>
            </div>
      </Drawer>
    </div>
  );
}