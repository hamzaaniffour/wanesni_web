import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div
        className="w-full flex items-center justify-center inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1591711696773-c4b7fe4d3d74?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          height: "90vh",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-900 opacity-60"
          style={{ height: "90vh" }}
        ></div>
        <div className="z-40 lg:z-50 text-center px-10 lg:px-0 xl:px-0">
          <h1 className="hero-title text-white text-6xl lg:text-8xl xl:text-8xl font-bold mb-2">wanesni</h1>
          <p className="mb-8 text-xl text-white font-medium lg:text-2xl xl:text-2xl">Join us To discover our world So many matches, waiting for you.</p>
          <button className="create-account-button bg-white px-10 pb-3 py-3 rounded-full">
            <Link
              href="/signup"
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-900 font-semibold rounded-full text-xl"
            >
              Create Your Account
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
