import React from "react";
import "./Landing.css";
import { useHistory } from 'react-router-dom';

const Landing = (props) => {
  const history = useHistory();
  // const signUp = () => {
  //   console.log("siged up");
  //   props.firebase.doSignInWithGoogle();
  // };
  return (
    <div>
      <div class="landing">
        <div className="collab">
          <div className="centered">
            <button class="btn" onClick={() => { history.push("/collab"); }}>
                <b>Collab</b>
            </button> <br /> <br />
              <b>!What is collab?</b>
              {/* <button class="btn" onClick={() => { signUp(); }}k>LoginWithGoogle</button> */}
          </div>
        </div>
        <div className="work_at_mec">
          <div className="centered">
            <button class="btn" onClick={() => { history.push("/workatmec"); }}>
                <b>Work At MEC</b>
            </button> <br /> <br />
            <b>!What is work at mec?</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;