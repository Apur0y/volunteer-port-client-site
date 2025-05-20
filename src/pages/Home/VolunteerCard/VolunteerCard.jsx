import React from "react";
import { useNavigate } from "react-router-dom";

const VolunteerCard = ({ sortedPosts }) => {

  const navigate =useNavigate();

  const handleViewDetails = (postId) => {
    navigate(`/viewdetails/${postId}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPosts.map((post) => (
          <div
            key={post?._id}
            className="border flex flex-col justify-between rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-white"
          >
            <img
              src={post?.thumbnail || "/default.jpg"}
              alt={post?.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 border-b-2">
              <p className="text-sm font-bold text-neutral-600 mt-1">
                {post?.category}
              </p>
              <h3 className="text-xl font-bold text-sky-900">
                {post?.postTitle}
              </h3>

            </div>


                 <div className="px-4 pt-2">
                                <p className="text-sm text-neutral-600 ">
                <strong>Location:</strong> {post?.location}
              </p>
            <p className="text-sm text-neutral-600 ">
                <strong>Deadline:</strong> {post?.deadline}
              </p>



            </div>
            
              
             

            
             <div className="bg-gray-200 p-4 w-full">
                <button
                  onClick={() => handleViewDetails(post?._id)}
                  className=" w-full px-4 py-1 text-sm bg-white text-sky-900 font-semibold  hover:bg-sky-800 hover:text-white transition duration-300"
                >
                  View Details
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerCard;
