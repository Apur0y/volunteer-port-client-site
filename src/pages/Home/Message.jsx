import React from 'react';

const Message = () => {
    return (
        <section className="py-10 px-5">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold  text-center mb-4">
            Send Us a Message
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Have questions? Fill out the form below, and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block  font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block  font-medium mb-2" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block  font-medium mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message here"
                rows="5"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    );
};

export default Message;