"use client";
import React from "react";
import LoginForm from "@/app/components/Forms/LoginForm";

const Login = () => {
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
      <div className="lg:w-4/12 flex items-center justify-center h-screen">
        <div className="w-full h-full flex flex-col justify-center bg-pink-50 py-10 px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
