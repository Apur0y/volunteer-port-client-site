import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Ragister/Register";
import AddVolunteerPost from "../pages/NeedVolunteer/AddVolunteerPost";
import Private from "./PrivateRoute/Private";
import MyVolunteerPosts from "../pages/NeedVolunteer/ManageVolunteer";

import VolunteerPosts from "../pages/allNeedPost/VolunteerPosts";
import UpdateVolunteerPost from "../pages/NeedVolunteer/UpdateVolunteerPost";
import BeVolunteer from "../pages/allNeedPost/BeVolunteer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "needvolunteer",
        element: (
          <Private>
            <AddVolunteerPost></AddVolunteerPost>
          </Private>
        ),
      },
      {
        path: "managepost",
        element: (
          <Private>
            <MyVolunteerPosts></MyVolunteerPosts>
          </Private>
        ),
      },
      {
        path: "updatepost/:postId",
        element: (
          <Private>
            <UpdateVolunteerPost></UpdateVolunteerPost>
          </Private>
        ),
      },
      {
        path: "allposts",
        element: <VolunteerPosts></VolunteerPosts>,
      },
      {
        path: "viewdetails/:postId",
        element: (
          <Private>
            <BeVolunteer></BeVolunteer>
          </Private>
        ),
      },
    ],
  },
]);
export default router;