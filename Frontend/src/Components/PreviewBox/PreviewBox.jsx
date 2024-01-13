import React from "react";
import './PreviewBox.css';
function PreviewBox({height,width,title,text}) {

    const PreviewStyles={
        height: height,
        width:  width,
        title:`${title}`,
        text:`${text}`,
    }
	return (
		
			<div className="preview-style">
				<p>
					<strong>Lab Results:</strong> hello
				</p>
			</div>
	);
}

export default PreviewBox;
