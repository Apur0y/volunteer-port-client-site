import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { TbArrowBadgeRight } from "react-icons/tb";
import VolunteerCard from "./VolunteerCard/VolunteerCard";

const VolunteerNeed = () => {
  const [posts, setPosts] = useState([]);

    const {light} = useContext(AuthContext)
      const lightClass = light ? "bg-white text-black" : "bg-zinc-700 text-white"

  // Fetch user-specific posts
  useEffect(() => {
    axios
      .get("https://volunteer-back.vercel.app/allposts")
      .then((res) => setPosts(res.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const sortedPosts = posts
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 8);

  const navigate = useNavigate();

  const handleViewDetails = (postId) => {
    navigate(`/viewdetails/${postId}`);
  };

  return (
    <div className={`my-8 ${light?"bg-white text-black":"bg-zinc-800 text-white"} p-6 rounded shadow-lg w-11/12 mx-auto`}>
      <h2 className="text-3xl font-extrabold  border-b-2 flex mb-6">
        <TbArrowBadgeRight className="size- my-auto" />Volunteer Needs Now
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPosts.map((post) => (
          <div
            key={post?._id}
            className="  rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={post?.thumbnail || "/default.jpg"}
              alt={post?.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold ">
                {post?.postTitle}
              </h3>
              <p className="text-sm  mt-1">
                <strong>Category:</strong> {post?.category}
              </p>
              <p className="text-sm text-yellow-500 mt-1">
                <strong>Deadline:</strong> {post?.deadline}
              </p>
              <button
                onClick={() => handleViewDetails(post?._id)}
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-800 transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div> */}
      <VolunteerCard sortedPosts={sortedPosts}></VolunteerCard>

      <div className="text-center mt-6">
        <Link to="/allposts">
          <button className="px-8 py-3 bg-green-700 text-white text-lg font-semibold rounded hover:bg-green-800 transition duration-300">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeed;
