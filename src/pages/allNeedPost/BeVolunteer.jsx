import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BeVolunteer = () => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVolunteered, setHasVolunteered] = useState(false);

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `https://volunteer-back.vercel.app/postdetails/${postId}`
        );
        setPostDetails(response.data);
      } catch (err) {
        setError("Failed to load post details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [postId]);

  // Handle volunteering
  const handleBecomeVolunteer = async () => {
    if (!postDetails || postDetails.volunteersNeeded <= 0) {
      toast.error("No more volunteers needed for this post.");
      return;
    }

    const requestData = {
      volunteerName: user.name,
      volunteerEmail: user.email,
      status: "requested",
    };

  postDetails.prevId= postDetails._id;
  delete postDetails._id
    try {
      const response = await axios.post("https://volunteer-back.vercel.app/requested", {
        ...requestData,
        postId: postDetails.id,
        ...postDetails,
      });

      if (response.status === 200) {
        await axios.put(
          `https://volunteer-back.vercel.app/updatecount/${postDetails.prevId}`,
          { count: -1 }
        );
        setHasVolunteered(true);
        toast.success("You have successfully volunteered!");
      }
    } catch (err) {
      console.error("Error submitting volunteer request:", err);
      toast.error("Failed to submit your request. Please try again.");
    }
  };

  return (
    <div className="volunteer-container p-8 max-w-5xl mx-auto pt-44">
      {loading && <p className="text-center">Loading post details...</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}
      {postDetails && !loading && !error && (
        <>
          <div className="shadow-lg rounded-lg p-6 bg-zinc-800" >
            {/* Header Section */}
            <div className="flex items-center mb-6">
              <img
                src={postDetails.thumbnail}
                alt="Post Thumbnail"
                className="w-32 h-32 object-cover rounded shadow-md mr-6"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {postDetails.postTitle}
                </h2>
                <p className="text-white italic">{postDetails.category}</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white">Description:</h4>
                <p className="text-white">{postDetails.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Location:</h4>
                <p className="text-white">{postDetails.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Volunteers Needed:
                </h4>
                <p className="text-white">
                  {postDetails.volunteersNeeded > 0
                    ? postDetails.volunteersNeeded
                    : "No slots available"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Deadline:</h4>
                <p className="text-white">{postDetails.deadline}</p>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="mt-6">
              <h4 className="font-semibold text-white">Organizer:</h4>
              <p className="text-white">
                {postDetails.organizerName} (
                <span className="text-blue-500">
                  {postDetails.organizerEmail}
                </span>
                )
              </p>
            </div>

            {/* Volunteer Action */}
            <div className="mt-6 text-center">
              {hasVolunteered ? (
                <p className="text-green-500 font-semibold">
                  You are now a volunteer for this post.
                </p>
              ) : postDetails.volunteersNeeded === 0 ? (
                <p className="text-red-600 font-semibold">
                  No more volunteers are needed for this post.
                </p>
              ) : (
                <button
                  onClick={handleBecomeVolunteer}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                >
                  Become a Volunteer
                </button>
              )}
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default BeVolunteer;
