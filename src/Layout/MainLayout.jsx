import { Outlet } from "react-router-dom";
import Navbar from "../share/Navbar";
import Footer from "../share/Footer";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";


const MainLayout = () => {
    
  const {light} = useContext(AuthContext)

    return (
        <div className={`${light?"bg-white text-black":"bg-zinc-700 text-white"} mx-auto `}>
            <Navbar></Navbar>
            <div className="">
            <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;