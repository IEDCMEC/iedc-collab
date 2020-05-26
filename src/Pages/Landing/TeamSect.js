import React , {Component} from 'react';

import "./page2.css";

 class TeamSect extends Component{
    render(){
  return (
    <div className="TeamSect">
      <div id="profile-box">
    <section class="our-webcoderskull padding-lg">
      <div class="container">
        <div class="row heading heading-icon">
            <h2>Our Team</h2>
        </div>
    
        <ul class="row">
          <li class="col-12 col-md-6 col-lg-3">
              <div class="cnt-block equal-hight">
                <figure><img src="http://www.webcoderskull.com/img/team4.png" class="img-responsive" alt=""></img></figure>
                <h3><a href="http://www.webcoderskull.com/">Hari</a></h3>
                <p>Govt. Model Engineering College,Kochi</p>
              </div>
          </li>
         
         <li class="col-12 col-md-6 col-lg-3">
              <div class="cnt-block equal-hight" >
                <figure><img src="http://www.webcoderskull.com/img/team1.png" class="img-responsive" alt=""></img></figure>
                <h3><a href="#">Hari</a></h3>
                <p>Govt. Model Engineering College,Kochi</p>
              </div>
          </li>
          <li class="col-12 col-md-6 col-lg-3">
              <div class="cnt-block equal-hight" >
                <figure><img src="http://www.webcoderskull.com/img/team4.png" class="img-responsive" alt=""></img></figure>
                <h3><a href="http://www.webcoderskull.com/">Hari</a></h3>
                <p>Govt. Model Engineering College,Kochi</p>
                
              </div>
           </li>
          <li class="col-12 col-md-6 col-lg-3">
              <div class="cnt-block equal-hight" >
                <figure><img src="http://www.webcoderskull.com/img/team2.png" class="img-responsive" alt=""></img></figure>
                <h3><a href="http://www.webcoderskull.com/">Hari</a></h3>
                <p>Govt. Model Engineering College,Kochi</p>
                
              </div>
          </li>
        </ul>
   
      </div>
    </section>
    </div>
    </div>
  )
    }
}

export default TeamSect;