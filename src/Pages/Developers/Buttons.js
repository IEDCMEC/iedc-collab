import React,{useState} from "react";

export default function Buttons(props){
    const [valueOnClick, setValueOnClick] = useState(false)
    const styles={
        background: valueOnClick ? 'white':'rgba(148, 2, 2, 0.2)',
        color: valueOnClick ? '#9E0000' : 'white'
    }
    return(
        <button className={props.className} style={styles} onClick={()=>(setValueOnClick(!valueOnClick))}><p>{props.name}</p></button>
    );
}