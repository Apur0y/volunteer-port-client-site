import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const banners = [
    {
      image:
        "https://factsmgt.com/wp-content/uploads/5-Benefits-of-Volunteering-at-Your-Childrens-School.jpg",
    },
    {
      image:
        "https://es.statefarm.com/content/dam/sf-library/en-us/secure/legacy/simple-insights/volunteer-at-a-school.jpg",
    },
    {
      image:
        "https://www.stollerykids.com/content/uploads/2022/07/CubCinema_volunteers.jpg",
    },
  ];

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://volunteer-back.vercel.app/allposts?title=${searchQuery}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts from the backend
useEffect(() => {
  if (searchQuery.trim() === "") {
    setPosts([]); // Clear results if input is empty
    return;
  }

  const delayDebounce = setTimeout(() => {
    fetchPosts();
  }, 500); // Add debounce

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);


  const handleSearch = async () => {
    try {
      fetchPosts();
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };
  console.log(posts);
  return (
    <div>
      {/* Main Banner Content */}
      <div className="absolute z-10 inset-0 flex flex-col items-start justify-center text-left text-white pt-20 md:pt-20 px-6 lg:px-20 h-full">
        <div className=" mx-auto">
          <p className="text-lg lg:text-2xl font-semibold md:mb-4">
            Making a Difference
          </p>
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">
            Together we can create positive change in the world.
          </h1>
          <p className="text-sm lg:text-xl mb-6">
            The way to make the world more beautiful by giving a moment from
            your life to the world.
          </p>
        </div>

        <div className="relative w-full ">

        <div className="mb-1 bg-white/60 rounded-lg p-3 md:p-8 flex gap-2 justify-center items-center mx-auto md:w-11/12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Post Title"
            className="bg-white p-2 text-gray-700 font-bold  w-full  rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-sky-500  px-4 py-2 rounded hover:bg-sky-600 transition"
          >
            Search
          </button>
        </div>
        <div className="absolute h-[200px] w-10/12 overflow-auto rounded-lg mx-auto md:left-20">
        {posts.length > 0 ? (
          <ul className="space-y-4 ">
            {posts.map((post) => (
              <Link to={`/viewdetails/${post._id}`}>
                  <li key={post._id} className=" p-2 border-b-2  bg-white">
                <h2 className="text-md md:text-lg font-semibold text-black">
                  {post.postTitle}
                </h2>
                <p className="text-gray-600 hidden md:flex">{post.description}</p>
              </li>
              </Link>
          
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">{""}</p>
        )}
      </div>
        </div>


      </div>
      

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="relative w-full h-[400px] md:h-[800px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide
            key={index}
            className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-full"
            style={{
              backgroundImage: `url('${banner.image}')`,
            }}
          >
            {/* Gradient Overlay (darker on right side) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
