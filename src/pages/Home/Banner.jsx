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
      autoplay={{ delay: 4000 }}
      loop={true}
      className="w-full h-[600px]"
    >
      {/* Slide 1 */}
      <SwiperSlide
        className="flex items-center bg-cover bg-center bg-no-repeat text-white px-6 lg:px-20 h-full"
        style={{
          backgroundImage:
            "url('https://factsmgt.com/wp-content/uploads/5-Benefits-of-Volunteering-at-Your-Childrens-School.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 mx-auto p-8 top-1/2 rounded-lg w-full lg:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg lg:text-xl mb-6">
            Be part of our volunteer team and create a lasting impact!
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg">
            Get Involved
          </button>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide
        className="flex items-center justify-center bg-cover bg-center bg-no-repeat text-white px-6 lg:px-20 h-full"
        style={{
          backgroundImage:
            "url('https://es.statefarm.com/content/dam/sf-library/en-us/secure/legacy/simple-insights/volunteer-at-a-school.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 mx-auto p-8 rounded-lg w-full  lg:w-1/2 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Help Matters
          </h2>
          <p className="text-lg lg:text-xl mb-6">
            Use your unique skills to uplift our community!
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg">
            Learn More
          </button>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide
        className="flex items-center bg-cover bg-center bg-no-repeat text-white px-6 lg:px-20 h-full"
        style={{
          backgroundImage:
            "url('https://www.stollerykids.com/content/uploads/2022/07/CubCinema_volunteers.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 mx-auto p-8 rounded-lg w-full lg:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Make a Positive Impact
          </h2>
          <p className="text-lg lg:text-xl mb-6">
            Explore our volunteer opportunities and start today!
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg">
            Explore Now
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
