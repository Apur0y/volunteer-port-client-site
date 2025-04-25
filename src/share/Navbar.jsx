import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { MdDarkMode, MdKeyboardArrowDown } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = () => {
  const { user, userSignOut, light, handleToggle } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setisScroll] = useState(false);

  const handleLight = () => {
    handleToggle();
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    userSignOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && window.location.pathname =="/" || window.location.pathname === "/allposts" || window.location.pathname === "/needvolunteer" || window.location.pathname === "/managepost" || window.location.pathname === "/login" ) {
        setisScroll(true);
      } else {
        setisScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const links = (
    <>
      <li className="relative  ">
        <Link
          to="/"
          className="relative block pb-1 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full"
        >
          Home
        </Link>
      </li>
      <li className="relative ">
        <Link
          to="/allposts"
          className="relative block pb-1 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full"
        >
          All Volunteer
        </Link>
      </li>
      <li className="relative ">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button">
            <button
              className="flex md:uppercase relative  pb-1 
                   before:absolute before:bottom-0 before:left-0 
                   before:h-[2px] before:w-0 before:bg-red-600 
                   before:transition-all before:duration-300 
                   hover:before:w-full"
            >
              My Profile <MdKeyboardArrowDown className="size-6" />
            </button>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-zinc-800 text-white rounded-lg  z-[30] top-10 md:w-72 p-2 -right-24 shadow mt-1"
          >
            <li>
              <Link to="/needvolunteer">Add Volunteer Need Post</Link>
            </li>
            <li>
              <Link to="/managepost">Manage My Posts</Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
  const lightClass = light ? "bg-white text-black" : "bg-zinc-800 text-white";

  return (
    <div
    className={`${
      isScroll ? lightClass : "bg-transparent text-white"
    } transition-all duration-700 md:px-12 fixed z-40 navbar`}
  >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDropdown}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-zinc-700  rounded-box z-[30] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          )}
        </div>
        <img src="/sidelogo.png" alt="" className="w-10" />
        <a className="btn btn-ghost  text-xl">Volunteer Port</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu  menu-horizontal uppercase px-1 font-medium">
          {links}
        </ul>
      </div>
      <div>
        <div>
          <button
            className="hover:bg-blue-200 p-3 ml-20 md:ml-1 rounded-full"
            onClick={handleLight}
          >
            {light ? <MdDarkMode /> : <CiLight />}
          </button>
        </div>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            {/* Profile Picture with Tooltip */}
            <div className="relative group">
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full"
                alt="User Profile"
              />
              {/* Tooltip to show displayName */}
              <span
                className="absolute left-1/2 top-12 z-30 transform -translate-x-1/2 px-2 py-1 text-sm  bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                role="tooltip"
              >
                {user.displayName}
              </span>
            </div>
            <Link>
              <button onClick={handleSignOut} className="btn">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <Link to="login">
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
