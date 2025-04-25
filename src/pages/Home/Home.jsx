import { useContext } from "react";
import Navbar from "../../share/Navbar";
import Banner from "./Banner";
import VolunteerNeed from "./VolunteerNeed";
import AuthContext from "../../context/AuthContext/AuthContext";
import Message from "./Message";
import Description from "./Description";
import { Helmet } from "react-helmet-async";
import Categories from "./Categories";
import CategoriesSection from "./Featured";


const Home = () => {



    return (
        <div className={` mx-auto  `}>
          <Helmet>
          <title>Home - Volunteer Port</title>
          <meta name="description" content="Welcome to Volunteer Port Home Page" />
          </Helmet>
          <Banner></Banner>
          <VolunteerNeed></VolunteerNeed>
        <Categories></Categories>
          <Description></Description>
          <CategoriesSection></CategoriesSection>
            <Message></Message>
         
        </div>
    );
};

export default Home;