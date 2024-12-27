import { useContext } from "react";
import Navbar from "../../share/Navbar";
import Banner from "./Banner";
import VolunteerNeed from "./VolunteerNeed";
import AuthContext from "../../context/AuthContext/AuthContext";
import Message from "./Message";
import Description from "./Description";
import { Helmet } from "react-helmet-async";


const Home = () => {

  const {light} = useContext(AuthContext)
    const lightClass = light ? "bg-white" : "bg-gray-800 text-white"

    return (
        <div className={`${lightClass}`}>
          <Helmet>
          <title>Home - Volunteer Port</title>
          <meta name="description" content="Welcome to Volunteer Port Home Page" />
          </Helmet>
          <Banner></Banner>
          <VolunteerNeed></VolunteerNeed>
            <Message></Message>
            <Description></Description>
        </div>
    );
};

export default Home;