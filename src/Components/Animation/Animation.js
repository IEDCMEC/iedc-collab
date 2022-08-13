import "./Animation.scss";

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
          <Lottie 
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions} 
          />
        </div>
        
      </div>
    </>
  );
};
export default Animation;


