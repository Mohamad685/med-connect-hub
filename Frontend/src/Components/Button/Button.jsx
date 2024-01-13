import React from "react";
import "./Button.css";

function Button({fontSize, color, width, height,text}){
    const buttonStyle={
        color: color,
        width:width,
        height:height,
        fontSize:fontSize,
    }
    return(
        <>
        <button  style={buttonStyle} className={`button-style`}>{text}</button>
        </>
    )
}

export default Button;