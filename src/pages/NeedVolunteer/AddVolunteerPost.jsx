import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddVolunteerPost = () => {

  const {user} = useContext(AuthContext)
 
  const [formData, setFormData] = useState({
    thumbnail: '',
    postTitle: "",
    description: "",
    category: "healthcare",
    location: "",
    volunteersNeeded: null,
    deadline: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  // };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, deadline: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

    axios.post('https://volunteer-back.vercel.app/addpost',{
    thumbnail:formData.thumbnail,
    postTitle:formData.postTitle,
    description:formData.description,
    category:formData.category ,
    location: formData.location,
    volunteersNeeded: Number(formData.volunteersNeeded) ,
    deadline:formData.deadline,
      userEmail:user.email
    })
    .then(res=>{
    Swal.fire({
                title: "Post Added!",
                text: "Your file has been deleted.",
                icon: "success"
              }); 
    })
    
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-green-800 p-6 rounded shadow">
       <Helmet>
              <title>Add Post - Volunteer Post</title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center">Add Volunteer Need Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium">Thumbnail</label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter post thumbnail url"
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block text-sm font-medium">Post Title</label>
          <input
            type="text"
            name="postTitle"
            value={formData.postTitle}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
       

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social-service">Social Service</option>
            <option value="animal-welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* No. of Volunteers Needed */}
        <div>
          <label className="block text-sm font-medium">No. of Volunteers Needed</label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            placeholder="Enter number of volunteers"
            className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 text-black py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Organizer Info (Read-Only) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Organizer Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full text-black px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organizer Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-3 py-2 text-black border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddVolunteerPost;
