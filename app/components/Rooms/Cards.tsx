import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

const Cards = () => {
    
  return (
    <div className='flex justify-center items-center'>
        <Swiper
        effect={'cards'}
        grabCursor={true}
        loop={true}
        modules={[EffectCards]}
        className="mySwiper h-[340px] w-[260px] lg:h-[500px] lg:w-[400px] xl:h-[500px] xl:w-[400px] relative top-[20px] lg:top-[50px] xl:top-[50px]"
        >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>

    </div>
  )
}

export default Cards