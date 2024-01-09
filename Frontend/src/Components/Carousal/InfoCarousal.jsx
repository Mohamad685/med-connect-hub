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
			setReverse(!reverse); // Toggle the direction
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
				modules={[Pagination, Autoplay]}
				className="mySwiper">
				<SwiperSlide>
					{" "}
					<div className="info-box">
						<img
							src="../../src/assets/pics/DNA.png"
							alt="DNA pic"
							className="DNA-info"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					{" "}
					<div>
						<img
							src=""
							alt="DNA pic"
							className="DNA-info"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
