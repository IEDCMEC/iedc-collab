import "./Animation.scss";
import bubble8 from "../../assets/bubble_8.svg";
import iedclogo from "../../assets/logo_1.svg";
import googleLogo from "../../assets/google.svg";
import animation from "../../animations/landing.json";
import Lottie from "react-lottie";
import { signIn } from "../../Firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  const { currentUser } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  const newprojectClick = async () => {
    setClicked(true);
    try {
      await signIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser && clicked) {
      history.push("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <div className="animation_main">
        <div className="anime" data-aos="zoom-in" data-aos-duration="2000">
          <div className="title_2" data-aos="zoom-in" data-aos-duration="2000">
            IEDC MEC COLLAB
          </div>
          <img
            src={iedclogo}
            data-aos="zoom-in"
            data-aos-duration="2000"
            alt=""
            className="iedc_logo"
          />
          <img src={bubble8} alt="" className="bubble_8" />
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div>
        {currentUser ? (
          ""
        ) : (
          <button
            className="signin_btn"
            data-aos="zoom-in"
            data-aos-duration="2000"
            onClick={newprojectClick}
          >
            <img src={googleLogo} alt="" className="google_logo" /> Sign in with
            Google
          </button>
        )}
      </div>
    </>
  );
};
export default Animation;
