import React, { useEffect, useState } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import SuspenseLoader from "../../Components/SuspenseLoader/SuspenseLoader";
const Ideas = () => {
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 1500);
  }, []);
  return spinner ? (
    <>
      <MainLayout route={"Ideas"}>
        {" "}
        <SuspenseLoader />
      </MainLayout>
    </>
  ) : (
    <div>
      <MainLayout route={"Ideas"}>
        <h1>Ideas Page Coming soon....</h1>
      </MainLayout>
    </div>
  );
};

export default Ideas;
