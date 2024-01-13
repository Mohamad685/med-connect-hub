import React from "react";

function PreviewBox({height,width,title,text}) {

    const PreviewStyles={
        height: height,
        width:  width,
        title:`${title}`,
        text:`${text}`,
    }
	return (
		
			<div >
				<p>
					<strong>Lab Results:</strong> hello
				</p>
			</div>
	);
}

export default PreviewBox;
