"use client";
import SignUPForm from "@/app/components/Forms/SignUPForm";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="lg:flex">
      <div className="lg:w-8/12">
        <div
          className="w-full bg-pink-500 hidden lg:block xl:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            height: "100vh",
          }}
        ></div>
      </div>
      <div className="lg:w-4/12 flex items-center justify-center">
        <div className="w-full h-full flex flex-col justify-center bg-pink-50 py-10 px-10">
          <div>
            <Link href="/">
              <div
                className="rounded-md bg-cover flex mx-auto justify-center items-center mb-5"
                style={{
                  backgroundImage: "url('/assets/icon.png')",
                  height: "50px",
                  width: "50px",
                }}
              ></div>
            </Link>
          </div>

          <h2 className="text-black text-2xl font-bold text-center -mb-[13px] relative">Sign Up</h2>
          <div className="h-4 w-28 bg-pink-500 mx-auto mb-2"></div>
          <p className="text-gray-500 font-medium text-sm text-center flex mx-auto max-w-[300px] mb-8">
            Sign Up, To discover our world So many matches, waiting for you.
          </p>

          <SignUPForm />

          <p className="text-sm text-gray-400 font-medium text-center mt-8 mx-10">
            By clicking the “Sign up” button, you are creating a Wanesni account
            and therefore you agree to Wanesni Company&rsquo;s{" "}
            <Link href="/" className="text-sky-500">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link className="text-sky-500" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center text-gray-600 font-medium mt-3">
            Already have an account?{" "}
            <Link className="text-pink-500" href="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
