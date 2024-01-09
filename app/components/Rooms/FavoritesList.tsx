import Link from "next/link";
import React from "react";

const FavoritesList = () => {
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
        Favorites List
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <div className="w-full px-2 mx-auto">
        <div className="bgwhite rounded-lg px-2">
          <div className="flow-root">
            <ul role="list" className="divide-y">
              <li className="py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={`https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
                      alt={``}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Hamza Aniffour
                    </p>
                    <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                      1 Week ago
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button className="bg-pink-500 text-white font-medium text-sm rounded-full py-2 px-4 hover:bg-pink-600 pt-1.5">
                      Remove{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 float-left mr-1 relative top-0.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={`https://miro.medium.com/v2/resize:fit:495/0*xFuo_UNWchLZ8bqS.jpeg`}
                      alt={``}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Barah Abderahim
                    </p>
                    <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                      Yesterday
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button className="bg-pink-500 text-white font-medium text-sm rounded-full py-2 px-4 hover:bg-pink-600 pt-1.5">
                      Remove{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 float-left mr-1 relative top-0.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
