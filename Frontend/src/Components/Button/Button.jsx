import React from "react";
import "./Button.css";

function Button({background, color, width, height}){
    const buttonStyle={
        backgroundColor: background,
        color: color,
        width:width,
        height:height,
    }
    return(
        <>
        <button style={buttonStyle} className="button-style">Button</button>
        </>
    )
}

export default Button;