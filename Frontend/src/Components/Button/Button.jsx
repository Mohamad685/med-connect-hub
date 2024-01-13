import React from "react";
import "./Button.css";

function Button({fontSize,background, color, width, height, hoverColorClass,text}){
    const buttonStyle={
        backgroundColor: background,
        color: color,
        width:width,
        height:height,
        fontSize:fontSize,
    }
    return(
        <>
        <button style={buttonStyle} className={`button-style  Button${hoverColorClass}`}>{text}</button>
        </>
    )
}

export default Button;