import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = () => {
  const { user, userSignOut, light, handleToggle } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLight = () => {
    handleToggle();
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    userSignOut();
  };

  const lightClass = light ? "bg-white" : "bg-gray-800 text-white";

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allposts">All Volunteer</Link>
      </li>
      <li>
        <div className="dropdown">
          <div tabIndex={0} role="button">
            <button>My Profile</button>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-500 text-white rounded-box z-[30] top-10 w-52 p-2 shadow"
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

  return (
    <div className={`${lightClass} navbar border-b-2`}>
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
              className="h-5 w-5"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[30] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          )}
        </div>
        <img src="/sidelogo.png" alt="" className="w-10" />
        <a className="btn btn-ghost text-xl">Volunteer Port</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div>
        <div>
          <button
            className="hover:bg-blue-200 p-3 ml-20 md:ml-1 rounded-full"
            onClick={handleLight}
            aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
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
                className="absolute left-1/2 top-12 z-30 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
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
