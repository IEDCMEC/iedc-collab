import React, { useState } from "react";

export default function Buttons(props) {
  const [valueOnClick, setValueOnClick] = useState(false);
  const styles = {
    background: valueOnClick ? "white" : "rgba(148, 2, 2, 0.2)",
    color: valueOnClick ? "#9E0000" : "white",
  };
  return (
    <button
      name={props.name}
      className={props.className}
      style={styles}
      onClick={() => {
        props.addSkills(props.name);
        setValueOnClick(!valueOnClick);
      }}
    >
      <p>
        {props.page === "Projects" ? "# " : ""}
        {props.name}
      </p>
    </button>
  );
}
