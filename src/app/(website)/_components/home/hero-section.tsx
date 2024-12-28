import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section text-white-900 px-6 py-16 md:py-24">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
        {/* Left Content */}
        <div className="text-content md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Record, Share, and Simplify
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Capture your screen and camera, share instantly, and communicate efficiently—all in one place.
          </p>
          <div className="action-buttons flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700">
              Start Recording
            </button>
            <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="image-content md:w-1/2 mb-8 md:mb-0">
          <img
            width="600"
            height="400"
            src="hero-section1.jpg"
            alt="Loom-like demo graphic"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;