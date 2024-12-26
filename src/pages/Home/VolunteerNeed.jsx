import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerNeed = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  // Fetch user-specific posts
  useEffect(() => {
    axios
      .get("http://localhost:3000/allposts")
      .then((res) => setPosts(res.data));
  }, []);
  const sortedPosts = posts
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 6);

  const navigate = useNavigate();

  const handleViewDetails = (postId) => {
    navigate(`/viewdetails/${postId}`);
  };
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center text-green-600">
        Volunteer Needs Now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {sortedPosts.map((post) => (
          <div key={post?.id} className="border rounded shadow-md p-4">
            <img
              src={post?.thumbnail}
              alt={post?.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-bold">{post?.title}</h3>
            <p className="text-sm text-gray-500">{post?.category}</p>
            <p className="text-sm text-red-500">Deadline: {post?.deadline}</p>
            <button
              onClick={() => handleViewDetails(post?._id)}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          See All
        </button>
      </div>
    </div>
  );
};

export default VolunteerNeed;