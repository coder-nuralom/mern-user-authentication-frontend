import React from "react";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user } = useUser();
  return (
    <section className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto text-center">
        {/* Badge */}

        <div className="inline-flex items-center gap-2 bg-gray-800 text-green-400 px-4 py-1 rounded-full text-sm mb-6 border border-gray-700">
          <span className="text-green-500">⚡</span>
          <span>{user ? `Welcome ${user.name}` : "Hey Developer."}</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl max-[500px]:text-3xl max-[425px]:text-2xl font-bold leading-tight">
          <span className="text-[#22c55e]">
            Your thoughts, organized and accessible{" "}
          </span>
          <br className="hidden lg:block" />
          <span className="text-white">everywhere</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-400 text-lg max-[500px]:text-base  max-w-2xl mx-auto">
          Capture ideas, organize thoughts, and collaborate seamlessly. The
          modern note-taking app that grows with you and keeps your ideas secure
          in the cloud.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-green-800 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
            Start Taking Notes →
          </button>

          <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg border border-gray-700 transition duration-300">
            Watch Demo
          </button>
        </div>

        {/* Small Text */}
        <p className="mt-6 text-gray-500 text-sm">
          Free forever • No credit card required • 2 minutes setup
        </p>
      </div>
    </section>
  );
};

export default Home;
