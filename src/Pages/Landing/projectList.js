import React , {Component} from 'react';
import "./page2.css";
import "./SideBar";
import './scrollbar.css';
import TeamSect from './TeamSect';


 class ProjectList extends Component{
    render(){
  return (
    <div className="ProjectList">

        <div id="wrapper">
            <div className="auto">
                <div className="scrollbar scrollbar-sunny-morning">
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                    <br /><br />
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                    <br /><br />
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                    <br /><br />
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                    <br /><br />
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                    <br /><br />
                    <div className="content post-item">
                        <h3>Project 1</h3>
                        <h5>Hari Something</h5>
                        <p><b>Skills Required:</b>UI/UX,MatLab,blah</p>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="vl">
                <teamsect>
                    <div className="desc">
                        <h3>Project Desption</h3>
                        <p>
                            Lorem ipsum dolor sit amet, at prima aliquando est,
                            Has veri invenire gubergren id, id vis<br /><br /> possit maiorum perfecto.
                            Virtute laoreet vel no, unum minimum fierent ius te.<br /><br />
                            Ea regione blandit referrentur sed.Sit quem euripidis
                            eam solum viderer consequat id.<br /><br /> Vis atqui mollis honestatis ex,
                            An mei velit possit, ubique persecuti id vel.
                            ubique scripserit at vix.
                        </p>
                        <h3> Skills Required</h3>
                        <h5>Arduino Coding, IOT,Python/Open Cv</h5>
                    </div>
                </teamsect></div>
        </div>
</div>

  )
    }
}

export default ProjectList;