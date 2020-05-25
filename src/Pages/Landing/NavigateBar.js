import React , {Component} from 'react';
import "./cards.css";


 class Navigate extends Component{
    render(){
  return (
    <div className="Navigate">
      <nav class="navbar navbar-expand-sm ">
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">
    
      
    <li class="nav-item">
      <a class="nav-link" href="/home"><i class="fa fa-chevron-left"></i> IEDC Collab Platform</a>
      </li>
</ul>
    <ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link" href="#">New Project</a>
      </li><li class="nav-item">
        <a class="nav-link" href="#">Bookmarked <i class="fa fa-chevron-down"></i></a>
      </li>


      <li class="nav-item">
        <a class="nav-link" href="#">Notifications <i class="fa fa-chevron-down"></i></a>
      </li>

     
  
  
  </ul>
  </div>
 
</nav>

    </div>
  )
    }
}

export default Navigate;