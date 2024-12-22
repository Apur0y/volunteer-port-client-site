import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";


const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full h-[400px]"
    >
      <SwiperSlide className="bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
        <div>
          <h2>Slide 1: Join Us in Making a Difference</h2>
          <p>Be part of our volunteer team today!</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-green-500 flex items-center justify-center text-white text-xl font-bold">
        <div>
          <h2>Slide 2: Your Help Matters</h2>
          <p>Contribute to the community with your skills.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-red-500 flex items-center justify-center text-white text-xl font-bold">
        <div>
          <h2>Slide 3: Make a Positive Impact</h2>
          <p>Explore our volunteer opportunities now!</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
