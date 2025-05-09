import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase.init";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);
  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    userLogin(email, password)
      .then((result) => {
        navigate("/");
        toast.success("Login Successful!");
        const user = { email: result.user.email };
        axios
          .post("https://volunteer-back.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data));
      })

      .catch((error) => {
        toast.error(error.message || "Login Failed!");
      });
  };

  const googleProvider = new GoogleAuthProvider();
  // Handle Google Login
  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate("/");
        toast.success("Login Successful!");
        const user = { email: result.user.email };
        axios
          .post("https://volunteer-back.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data));
      })
      .catch((error) => {
        toast.error(error.message || "Login Failed!");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-200 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-200 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login with Google
          </button>
        </div>
        <p className="mt-4 text-black text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
