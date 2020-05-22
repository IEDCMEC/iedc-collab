import React , {Component} from 'react';
import "./cards.css";


 class Nav2 extends Component{
    render(){
  return (
    <div className="Nav2">
      <nav class="navbar navbar-expand-lg ">
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">
      
      <li class="nav-item">
      <a class="nav-link" href="/"><i class="fa fa-chevron-left"></i> Back to home</a>
      </li>
      </ul>
      <ul class="navbar-nav justify-content-between mr-auto">
            <li class="nav-item"><a>IEDC PORTAL</a></li>
      </ul>
      <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Register</a>
      </li>

      
  <li>
  <li class="nav-item ">
  <a class="nav-link" href="#">Log In</a>
      </li>
      
    

  </li>
  </ul>
  </div>
</nav>
    </div>
  )
    }
}

export default Nav2;