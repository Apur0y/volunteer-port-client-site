import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddVolunteerPost = () => {
  const { postId } = useParams(); 
  const { user } = useContext(AuthContext);
  const [postDetails, setPostDetails] = useState(null);
  const [formData, setFormData] = useState(null);

  // Fetch the post details
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/postdetails/${postId}`
        );
        setPostDetails(response.data);
        setFormData({
          thumbnail: response.data.thumbnail,
          postTitle: response.data.postTitle,
          description: response.data.description,
          category: response.data.category,
          location: response.data.location,
          volunteersNeeded: response.data.volunteersNeeded,
          deadline: new Date(response.data.deadline),
          userEmail: user.email,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [postId, user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, deadline: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/updatepost/${postId}`,
        formData
      );
      Swal.fire({
        title: "Post Updated!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      Swal.fire({
        title: "Update Failed!",
        text: "There was an error updating your post.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-green-400 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Your Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Post Title</label>
          <input
            type="text"
            name="postTitle"
            value={formData.postTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social-service">Social Service</option>
            <option value="animal-welfare">Animal Welfare</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Volunteers Needed</label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default AddVolunteerPost;
