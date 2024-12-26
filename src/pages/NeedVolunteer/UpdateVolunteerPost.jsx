import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext/AuthContext";
// import toast, { Toaster } from "react-hot-toast";

const UpdateVolunteerPost = ({ user }) => {
  const { id } = useParams(); // Get post ID from route params
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
const {loading} = useContext(AuthContext)

  // Fetch the post details by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
       
        // toast.error("Failed to load post data.");
      } finally {
     
      }
    };
    fetchPost();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your API endpoint to update the post
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        // toast.success("Post updated successfully!");
        navigate("/my-posts"); // Navigate back to the user's posts page
      } else {
        // toast.error("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      // toast.error("An error occurred while updating the post.");
    }
  };

  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      {/* <Toaster /> */}
      <h2 className="text-2xl font-bold mb-6 text-center">Update Volunteer Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              value={post.thumbnail || ""}
              onChange={(e) => setPost({ ...post, thumbnail: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              value={post.title || ""}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              rows="4"
              value={post.description || ""}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              value={post.category || ""}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="social_service">Social Service</option>
              <option value="animal_welfare">Animal Welfare</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              value={post.location || ""}
              onChange={(e) => setPost({ ...post, location: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-gray-700">
              No. of Volunteers Needed
            </label>
            <input
              type="number"
              id="volunteersNeeded"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              value={post.volunteersNeeded || ""}
              onChange={(e) => setPost({ ...post, volunteersNeeded: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            {/* <DatePicker
              selected={new Date(post.deadline) || ""}
              onChange={(date) => setPost({ ...post, deadline: date })}
              dateFormat="yyyy-MM-dd"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Name (Read-only)
            </label>
            <input
              type="text"
              readOnly
              value={user.name || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Email (Read-only)
            </label>
            <input
              type="email"
              readOnly
              value={user.email || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdateVolunteerPost;

