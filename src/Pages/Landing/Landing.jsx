import React from 'react'
import About from '../../Components/About/About'
import Mission from '../../Components/Mission/Mission'
import Team from '../../Components/Team/Team'
import Vision from '../../Components/Vision/Vision'
import Animation from '../../Components/Animation/Animation'
import './Landing.scss'
const Landing = () => {
  return (<>
     <Animation/>
    <Vision/>
    <Mission/>
    <About/>
    <Team/>
    </>
  )
}

export default Landing