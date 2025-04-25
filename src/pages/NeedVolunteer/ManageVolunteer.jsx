import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyVolunteerPosts = () => {
  const { user, loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [request, setRequest] = useState([]);

  // Fetch user-specific posts
  useEffect(() => {
    axios.get(`https://volunteer-back.vercel.app/userposts?email=${user?.email}`)
      .then((res) => setPosts(res.data));
    axios.get(`https://volunteer-back.vercel.app/userequestedpost?email=${user?.email}`)
      .then((res) => setRequest(res.data));
  }, []);

  // Handle delete post
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://volunteer-back.vercel.app/updatepost/${id}`)
          .then(() => setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id)))
          .catch((err) => console.error("Error deleting post:", err));
      }
    });
  };

  // Handle cancel request
  const handleCancel = async (id) => {
    axios.delete(`https://volunteer-back.vercel.app/userequestedpost/${id}`)
      .then(() => {
        Swal.fire("Canceled!", "Your request has been removed.", "success");
        setRequest((prevRequests) => prevRequests.filter((request) => request._id !== id));
      });
  };

  return (
    <div className="pt-24 min-h-screen px-6 pb-5">
      <Helmet>
        <title>Manage Post - Volunteer Post</title>
      </Helmet>
      <div className="max-w-6xl mx-auto backdrop-blur-2xl bg-black/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center border-b pb-3 mb-6">My Volunteer Request</h2>
        {request.length === 0 ? (
          <p className="text-center text-gray-500">No volunteer requests found. Start by creating one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Post Title</th>
                  <th className="py-3 px-5 text-left">Category</th>
                  <th className="py-3 px-5 text-left">Deadline</th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {request.map((req) => (
                  <tr key={req._id} className="border-b ">
                    <td className="py-3 px-5">{req.postTitle}</td>
                    <td className="py-3 px-5">{req.category}</td>
                    <td className="py-3 px-5">{req.deadline}</td>
                    <td className="py-3 px-5 text-center">
                      <button onClick={() => handleCancel(req._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-8 mt-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center  border-b pb-3 mb-6">My Volunteer Need Posts</h2>
        {loading ? (
          <p className="text-center">Loading your posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center ">You have not added any volunteer need posts yet. Start by adding one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Post Title</th>
                  <th className="py-3 px-5 text-left">Category</th>
                  <th className="py-3 px-5 text-left">Deadline</th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b ">
                    <td className="py-3 px-5">{post.postTitle}</td>
                    <td className="py-3 px-5">{post.category}</td>
                    <td className="py-3 px-5">{post.deadline}</td>
                    <td className="py-3 px-5 text-center flex gap-3 justify-center">
                      <Link to={`/updatepost/${post._id}`}>
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Update</button>
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVolunteerPosts;
