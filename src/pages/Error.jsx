import React from 'react';
import { Link } from 'react-router-dom';


const Error = () => {
 


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h1 className="text-4xl font-semibold text-red-500 mb-4">Oops! Something went wrong.</h1>
        <p className="text-xl text-gray-700 mb-6">
          We're sorry, but we couldn't process your request. Please try again later.
        </p>
        <Link to='/'><button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          
        >
          Go Back to Home
        </button></Link>
      </div>
    </div>
  );
};

export default Error;
