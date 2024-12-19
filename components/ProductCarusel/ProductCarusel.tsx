import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ListProduct from "../ListProduct";
import Hero from "@/pages/Home pages/Hero";

export default function HeroCarusel() {
    // Ref uchun to'g'ri turlar aniqlanadi
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);

    // onAutoplayTimeLeft funksiyasi uchun turlar
    const onAutoplayTimeLeft = (
        swiper: any,
        time: number,
        progress: number
    ): void => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide><Hero/></SwiperSlide>
                <SwiperSlide><Hero/></SwiperSlide>
                <SwiperSlide><Hero/></SwiperSlide>
                {/* Progress indicator */}
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
}
