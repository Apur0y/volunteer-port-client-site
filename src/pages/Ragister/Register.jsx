import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/register.json"

import { auth } from "../../firebase.init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const Register = () => {

  const{userSignUp,updateUserProfile} =useContext(AuthContext)

  const navigate =useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!isLongEnough) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!name || !email || !photoURL || !password) {
      toast.error("All fields are required.");
      return;
    }

    userSignUp(email,password)
    .then(res=>{
      console.log(res)
      updateUserProfile({ displayName: name, photoURL: photoURL })
      navigate('/')
    }
      
    )
    .catch(error=>{
        console.log(error.data)
    })

    if (validatePassword(password)) {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome, ${name}!`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl shadow-lg bg-white rounded-lg">
        {/* Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-green-600">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Lottie Animation Section */}
        <div className="hidden md:flex items-center justify-center bg-green-100">
        <Lottie animationData={animationData} loop={true} className="w-3/4" />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
