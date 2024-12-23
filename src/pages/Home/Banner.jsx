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
      className="w-full h-[500px]"
    >
      <SwiperSlide className="bg-emerald-900 flex items-center justify-center text-white text-xl font-bold">
        <div className="flex w-1/2">
          
          <h2>Slide 1: Join Us in Making a Difference</h2>
          <p>Be part of our volunteer team today!</p>
          <img src="https://factsmgt.com/wp-content/uploads/5-Benefits-of-Volunteering-at-Your-Childrens-School.jpg" alt="" className="m-10 rounded-full" />
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-emerald-900 flex items-center justify-center text-white text-xl font-bold">
        <div className="flex justify-between">
         <div className="flex flex-col ">
         <h2>Slide 2: Your Help Matters</h2>
         <p>Contribute to the community with your skills.</p>
         </div>
          <img src="https://es.statefarm.com/content/dam/sf-library/en-us/secure/legacy/simple-insights/volunteer-at-a-school.jpg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-emerald-900 flex items-center justify-center text-white text-xl font-bold">
        <div className="flex w-1/2">
          <h2>Slide 3: Make a Positive Impact</h2>
          <p>Explore our volunteer opportunities now!</p>
          <img src="https://www.stollerykids.com/content/uploads/2022/07/CubCinema_volunteers.jpg" alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
