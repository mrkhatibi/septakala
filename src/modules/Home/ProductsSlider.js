"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./ProductsSlider.module.css";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import getAllPosts from "../getAllPosts";
import toast from "react-hot-toast";
import Image from "next/image";
import { formatRial } from "@/utils/topersianprice";
import Link from "next/link";
import Spinner from "../loader/Loader";

export default function ProductsSlider() {
  const [Posts10, set10Posts] = useState([]);
  useEffect(() => {
    async function getAll() {
      const res = await getAllPosts();
      if (!res) {
        toast.error("مشکلی پیش آمده است");
      }
      const random10 = res.sort(() => 0.5 - Math.random());
      set10Posts(random10.slice(0, 10));
    }
    getAll();
  }, []);
  if (!Posts10) return <Spinner />;
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={6} // پیش‌فرض دسکتاپ
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.slidersContainer}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        {Posts10.map((item) => (
          <SwiperSlide key={item._id} className={styles.sliders}>
            <Link href={`/products/${item._id}`}>
              <Image
                src={item.images[0]}
                alt={item.name}
                width={140}
                height={80}
              />
              <h3>{item.name}</h3>
              <h4>{item.category}</h4>
              <h3>{formatRial(item.price)}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
