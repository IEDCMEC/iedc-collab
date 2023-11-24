import React, { useState } from "react";

export default function Buttons(props) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [valueOnClick, setValueOnClick] = useState(false);
  const styles = {
    background: valueOnClick ? "white" : "rgba(148, 2, 2, 0.2)",
    color: valueOnClick ? "#9E0000" : "white",
  };

  console.log(props.clearFilter);
  //make this and the onelick fn into a same fn,make it such that it is a fn inside a fn
  
  
  return (
    <button
      name={props.name}
      className={props.className}
      style={styles}
      onClick={() => {
        if (props.clearFilter == true){
          setValueOnClick(false);
          }
        else{
          setValueOnClick(!valueOnClick);
        }
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
