import React from "react";
import "./Button.css";

function Button({fontSize, color, width, height,text,onClick,classNames}){
    const buttonStyle={
        color: color,
        width:width,
        height:height,
        fontSize:fontSize,
    }
    return(
        <>
        <button  style={buttonStyle} onClick={onClick} className={` button-style ${classNames}`}>{text}</button>
        </>
    )
}

export default Button;