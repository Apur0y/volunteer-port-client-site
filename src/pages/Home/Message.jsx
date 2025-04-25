import React from "react";
import Swal from "sweetalert2";

const DonationForm = () => {
  const handleDonate=(event)=>{
    event.preventDefault();
    Swal.fire({
             title: "Donated!",
             text: "Your file has been deleted.",
             icon: "success"
           }); 
  }
  return (
    <section className="py-12 px-5 ">
      <div className="max-w-4xl mx-auto bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Donate to Support Our Cause
        </h2>
        <p className="text-white text-center mb-8">
          Your contributions help us make a meaningful impact. Fill out the form
          below to donate securely.
        </p>
        <form onSubmit={handleDonate} className="space-y-6">
          {/* Name and Email Fields */}
          <div className="grid grid-cols-1 text-white md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full border-gray-300 text-black rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border-gray-300 p-2 text-black rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          {/* Donation Amount */}
          <div>
            <label className="block font-medium text-white mb-2" htmlFor="amount">
              Donation Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter the amount"
              className="w-full border-gray-300 text-black p-2 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          {/* Message */}
          <div>
            <label className="block text-white font-medium  mb-2" htmlFor="message">
              Your Message (Optional)
            </label>
            <textarea
              id="message"
              placeholder="Write a message (optional)"
              rows="4"
              className="w-full border-gray-300 p-2 text-black rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
          {/* Payment Method */}
          <div>
            <label className="block font-medium text-white mb-2">Payment Method</label>
            <div className="flex items-center text-white gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  className="text-white  focus:ring-green-500"
                  required
                />
                Credit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  className="text-white focus:ring-green-500"
                />
                PayPal
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
           
              className="bg-yellow-700 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-green-700 transition"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DonationForm;
