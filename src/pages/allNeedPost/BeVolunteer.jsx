import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get params from the URL
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const BeVolunteer = () => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams(); // Get postId from URL params
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVolunteered, setHasVolunteered] = useState(false);

  // Fetch post details by ID when the component mounts or when postId changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/postdetails/${postId}`
        );
        setPostDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [postId]);

  console.log(postDetails);
  // Handle "Become a Volunteer" button click
  const handleBecomeVolunteer = async () => {
    const requestData = {
      volunteerName: user.name,
      volunteerEmail: user.email,
      status: "requested",
    };

    try {
      // Step 1: Create the requested post in the database
      const response = await axios.post("http://localhost:3000/requested", {
        ...requestData,
        postId: postDetails.id,
        thumbnail: postDetails.thumbnail,
        postTitle: postDetails.postTitle,
        description: postDetails.description,
        category: postDetails.category,
        location: postDetails.location,
        volunteersNeeded: postDetails.volunteersNeeded,
        deadline: postDetails.deadline,
      });
      console.log(postDetails.volunteersNeeded);
      // Check if the post creation is successful
      if (response.status === 200 && postDetails.volunteersNeeded >0 ) {
        console.log("Post request created successfully");
        alert("Post request created successfully");
        // Step 2: After creating the post, decrement the volunteers needed
        axios.put(`http://localhost:3000/updatecount/${postDetails._id}`, {
          count: -1,
        });
        setHasVolunteered(true)
      }
      else{
        toast("Volunteer Full !!!")
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to volunteer.");
    }
  };


  // if(postDetails.volunteersNeeded <=0 ){
  //   setHasVolunteered(true)
  // }

  return (
    <div className="volunteer-container">
      <h2 className="text-xl font-bold mb-4">Post Details</h2>

      {loading && <p>Loading post details...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {postDetails && !loading && !error && (
        <>
          {/* Display Post Details */}
          <div>
            <label className="block font-medium">Thumbnail</label>
            <img
              src={postDetails.thumbnail}
              alt="Post Thumbnail"
              className="w-32 h-32 object-cover rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Post Title</label>
            <input
              type="text"
              value={postDetails.postTitle}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={postDetails.description}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                value={postDetails.category}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                value={postDetails.location}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Volunteers Needed</label>
              <input
                type="number"
                value={postDetails.volunteersNeeded}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium">Deadline</label>
              <input
                type="text"
                value={postDetails.deadline}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Organizer info */}
          <div>
            <label className="block font-medium">Organizer</label>
            <input
              type="text"
              value={`${postDetails.organizerName} (${postDetails.organizerEmail})`}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Volunteer Status */}
          <div className="mt-4">
            {hasVolunteered ? (
              <p className="text-green-500">
                You are now a volunteer for this post.
              </p>
            ) : (
              <button
                onClick={handleBecomeVolunteer}
                className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600"
              >
                Become a Volunteer
              </button>
            )}
          </div>
          <div>
            {
              postDetails.volunteersNeeded ==0 ?( <p className="text-red-600 font-semibold">Currently no need any Volunteer!</p>):(<></>)
            }
          </div>
        </>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default BeVolunteer;
