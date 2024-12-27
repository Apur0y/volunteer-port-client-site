import { Outlet } from "react-router-dom";
import Navbar from "../share/Navbar";
import Footer from "../share/Footer";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";


const MainLayout = () => {
    
  const {light} = useContext(AuthContext)
  const lightClass = light ? "bg-white" : "bg-gray-800 text-white"
    return (
        <div className={` mx-auto ${lightClass}`}>
            <Navbar></Navbar>
            <div className="my-8">
            <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;