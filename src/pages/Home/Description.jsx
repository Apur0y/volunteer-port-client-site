import React from 'react';

const Description = () => {
    return (
        <section className="bg-emerald-900 rounded-lg py-10 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left Side - Image */}
          <div className="flex-shrink-0 md:w-1/2">
            <img
              src="https://www.breakthrought1d.org/wp-content/uploads/2024/04/BecomeAVolunteer_VolunteerOptions-1024x683.jpg"
              alt="Volunteering"
              className="w-full h-auto rounded-r-lg object-cover"
            />
          </div>
  
          {/* Right Side - Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">
              Make a Difference Through Volunteering
            </h2>
            <p className="text-white text-lg mb-6">
              Volunteering is a powerful way to give back to your community while
              gaining new skills and experiences. By dedicating your time and
              efforts, you can create a positive impact on the lives of others
              and inspire change.
            </p>
            <p className="text-white text-lg">
              Join our mission to support meaningful causes, connect with people
              from diverse backgrounds, and be a part of something bigger. Every
              small action makes a big difference.
            </p>
          </div>
        </div>
      </section>
    );
};

export default Description;