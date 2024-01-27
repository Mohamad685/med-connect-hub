import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import { useLocation } from "react-router-dom";
import "../MessageStyles.css";
import fetchHelper from "../../Functions/FetchFunction";
import "../../Messaging/MessageStyles.css";

export default function ChatInterface() {
	const location = useLocation();
	const [messages, setMessages] = useState([]);
	const [doctorPatients, setDoctorPatients] = useState([]);
	const [listDoctors, setListDoctors] = useState([]);
	const [userId, setUserId] = useState("");
	const [userRole, setUserRole] = useState("");
	const [receiverId, setReceiverId] = useState(null);

	console.log(userId, userRole);

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		const storedUserRole = localStorage.getItem("userRole");
		setUserId(storedUserId);
		setUserRole(storedUserRole);

		if (storedUserRole === "patient") {
			fetchListDoctors();
		}
	}, []);

	useEffect(() => {
		if (userId && receiverId) {
			fetchMessages();
		}

		if (userRole === "doctor") {
			fetchDoctorPatients();
		}
	}, [userId, receiverId, userRole]);

	const fetchMessages = async () => {
		if (!userId || !receiverId) {
			console.log("Invalid userId or receiverId");
			return;
		}

		try {
			const senderId = userId;
			const url = `/chat/messages/${senderId}/${receiverId}`;
			const data = await fetchHelper.get(url);
			setMessages(data);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};

	const fetchDoctorPatients = async () => {
		try {
			const url = `/doctors/${userId}/patients`;
			const data = await fetchHelper.get(url);
			setDoctorPatients(data);
		} catch (error) {
			console.error("Error fetching doctor's patients:", error);
		}
	};

	const fetchListDoctors = async () => {
		try {
			console.log("Fetching doctors");

			const url = `/patient/doctors`;
			const data = await fetchHelper.get(url);
			console.log(data);
			setListDoctors(data);
		} catch (error) {
			console.error("Error fetching list of doctors:", error);
		}
	};

	const handleReceiverSelection = (selectedDoctor) => {
		setReceiverId(selectedDoctor.user_id);
	};

	console.log(receiverId);
        const title = userRole === "patient" ? "Available Doctors" : "My Patients";
    
	return (
		<div className="chat-page">
            <div className="cards-container">
            <h2 className="list-title">{title}</h2>

				{userRole === "patient" && (
					<ul>
						{listDoctors.map((doctor) => (
							<li className="card"
								key={doctor.id}
								onClick={() => handleReceiverSelection(doctor)}>
<h4 className="card-title">{doctor.first_name} {doctor.last_name}</h4>
    <p className="card-detail">{doctor.specialty}</p>							</li>
						))}
					</ul>
				)}
				{userRole === "doctor" && (
					<ul>
						{doctorPatients.map((patient) => (
							<li className="card"
								key={patient.id}
								onClick={() => handleReceiverSelection(patient.id)}>
    <h4 className="card-title">{patient.first_name} {patient.last_name}</h4>
    <p className="card-detail">{patient.specialty}</p>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="chat-container">
				{messages.map((msg, index) => (
					<ChatMessage
						key={index}
						message={msg.text}
						isSender={msg.userId === userId}
						timestamp={msg.timestamp}
                        className='chat-message-design'
					/>
				))}
				<MessageForm
                    className='message-form-design'
					userId={userId}
					userRole={userRole}
				/>
			</div>
			
		</div>
	);
}
