import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserInformations from "./UserInformations";
import Cards from "../Rooms/Cards";
import directus from "@/app/api/directus/clients";

const SwiperCards = () => {

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await directus.getToken();
        setToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
    fetchToken();
  }, []);

  return (
    <div>
      <div className="flex justify-between block xl:hidden">
        <div className="rounded-full">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button">
                <div className="avatar">
                  <div className="w-14 mask mask-hexagon bg-white">
                    <div
                      className="w-12 h-12 relative top-[4px] left-[4px] cursor-pointer mask mask-hexagon bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg")',
                      }}
                    ></div>
                  </div>
                </div>
              </label>
            </div>
            <div className="drawer-side z-40">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu w-full min-h-full bg-pink-500 z-50">
                <div className="absolute top-2 right-2">
                  <label
                    htmlFor="my-drawer"
                    className="drawer-button absolute inline-block right-2 top-2 bg-pink-100 text-pink-500 font-medium px-5 py-1 text-sm rounded-full cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 float-left mr-1 text-pink-500 relative top-[2px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>{" "}
                    Back
                  </label>
                </div>
                <UserInformations />
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-full">
          <details className="dropdown py-1">
            <summary className="mb-0.5 btn text-pink-500 rounded-md py-1 !min-h-[2.5rem] h-[2.5rem]">
              Select Gender{" "}
              <svg
                fill="#ec4899"
                className="w-4 h-4 -ml-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                enableBackground="new 0 0 52 52"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />{" "}
                </g>
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-md w-[153px] z-[9] py-2 flex justify-center items-center gap-y-3">
              <li className="inline-block w-full">
                      <span className="float-left p-0 mr-1 !h-6 !w-6 bg-cover bg-center rounded-full" style={{backgroundImage: 'url("/avatars/men.png")'}}></span>
                      <span className="p-0 float-left mr-4 font-medium text-black relative top-[2px] text-sm">Male</span>
                      <span className="float-left p-0 mr-1 rounded-none !h-5 !w-5 bg-cover bg-center" style={{backgroundImage: 'url("/assets/coin.png")'}}></span>
                      <span className="float-left p-0 mr-1 text-black font-bold">5</span>
              </li>
              <li className="inline-block w-full">
                      <span className="float-left p-0 mr-1 !h-6 !w-6 bg-cover bg-center rounded-full" style={{backgroundImage: 'url("/avatars/women.png")'}}></span>
                      <span className="p-0 float-left mr-4 font-medium text-black relative top-[2px] text-sm">Female</span>
                      <span className="float-left p-0 mr-1 rounded-none !h-5 !w-5 bg-cover bg-center" style={{backgroundImage: 'url("/assets/coin.png")'}}></span>
                      <span className="float-left p-0 mr-1 text-black font-bold">9</span>
              </li>
              <li className="inline-block w-full">
                      <span className="float-left p-0">
                      <div className="avatar-group -space-x-4 rtl:space-x-reverse mt-[-4px]">
                        <div className="avatar">
                          <div className="w-6">
                            <img src="/avatars/men.png" />
                          </div>
                        </div>
                        <div className="avatar">
                          <div className="w-6">
                            <img src="/avatars/women.png" />
                          </div>
                        </div>
                        </div>
                      </span>
                      <span className="p-0 float-left mr-4 font-medium text-black relative top-[2px] text-sm">Both</span>
                      <span className="float-left p-0 mr-1 rounded-none !h-5 !w-5 bg-cover bg-center" style={{backgroundImage: 'url("/assets/coin.png")'}}></span>
                      <span className="float-left p-0 mr-1 text-black font-bold">0</span>
              </li>
            </ul>
          </details>
        </div>
      </div>

      {/* Button Menu */}
      <div className="absolute bottom-0 right-0 left-0 z-50 flex justify-center items-center mx-auto block xl:hidden">
        <ul className="menu bg-white menu-horizontal rounded-none w-full flex justify-between items-center">
          <li>
            <Link href="/account" className="font-bold uppercase text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link href="/chat" className="font-bold uppercase text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              Chat
            </Link>
          </li>
          <li>
            <Link href="/online-users" className="font-bold uppercase text-xs">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Online Users
            </Link>
          </li>
        </ul>
      </div>

      <Cards />
    </div>
  );
};

export default SwiperCards;
