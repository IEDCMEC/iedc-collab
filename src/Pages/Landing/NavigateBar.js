import React , {Component} from 'react';
import "./cards.css";


 class Navigate extends Component{
    render(){
  return (
    <div className="Navigate"><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/home"> <i class="fa fa-chevron-left"></i> IEDC Collab Platform</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item ">
          <a class="nav-link" href="#">New Project</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Bookmarked <i class="fa fa-chevron-down"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#" tabindex="-1" >Notifications <i class="fa fa-chevron-down"></i></a>
        </li>
      </ul>
      
    </div>
  </nav>
      

    </div>
  )
    }
}

export default Navigate;