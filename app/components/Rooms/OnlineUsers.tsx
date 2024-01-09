import Link from "next/link";
import React from "react";

const OnlineUsers = () => {
  return (
    <div>
      <Link href="/account">
        <button className="px-4 py-1 rounded-full bg-gray-100 absolute top-2 left-2 border-0 hover:bg-gray-200 capitalize text-black font-semibold text-sm">
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
        </button>
      </Link>
      <h2 className="text-lg mt-5 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 font-bold py-3 pt-0 pb-2 text-center">
        Online Users
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 gap-y-2">
        <div>
          <div
            className="text-black bg-base-200 rounded-xl p-2 justify-end bg-cover bg-center"
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url('https://miro.medium.com/v2/resize:fit:495/0*xFuo_UNWchLZ8bqS.jpeg')`,
            }}
          >
            <div className="bg-white float-right p-1 relative -top-3 -right-3 rounded-full">
              <span className="bg-green-500 rounded-full relative h-4 w-4 block"></span>
            </div>
            <div className="flex">
              <div
                className="flex-grow bg-black bg-opacity-40 w-auto p-1 px-3 relative"
                style={{
                  top: "-8px",
                  left: "-8px",
                  borderRadius: "11px 0px 11px 0px",
                }}
              >
                <div className="font-bold text-xs text-white mb-1 capitalize">
                  Hamza Aniffour
                </div>
                <div
                  className="font-medium text-md text-white"
                  style={{ marginBottom: "-6px" }}
                >
                  <span className="mr-1 block float-left h-1 w-4"></span>
                  <span
                    className="text-xs uppercase"
                    style={{ position: "relative", bottom: "9.5px" }}
                  >
                    MA
                  </span>
                </div>
              </div>
            </div>

            <div
              className="flex justify-between relative gap-1"
              style={{ top: "105px" }}
            >
              <div
                className="text-xl bg-black bg-opacity-60 p-1.5 flex justify-center w-full items-center cursor-pointer tooltip rounded-full"
                data-tip="Start Call"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-200"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div
                className="text-xl bg-black bg-opacity-60 flex p-1.5 justify-center w-full items-center cursor-pointer tooltip rounded-full"
                data-tip="Start Chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="text-black bg-base-200 rounded-xl p-2 justify-end bg-cover bg-center"
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url('https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`,
            }}
          >
            <div className="bg-white float-right p-1 relative -top-3 -right-3 rounded-full">
              <span className="bg-green-500 rounded-full relative h-4 w-4 block"></span>
            </div>
            <div className="flex">
              <div
                className="flex-grow bg-black bg-opacity-40 w-auto p-1 px-3 relative"
                style={{
                  top: "-8px",
                  left: "-8px",
                  borderRadius: "11px 0px 11px 0px",
                }}
              >
                <div className="font-bold text-xs text-white mb-1 capitalize">
                  Hamza Aniffour
                </div>
                <div
                  className="font-medium text-md text-white"
                  style={{ marginBottom: "-6px" }}
                >
                  <span className="mr-1 block float-left h-1 w-4"></span>
                  <span
                    className="text-xs uppercase"
                    style={{ position: "relative", bottom: "9.5px" }}
                  >
                    MA
                  </span>
                </div>
              </div>
            </div>

            <div
              className="flex justify-between relative gap-1"
              style={{ top: "105px" }}
            >
              <div
                className="text-xl bg-black bg-opacity-60 p-1.5 flex justify-center w-full items-center cursor-pointer tooltip rounded-full"
                data-tip="Start Call"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-200"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div
                className="text-xl bg-black bg-opacity-60 flex p-1.5 justify-center w-full items-center cursor-pointer tooltip rounded-full"
                data-tip="Start Chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
