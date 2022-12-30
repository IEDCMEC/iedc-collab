import React, { useContext } from "react";
import About from "../../Components/About/About";
import Mission from "../../Components/Mission/Mission";
import Team from "../../Components/Team/Team";
import Vision from "../../Components/Vision/Vision";
import Animation from "../../Components/Animation/Animation";
import "./Landing.scss";
import Footer from "../../Components/Footer/Footer";
import NavbarHome from "../../Components/NavbarHome/NavbarHome";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import { ProjectContext } from "../../contexts/ProjectContext";
const Landing = () => {
  const { loading } = useContext(ProjectContext);
  return loading ? (
    <SuspenseLoader />
  ) : (
    <>
      <NavbarHome />
      <Animation />
      <Vision />
      <Mission />
      <About />
      <Team />
      <Footer />
    </>
  );
};

export default Landing;
