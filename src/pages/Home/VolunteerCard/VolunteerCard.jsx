import React from "react";

const VolunteerCard = ({ sortedPosts }) => {

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPosts.map((post) => (
          <div
            key={post?._id}
            className="border  rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={post?.thumbnail || "/default.jpg"}
              alt={post?.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                   <p className="text-sm font-bold text-neutral-600 mt-1">
               {post?.category}
              </p>
              <h3 className="text-xl font-bold text-sky-900">{post?.postTitle}</h3>
           
              <p className="text-sm text-yellow-500 mt-1">
                <strong>Deadline:</strong> {post?.deadline}
              </p>
              <button
                onClick={() => handleViewDetails(post?._id)}
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-800 transition duration-300"
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
