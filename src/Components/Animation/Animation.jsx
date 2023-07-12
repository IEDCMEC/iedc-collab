import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import './Animation.scss';
import { AuthContext } from '../../Firebase/Auth/Auth';
import { signIn } from '../../Firebase/firebase';
import animation from '../../animations/landing.json';
import iedclogo from '../../assets/logo_1.svg';
import bubble8 from '../../assets/bubble_8.svg';

function Animation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };
  const { currentUser } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  const newprojectClick = async () => {
    setClicked(true);
    try {
      await signIn();
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    if (currentUser && clicked) {
      history.push('/projects');
    }
  }, [currentUser]);

  return (
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
          loop
          autoPlay
          options={defaultOptions}
        />
      </div>
      {currentUser ? (
        ''
      ) : (
        <button
          type="button"
          className="signin_btn"
          data-aos="zoom-in"
          data-aos-duration="2000"
          onClick={newprojectClick}
        >
          <FcGoogle size={35} /> Sign in with Google
        </button>
      )}
    </div>
  );
}
export default Animation;
