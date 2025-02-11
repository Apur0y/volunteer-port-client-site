import { Outlet } from "react-router-dom";
import Navbar from "../share/Navbar";
import Footer from "../share/Footer";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";


const MainLayout = () => {
    
  const {light} = useContext(AuthContext)

    return (
        <div className={` mx-auto bg-zinc-700`}>
            <Navbar></Navbar>
            <div className="">
            <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;