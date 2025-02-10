import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VolunteerNeed = () => {
  const [posts, setPosts] = useState([]);

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
    <div className="my-8 bg-green-800 p-6 rounded shadow-lg w-11/12 mx-auto">
      <h2 className="text-3xl font-extrabold text-center border-b-2 text-white mb-6">
        Volunteer Needs Now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPosts.map((post) => (
          <div
            key={post?._id}
            className="bg-white border border-green-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={post?.thumbnail || "https://img.freepik.com/free-photo/helping-hands-volunteer-support-community-service-graphic_53876-64955.jpg?semt=ais_hybrid"}
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
              <p className="text-sm text-red-500 mt-1">
                <strong>Deadline:</strong> {post?.deadline}
              </p>
              <button
                onClick={() => handleViewDetails(post?._id)}
                className="mt-4 w-full px-4 py-2 bg-green-950 text-white font-semibold rounded hover:bg-green-800 transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
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
