import React from "react";
import "./Button.css";

function Button({fontSize, color, width, height,text,onClick}){
    const buttonStyle={
        color: color,
        width:width,
        height:height,
        fontSize:fontSize,
    }
    return(
        <>
        <button  style={buttonStyle} onClick={onClick} className={`button-style`}>{text}</button>
        </>
    )
}

export default Button;