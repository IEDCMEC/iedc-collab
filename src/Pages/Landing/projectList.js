import React , {Component} from 'react';
import "./page2.css";

import TeamSect from './TeamSect';


 class ProjectList extends Component{
    render(){
  return (
    <div className="ProjectList">
       <div id="wrapper">
       
       <div class = "auto">
       <div class="scrollbar thin-scroll">
      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>

      </div>
      <hr></hr>
      <br></br>
      
      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>

      </div>
      <hr></hr>
      <br></br>

      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>

      </div>
      <hr></hr>
      <br></br>

      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>

      </div>
      <hr></hr>
      <br></br>

      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
         
      </div>
      <hr></hr>
      <br></br>

      <div class = "content post-item">
         <h3>Project 1</h3>
         <h5>Hari Something</h5>
         <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
         
      </div>
      <hr></hr>
   </div>
</div>
   
<div class="vl">
    <TeamSect/>
    </div>
   </div>
</div>

  )
    }
}

export default ProjectList;