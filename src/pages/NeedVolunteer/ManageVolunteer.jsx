import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MyVolunteerPosts = () => {
  const { user, loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
console.log(posts)
  // Fetch user-specific posts
  useEffect(() => {
    axios.get("http://localhost:3000/allposts")
    .then(res=>setPosts(res.data))
  }, []);
  // Handle delete post
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
  };

  // Handle update (Navigate to update page or show update form)
  const handleUpdate = (id) => {
    // Navigate to update page (example: `/update-post/${id}`)
   
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Volunteer Need Posts
      </h2>

      {loading ? (
        <p className="text-center">Loading your posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any volunteer need posts yet. Start by adding one!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Post Title</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {post.postTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(post.deadline).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                 <Link to={`/updatepost/${post.id}`}>
                 <button
                      onClick={() => handleUpdate(post.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                 </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerPosts;
