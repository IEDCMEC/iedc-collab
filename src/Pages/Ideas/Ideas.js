import React, { useEffect, useState } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
import bubble2 from '../../assets/bubble_2.svg'
import bubble3 from '../../assets/bubble_3.svg'
import bubble1 from '../../assets/bubble_1.svg'
import bubble5 from '../../assets/bubble_5.svg'
const Ideas = () => {
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 1500);
  }, []);
  return spinner ? (
    <>
      <MainLayout route={"Ideas"}>
      <img src={bubble2} alt="" className="bubble_2_1" />
      <img src={bubble3} alt="" className="bubble_3" />
      <img src={bubble5} alt="" className="bubble_5" />
      <img src={bubble1} alt="" className="bubble_1" />
        {" "}
        <SuspenseLoader />
      </MainLayout>
    </>
  ) : (
    <div>
      <MainLayout route={"Ideas"}>
      <img src={bubble2} alt="" className="bubble_2_1" />
      <img src={bubble3} alt="" className="bubble_3" />
      <img src={bubble5} alt="" className="bubble_5" />
      <img src={bubble1} alt="" className="bubble_1" />
        <h1>Ideas Page Coming soon....</h1>
      </MainLayout>
    </div>
  );
};

export default Ideas;
