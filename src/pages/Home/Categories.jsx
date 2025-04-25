import React from "react";
import { motion } from "framer-motion";
// import { div, divC } from "@/components/ui/div";
import { FaTint, FaTree, FaHandHoldingMedical, FaHandsHelping } from "react-icons/fa";

const categories = [
  {
    icon: <FaTint className="text-blue-500 text-4xl" />, 
    title: "Water Conservation",
    description: "Join efforts to save water and promote sustainable usage for a better future."
  },
  {
    icon: <FaTree className="text-green-500 text-4xl" />, 
    title: "Plant Trees",
    description: "Support reforestation and green initiatives to help combat climate change."
  },
  {
    icon: <FaHandHoldingMedical className="text-red-500 text-4xl" />, 
    title: "Medical Aid",
    description: "Provide essential medical help to those in need and support healthcare initiatives."
  },
  {
    icon: <FaHandsHelping className="text-purple-500 text-4xl" />, 
    title: "Community Support",
    description: "Engage in volunteering activities to uplift communities and support social causes."
  }
];

const Categories = () => {
  return (
    <div className="p-8 w-11/12 my-12 mx-auto text-center ">
      <h2 className="text-3xl font-bold mb-6">Volunteer Initiatives</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6 shadow-lg rounded-2xl border border-gray-200">
              <div className="flex flex-col items-center">
                {category.icon}
                <h3 className="text-lg font-semibold mt-4">{category.title}</h3>
                <p className=" mt-2 text-sm">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
