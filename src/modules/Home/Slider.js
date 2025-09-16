"use client";

import image1 from "../../../public/homeSliders/1.webp";
import image2 from "../../../public/homeSliders/2.webp";
import image3 from "../../../public/homeSliders/3.webp";
import image4 from "../../../public/homeSliders/4.webp";
import image5 from "../../../public/homeSliders/5.webp";
import image6 from "../../../public/homeSliders/6.webp";
import image7 from "../../../public/homeSliders/7.gif";
import image8 from "../../../public/homeSliders/8.webp";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Slider.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image1} alt="image1" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image2} alt="image2" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image3} alt="image3" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image4} alt="image4" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image5} alt="image5" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image6} alt="image6" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image7} alt="image7" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperslides}>
          <Image src={image8} alt="image8" />
        </SwiperSlide>
        <div className={styles.autoplayprogress} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
