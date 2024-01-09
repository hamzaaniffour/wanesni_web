"use client";
import React from "react";
import LoginForm from "@/app/components/Forms/LoginForm";
import UserInformations from "@/app/components/Myaccount/UserInformations";
import SwiperCrads from "@/app/components/Myaccount/SwiperCrads";
import UpdateInfos from "@/app/components/Myaccount/UpdateInfos";

const EditProfile = () => {
  return (
    <div className="lg:flex">
      <div className="lg:w-3/12 items-center justify-center h-screen">
        <div className="w-full h-full flex-col justify-center items-center bg-white p-5">
            <UpdateInfos />
        </div>
      </div>
      <div className="lg:w-9/12 hidden xl:block">
        <div
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-cover bg-center p-5" style={{height:'100vh'}}>
            <SwiperCrads />
          </div>
      </div>
    </div>
  );
};

export default EditProfile;
