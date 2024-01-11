import React from "react";

function Button({background, color, width, length}){
    const buttonStyle={
        backgroundColor: background,
        color: color,
        width:width,
        height:length,
    }
    return(
        <>
        <button style={buttonStyle} >Button</button>
        </>
    )
}

export default Button;