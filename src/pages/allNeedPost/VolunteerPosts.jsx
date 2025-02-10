import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet-async";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { CgLayoutList } from "react-icons/cg";

const VolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [layout, setLayout] = useState(true);
  const { light } = useContext(AuthContext);
  const lightClass = light ? "bg-white" : "bg-gray-800 text-white";
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://volunteer-back.vercel.app/allposts?title=${searchQuery}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // Fetch posts from the backend
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    try {
     fetchPosts()
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div className="container mx-auto pt-20 bg-green-800">
      <Helmet>
        <title>All Post - Volunteer Port</title>
      </Helmet>
      {/* Search Input */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Post Title"
          className="border p-2 text-black w-full md:w-1/2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>


      <div className="flex justify-between py-2">
        <div></div>
        <div className="flex gap-3">
          <button onClick={() => setLayout(true)} className="btn">
            <RiLayoutGrid2Fill className="size-6"></RiLayoutGrid2Fill>
          </button>
          <button onClick={() => setLayout(false)} className="btn">
            <CgLayoutList className="size-10"></CgLayoutList>
          </button>
        </div>
      </div>
      <div>
        {layout ? (
          <div
            className={`grid ${lightClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                className=" bg-green-900 text-white rounded shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={post.thumbnail}
                  alt={post.postTitle}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{post.postTitle}</h2>
                <p className="text-white">{post.description}...</p>
                <p className="text-sm text-white   mt-2">
                  <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
                </p>
                <p className="text-sm text-white">
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
        ) : (
          <div className={`container mx-auto ${lightClass} py-4`}>
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Thumbnail
          </th>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Post Title
          </th>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Description
          </th>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Volunteers Needed
          </th>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Location
          </th>
          <th className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
              {post.postTitle}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
              {post.description}...
            </td>
            <td className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
              {post.volunteersNeeded}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
              {post.location}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-sm lg:text-base">
              <button
                onClick={() => navigate(`/viewdetails/${post._id}`)}
                className="bg-blue-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        )}
      </div>
      {/* Cards Section */}
    </div>
  );
};

export default VolunteerPosts;
