import React, { useState } from "react";

export default function Buttons(props) {
  const [valueOnClick, setValueOnClick] = useState(false);
  const styles = {
    background: valueOnClick ? "white" : "rgba(148, 2, 2, 0.2)",
    color: valueOnClick ? "#9E0000" : "white",
  };
  const stylesClear = {
    background:  "rgba(148, 2, 2, 0.2)",
    color:   "white" ,
  };

// try to integrate selectedSkills useState var into this function, as a prop,and add clearfilter button logic 
  return (
    
    <button
      name={props.name}
      className={props.className}
      style={props.clearFilter ? stylesClear : styles}
      onClick={() => {
          setValueOnClick(!valueOnClick);
          props.addSkills(props.name);
      }
    }
      
    
    >
      <p>
        {props.page === "Projects" ? "# " : ""}
        {props.name}
      </p>
    </button>
  );

}
