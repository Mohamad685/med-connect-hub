import React from "react";
import "./Button.css";

function Button({fontSize,background, color, width, height, classNames,text}){
    const buttonStyle={
        backgroundColor: background,
        color: color,
        width:width,
        height:height,
        fontSize:fontSize,
    }
    return(
        <>
        <button  style={buttonStyle} className={`button-style ${classNames?.join(" ")}`}>{text}</button>
        </>
    )
}

export default Button;