"use client";
import React from "react";
import UserInformations from "@/app/components/Myaccount/UserInformations";
import SwiperCrads from "@/app/components/Myaccount/SwiperCrads";

const Account = () => {

  return (
    <div className="lg:flex">
      <div className="lg:w-3/12 items-center hidden xl:block justify-center h-screen">
        <div className="w-full h-full flex-col justify-center items-center bg-pink-500 p-3 overflow-auto">
            <UserInformations />
        </div>
      </div>
      <div className="lg:w-9/12">
        <div className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-cover bg-center p-2" style={{height:'100vh'}}>
            <SwiperCrads />
        </div>
      </div>
    </div>
  );
};

export default Account;
