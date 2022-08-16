import "./Animation.scss";
import bubble8 from "../../assets/bubble_8.svg";
import iedclogo from "../../assets/logo_1.svg";
import animation from "../../animations/landing.json";
import Lottie from 'react-lottie'

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  return (
    <>
     
      <div className="animation_main" >
        
         <div className="anime" data-aos="zoom-in" data-aos-duration="2000"> 
        <img src={iedclogo} alt="" className="iedc_logo" />
         <img src={bubble8} alt="" className="bubble_8" /> 
           <Lottie 
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions} 
          /> 
         
         </div> 
        <div className="signin_btn">Click here to Sign in with Google</div>
        <div className="signin_btn_1">Sign in with Google</div>
      </div>
    </>
  );
};
export default Animation;


