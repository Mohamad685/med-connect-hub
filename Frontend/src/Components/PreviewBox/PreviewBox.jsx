import React from "react";
import './PreviewBox.css';

function PreviewBox({ height, width, title, text }) {
    const previewStyles = {
        height: height,
        width: width,
    }

    return (
        <div style={previewStyles} className="preview-style">
            {title && <h3>{title}</h3>}
            {text && <div className="scrollable-text">{text}</div>}     
        </div>
    );
}

export default PreviewBox;

