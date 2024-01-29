"use client";
import React, { FC, useEffect, useState } from "react";
import SwiperCrads from "@/app/components/Myaccount/SwiperCrads";
import directus from "@/app/api/directus/clients";
import {
  createItem,
  createUser,
  deleteItem,
  readItems,
  readMe,
  readUser,
  updateCollection,
  updateUser,
} from "@directus/sdk";
import Link from "next/link";

interface singlePost {
  params: { id: string };
}

const ProfileUser: FC<singlePost> = ({ params }) => {
  {
    /* GET USERS & SET LOADING & GET FAVORITES/FOLLOWERS useStats */
  }
  const [userdata, setUserdata] = useState<any>(null);
  const [mydata, setMydata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favoritescount, setFavoritescount] = useState(0);
  const [followerscount, setFollowerscount] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingId, setfollowingId] = useState(0);
  {
    /* GET USERS & SET LOADING & GET FAVORITES/FOLLOWERS useStats */
  }

  {
    /* GET USERS & SET LOADING & GET FAVORITES/FOLLOWERS useEffect */
  }
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

  useEffect(() => {
    const fetchuserInfos = async () => {
      try {
        const result = await directus.request(
          readUser(params.id, {
            fields: ["*"],
          })
        );
        setUserdata(result);
        setLoading(false);
      } catch (error) {
        console.log("error");
        setLoading(false);
      }
    };
    fetchuserInfos();
  }, []);

  useEffect(() => {
    const getmyData = async () => {
      try {
        const result = await directus.request(readMe());
        setMydata(result);
      } catch (error) {
        console.log("error");
      }
    };
    getmyData();
  }, []);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const data = await directus.request(
          readItems("following", {
            filter: {
              following_id: {
                _eq: params.id,
              },
            },
            meta: "filter_count",
          })
        );

        setFollowerscount(data.length);
        if (data.length === 0) {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
          // Assuming you want to use the first follower's ID
          setfollowingId(data[0].id); // Set the followingId to the ID of the first follower
        }
      } catch (error) {
        console.log("error");
      }
    };
    getFollowers();
  }, []);
  {
    /* GET USERS & SET LOADING & GET FAVORITES/FOLLOWERS useEffect */
  }

  const handleFollow = async (followerId: number, followingId: string) => {
    try {
      await directus.request(
        createItem("following", {
          follower_id: mydata.id,
          following_id: followingId,
        })
      );
      setIsFollowing(true);
      console.log("ADDED SUCCESS");
    } catch {
      console.log("ERROR");
    }
  };

  const handleUnfollow = async (id: number) => {
    try {
      await directus.request(deleteItem("following", followingId));
      setIsFollowing(false);
      console.log("REMOVE SUCCESS");
    } catch {
      console.log("ERROR");
    }
  };

  {/***************** BLOCK LOGIC ******************/}
  const handleBlock = async (followerId: number, followingId: string) => {
    
    try {
      await directus.request(updateUser(
        mydata.id,{
          blocked_list: {
            update: [
              {
                id: params.id,
                blocked_id: mydata.id,
              }
            ]
          }
        }
      ))
      console.log("HADA ANA", mydata.id);
      console.log("HADA USER", params.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-3/12 items-center justify-center h-screen">
        <div className="w-full h-full flex-col justify-center items-center bg-white">
          <div>
            <div className="flex justify-between items-center">
              <div className="bg-pink-100 h-16 w-full flex justify-start items-center pl-5">
                <Link href="/account">back</Link>
              </div>
              <div className="bg-pink-500 h-16 w-full flex justify-end items-center gap-2 pr-5">
                <button
                className="h-9 w-9 bg-white rounded-full flex justify-center items-center"
                onClick={() =>
                  mydata.id &&
                  params.id &&
                handleBlock(mydata.id, params.id)
                }
                >
                  <span className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                  </span>
                </button>
                <span className="h-9 w-9 bg-white rounded-full flex justify-center items-center">
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                      />
                    </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div
                className="h-24 w-24 rounded-full -mt-8 mb-2 bg-cover bg-center border-4 border-white"
                style={{
                  backgroundImage: `url(https://wanesni.live/assets/${userdata?.avatar}?access_token=${token})`,
                }}
              ></div>
              <div className="text-black font-semibold text-base mb-0.5">
                {userdata?.first_name} {userdata?.last_name}
              </div>
              <div className="text-[13px] font-semibold text-pink-500 mb-3">
                <svg
                  className="w-4 h-4 fill-current flex-shrink-0 float-left mr-0.5 text-gray-400 relative top-[2px]"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                </svg>{" "}
                {userdata?.location}
              </div>
              <div className="flex justify-center items-center gap-3 mb-5">
                <div className="text-black font-semibold text-sm">
                  {followerscount} Followers
                </div>
                <div className="text-black font-semibold text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 float-left mr-1 text-pink-500"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>{" "}
                  {favoritescount}
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 w-full px-4 lg:px-10 xl:px-10">
                {mydata && isFollowing ? (
                  <button
                    onClick={() => handleUnfollow(followingId)}
                    className="bg-pink-100 text-pink-500 w-full rounded-full px-3 py-2 font-medium hover:bg-pink-200 tooltip"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block relative top-[-1px] fill-pink-500"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <path fill="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm7 6.586l2.121-2.122 1.415 1.415L20.414 19l2.122 2.121-1.415 1.415L19 20.414l-2.121 2.122-1.415-1.415L17.586 19l-2.122-2.121 1.415-1.415L19 17.586z" />{" "}
                        </g>{" "}
                      </g>
                    </svg>{" "}
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      mydata.id &&
                      params.id &&
                      handleFollow(mydata.id, params.id)
                    }
                    className="bg-gray-200 text-black w-full rounded-full px-3 py-2 font-medium hover:bg-gray-300 tooltip"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline-block mr-1 relative top-[-1px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>
                    Follow me
                  </button>
                )}

                <button className="py-1.5 px-3 w-full rounded-full bg-pink-500 text-white font-semibold text-md hover:bg-pink-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 float-left mr-1 relative top-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>{" "}
                  120{" "}
                  <span
                    className="inline-block h-4 w-4 bg-cover bg-center relative top-0.5"
                    style={{ backgroundImage: "url('/assets/coin.png')" }}
                  ></span>{" "}
                  / min
                </button>
              </div>

              <div className="flex justify-center items-center px-5 mt-3">
                <div className="text-gray-400 text-xs text-center mt-2 flex mx-auto justify-center items-center">
                  {userdata?.description}
                </div>
              </div>
            </div>
          </div>
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

export default ProfileUser;
