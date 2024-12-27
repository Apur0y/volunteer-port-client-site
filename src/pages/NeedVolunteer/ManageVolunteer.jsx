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
  console.log(posts);
  console.log(request);
  // Fetch user-specific posts
  useEffect(() => {
    axios
      .get(`http://localhost:3000/userposts?email=${user?.email}`)
      .then((res) => setPosts(res.data));

      axios
      .get(`http://localhost:3000/userequestedpost?email=${user?.email}`)
      .then((res) => {
        setRequest(res.data); // Set the response data to state
      })
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`http://localhost:3000/updatepost/${id}`) // Corrected endpoint
        .then((res) => {
      
          console.log("Deleted:", res.data);
          // Optional: Update the posts state to remove the deleted post
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting post:", err);
        });
        
      }
    });


  };

  const handleCancel = async(id)=>{
    axios.delete(`http://localhost:3000/userequestedpost/${id}`)
    .then(res=>{
      console.log(res.data)
      alert("Cancel post sucessfull")
      setRequest((prevPosts) => prevPosts.filter((post) => post._id !== id));
    })
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 shadow rounded">
      <Helmet>
        <title>Manage Post - Volunteer Post</title>
      </Helmet>
      <div className="">
        <div className="max-w-6xl  mx-auto mt-10 p-6 shadow rounded">
          <h2 className="text-2xl border-b-2  font-bold mb-6 text-center">
            My Volunteer Request
          </h2>

          {!request ? (
            <p className="text-center text-gray-500">
              No volunteer request found. Start by creating one!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className=" ">
                    <th className="border border-gray-300 px-4 py-2">
                    Post Title
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                    Category
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    request.map((request)=>(
                      <tr className="hover:bg-green-800">
                    <td className="border border-gray-300 px-4 py-2">
                      {request?.postTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request?.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request?.deadline}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleCancel(request._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 border-b-2 text-center">
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
              <tr className="">
                <th className="border border-gray-300 px-4 py-2">Post Title</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-green-800">
                  <td className="border border-gray-300 px-4 py-2">
                    {post.postTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.deadline}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <Link value={post} to={`/updatepost/${post._id}`}>
                      <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-blue-600">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
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
