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
<div className="min-h-screen bg-cover bg-center pt-24" style={{ backgroundImage: "url('/contact-bg.jpg')" }}>
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-md p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        {/* Contact Info */}
        <div className="mb-8 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold">📍 Location</h3>
            <p>Jashore, Bangladesh</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📞 Phone</h3>
            <p>+880 1234 567 890</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📧 Email</h3>
            <p>example@email.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Your Name</label>
            <input type="text" className="w-full px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block mb-1">Your Email</label>
            <input type="email" className="w-full px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea className="w-full px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white" rows="4" placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
};


export default DonationForm;
