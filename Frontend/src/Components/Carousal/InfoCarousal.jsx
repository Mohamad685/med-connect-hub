import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./InfoCarousal.css";
import { Pagination, Autoplay } from "swiper/modules";

export default function Carousel() {
	const [reverse, setReverse] = useState(false);

	const handleSwiperEnd = (swiper) => {
		if (swiper.isEnd) {
			setReverse(!reverse);
		}
	};
	return (
		<>
			<Swiper
				pagination={{ dynamicBullets: true }}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
					reverseDirection: reverse,
				}}
				onReachEnd={handleSwiperEnd}
				speed={2500}
				modules={[Pagination, Autoplay]}
				className="mySwiper">
				<SwiperSlide>
					{" "}
					<span className="info-title">
						New Information
						<p className="info-text">
							Stress affects diabetes by altering blood sugar levels and
							disrupting self-care routines. Managing it through exercise,
							mindfulness, a balanced diet, good sleep, support networks, and
							professional help is crucial for effective diabetes control.
							Regular monitoring and adjusting diabetes management during stress
							is also essential.
						</p>
					</span>
					<img
						src="../../src/assets/pics/diabetes.jpg"
						alt="DNA pic"
						className="DNA-info"
					/>
				</SwiperSlide>
				<SwiperSlide>
					{" "}
					<span className="info-title">
						New Information
						<p className="info-text">
							Smoking causes significant DNA damage through mutations, oxidative
							stress, and epi-genetic changes, leading to disrupted cell
							functions and an increased risk of cancers and other diseases.
							These molecular alterations highlight the severe health impacts of
							smoking.
						</p>
					</span>
					<img
						src="../../src/assets/pics/DNA.png"
						alt="DNA pic"
						className="DNA-info"
					/>
				</SwiperSlide>
				<SwiperSlide>
					{" "}
					<span className="info-title">
						New Information
						<p className="info-text">
							Smoking causes significant DNA damage through mutations, oxidative
							stress, and epi-genetic changes, leading to disrupted cell
							functions and an increased risk of cancers and other diseases.
							These molecular alterations highlight the severe health impacts of
							smoking.
						</p>
					</span>
					<img
						src="../../src/assets/pics/DNA.png"
						alt="DNA pic"
						className="DNA-info"
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
