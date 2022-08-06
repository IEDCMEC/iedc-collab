import React from 'react'
import About from '../../Components/About/About'
import Mission from '../../Components/Mission/Mission'
import Team from '../../Components/Team/Team'
import Vision from '../../Components/Vision/Vision'
import './Landing.scss'
const Landing = () => {
  return (<>
    <Vision/>
    <Mission/>
    <About/>
    <Team/>
    </>
  )
}

export default Landing