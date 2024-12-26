import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const Navbar = () => {

  const {user,userSignOut} = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut=()=>{
    userSignOut()
  }
  

  const links = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/allposts'>All Volunteer</Link>
      </li>
      <li>
        
        <div className="dropdown">
          <div tabIndex={0} >
        <button>My Profile</button>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[30] top-10  w-52 p-2 shadow"
          >
            <li><Link to='/needvolunteer'>Add Volunteer need Post</Link></li>
            <li><Link to='/managepost'>Manage My Posts</Link></li>
          </ul>
        </div>
      </li>
    </>
  );

  return (
    <div className="navbar border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" onClick={toggleDropdown} className="btn btn-ghost lg:hidden">
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
      <div className="navbar-end">
        {user ? (
          <>
            <img src={user.photoURL} alt="" className="w-16 rounded-full mr-4" />
            <Link ><button onClick={handleSignOut} className="btn"> Logout </button></Link>
          </>
        ) : (
          <>
          <Link to='login'><button className="btn">Login</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
