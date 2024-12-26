import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerPosts = () => {
 
  const [posts, setPosts] = useState([]);

  // Fetch user-specific posts
console.log(posts)
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/allposts?search=${encodeURIComponent(search)}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Post Title"
          className="border p-2 w-full md:w-1/2 rounded"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={post.thumbnail}
              alt={post.postTitle}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{post.postTitle}</h2>
            <p className="text-gray-600">{post.description}...</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Category:</strong> {post.category}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Location:</strong> {post.location}
            </p>
           
            <button
              onClick={() => navigate(`/viewdetails/${post._id}`)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerPosts;
