import React from 'react'
import About from '../../Components/About/About'
import Mission from '../../Components/Mission/Mission'
import Team from '../../Components/Team/Team'
import Vision from '../../Components/Vision/Vision'
import Animation from '../../Components/Animation/Animation'
import './Landing.scss'
import Footer from '../../Components/Footer/Footer'
const Landing = () => {
  return (<>
     <Animation/>
    <Vision/>
    <Mission/>
    <About/>
    <Team/>
    <Footer/>
    </>
  )
}

export default Landing