import React from "react";
import "./Landing.css";
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();
  return (
    <div>
      <div class="landing">
        <div className="collab">
          <div className="centered">
            <button class="btn" onClick={() => { history.push("/collab"); }}>
                <b>Collab</b>
            </button> <br /> <br />
              <b>!What is collab?</b>
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