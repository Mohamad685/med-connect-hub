import React from "react";
import './PreviewBox.css';

function PreviewBox({ height, width, title, text }) {
    const previewStyles = {
        height: height,
        width: width,
    }

    return (
        <div style={previewStyles} className="preview-style">
            {title && <h2>{title}</h2>}
            {text && <p>{text}</p>}     
        </div>
    );
}

export default PreviewBox;

