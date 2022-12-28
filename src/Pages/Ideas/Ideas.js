import React, { useEffect, useState } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import bubble2 from "../../assets/bubble_2.svg";
import bubble3 from "../../assets/bubble_3.svg";
import bubble1 from "../../assets/bubble_1.svg";
import bubble5 from "../../assets/bubble_5.svg";
import "./Ideas.scss";
const Ideas = () => {
  return (
    <div>
      <MainLayout route={"Ideas"}>
        <img src={bubble2} alt="" className="bubble_2_1" />
        <img src={bubble3} alt="" className="bubble_3" />
        <img src={bubble5} alt="" className="bubble_5" />
        <img src={bubble1} alt="" className="bubble_1" />

        <div className="ideas__container">
          <div className="ideas__box">
            <div className="ideas__animation">
              <div class="ideas__one ideas__spin-one"></div>
              <div class="ideas__two ideas__spin-two"></div>
              <div class="ideas__three ideas__spin-one"></div>
            </div>
            <h1>Coming Soon....</h1>
            
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Ideas;
