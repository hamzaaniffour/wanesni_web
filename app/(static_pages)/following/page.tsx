"use client";
import FollowingList from "@/app/components/Myaccount/FollowingList";
import SwiperCrads from "@/app/components/Myaccount/SwiperCrads";
import React from "react";


const FollowersPage = () => {
  return (
    <div className="lg:flex">
      <div className="lg:w-3/12 items-center justify-center h-screen">
        <div className="w-full h-full flex-col justify-center items-center bg-white p-5 px-2">
          <FollowingList />
        </div>
      </div>
      <div className="lg:w-9/12 hidden xl:block">
        <div
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-cover bg-center p-5"
          style={{ height: "100vh" }}
        >
          <SwiperCrads />
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;
