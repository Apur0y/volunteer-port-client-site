import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div>
      {/* Main Banner Content */}
      <div className="absolute w-1/2 z-10 inset-0 flex flex-col items-start justify-center text-left text-white px-6 lg:px-20 h-full">
        <p className="text-lg lg:text-2xl font-semibold mb-4">Making a Difference</p>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Together we can create positive change in the world.
        </h1>
        <p className="text-lg lg:text-xl mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="flex gap-4">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg">
            Donate
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg">
            Events
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop={true}
        className="relative w-full h-[800px]"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-full"
          style={{
            backgroundImage:
              "url('https://factsmgt.com/wp-content/uploads/5-Benefits-of-Volunteering-at-Your-Childrens-School.jpg')",
          }}
        >
          {/* Gradient Overlay (darker on right side) */}
          <div className="absolute inset-0 bg-gradient-to-r  from-black  to-transparent"></div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide
          className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-full"
          style={{
            backgroundImage:
              "url('https://es.statefarm.com/content/dam/sf-library/en-us/secure/legacy/simple-insights/volunteer-at-a-school.jpg')",
          }}
        >
          {/* Gradient Overlay (darker on right side) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide
          className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-full"
          style={{
            backgroundImage:
              "url('https://www.stollerykids.com/content/uploads/2022/07/CubCinema_volunteers.jpg')",
          }}
        >
          {/* Gradient Overlay (darker on right side) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black v to-transparent"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
