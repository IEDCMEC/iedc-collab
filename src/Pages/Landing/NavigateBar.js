import React , {Component} from 'react';



 class Navigate extends Component{
    render(){
  return (
    <div className="Navigate">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">IEDC</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="Project_page">Projects</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Connect</a>
      </li>

      
  <li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Join Us</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      
    </div>
  </li>
  </li>
  </ul>
  </div>
</nav>
    </div>
  )
    }
}

export default Navigate;