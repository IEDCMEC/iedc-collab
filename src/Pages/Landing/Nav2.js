import React , {Component} from 'react';
import "./cards.css";


 class Nav2 extends Component{
    render(){
  return ( 
    <div className="Nav2">
    <div className="Navigate"><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/"> <i class="fa fa-chevron-left"></i> Back to Home</a>
    <div class="brand-name">
            <h5>IEDC PORTAL</h5>
      </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
       
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#" tabindex="-1" >Login</a>
        </li>
      </ul>
      
    </div>
  </nav>
    
    </div>
    </div>
  )
    }
}

export default Nav2;