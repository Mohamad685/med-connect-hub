import React from "react";
import OptionsBox from "../../Components/Options/Options";
import TextArea from "../../Components/TextArea/TextArea";
import "./InsurancePage.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";
function InsurancePage() {
	return (
		<>
			<div className="insurance-reg-page">
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

				<form className="insurance-reg-form">
					<p className="insurance-reg-title">insurance Full Name</p>
					<div className="insurance-reg-section1">
						<div className="insurance-form-input">
							<div className="address-input-div">
								<PreviewBox
									width={"56rem"}
									height={"8rem"}
									text={"text-top"}
									title={"Lab Results"}
								/>

								<PreviewBox
									width={"56rem"}
									height={"8rem"}
									text={"text-top"}
									title={"Symptoms"}
								/>
								<PreviewBox
									width={"56rem"}
									height={"8rem"}
									text={"text-top"}
									title={"Diagnosis"}
								/>
								<div className="insurance-button-div">
									<Button
										width={"20rem"}
										height={"2rem"}
										color={"white"}
										text={"Accept"}
									/>
									<Button
										className="insurance-button"
										width={"20rem"}
										height={"2rem"}
										color={"white"}
										text={"Reject"}
										backgroundColor={"#E34242"}
									/>
								</div>

								<PreviewBox
									width={"56rem"}
									height={"8rem"}
									text={"text-top"}
									title={"Prescription"}
								/>
								<div className="insurance-button-div">
									<Button
										width={"20rem"}
										height={"2rem"}
										color={"white"}
										text={"Accept"}
									/>
									<Button
										className="insurance-button"
										width={"20rem"}
										height={"2rem"}
										color={"white"}
										text={"Reject"}
										backgroundColor={"#E34242"}
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default InsurancePage;
