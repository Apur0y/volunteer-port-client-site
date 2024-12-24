import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Install: npm install react-modal
import axios from "axios";

Modal.setAppElement("#root"); // For accessibility

const BeVolunteer = ({ isOpen, closeModal, postId, user }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  // Fetch post details by ID when the modal opens
  useEffect(() => {
    if (postId) {
      axios
        .get(`/update-post/${postId}`)
        .then((response) => setPostDetails(response.data))
        .catch((error) => console.error("Error fetching post details:", error));
    }
  }, [postId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...postDetails,
      volunteerName: user.name,
      volunteerEmail: user.email,
      suggestion,
      status: "requested",
    };

    try {
      // Save the request to the database
      await axios.post("/volunteer-requests", requestData);

      // Decrease the number of volunteers needed
      await axios.put(`/update-volunteers-needed/${postId}`, { count: -1 });

      alert("Request submitted successfully!");
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit the request.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Volunteer Request Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-bold mb-4">Volunteer Request</h2>

      {postDetails ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-only fields */}
          <div>
            <label className="block font-medium">Thumbnail</label>
            <img
              src={postDetails.thumbnail}
              alt="Post Thumbnail"
              className="w-32 h-32 object-cover rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium">Post Title</label>
            <input
              type="text"
              value={postDetails.title}
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

          {/* Other read-only fields */}
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

          {/* Volunteer info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Volunteer Name</label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium">Volunteer Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Suggestion */}
          <div>
            <label className="block font-medium">Suggestion</label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full border rounded p-2"
              rows="3"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600"
          >
            Request
          </button>
        </form>
      ) : (
        <p>Loading post details...</p>
      )}
    </Modal>
  );
};

export default BeVolunteer;
