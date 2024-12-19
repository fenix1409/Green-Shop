import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

// import required modules
import { Pagination } from 'swiper/modules';
import ListProduct from '../ListProduct';

export default function Carusel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><ListProduct/></SwiperSlide>
        <SwiperSlide><ListProduct/></SwiperSlide>
        <SwiperSlide><ListProduct/></SwiperSlide>
      </Swiper>
    </>
  );
}
