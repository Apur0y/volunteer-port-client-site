import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaHeartbeat, FaTree, FaPaw, FaUsers, FaHandsHelping } from "react-icons/fa";

const categories = [
  { id: 1, name: "Education", icon: <FaBook className="text-4xl text-blue-500" /> },
  { id: 2, name: "Healthcare", icon: <FaHeartbeat className="text-4xl text-red-500" /> },
  { id: 3, name: "Environment", icon: <FaTree className="text-4xl text-green-500" /> },
  { id: 4, name: "Animal Welfare", icon: <FaPaw className="text-4xl text-yellow-500" /> },
  { id: 5, name: "Community Service", icon: <FaUsers className="text-4xl text-purple-500" /> },
  { id: 6, name: "Disaster Relief", icon: <FaHandsHelping className="text-4xl text-orange-500" /> },
];

const CategoriesSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Explore Volunteering Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {category.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-700">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
