import Link from "next/link";
import React, { useEffect, useState } from "react";
import Options from "./Options";
import HomeMenu from "../Widgets/HomeMenu";
import Logout from "./Logout";
import directus from "@/app/api/directus/clients";
import { readItems, readMe } from "@directus/sdk";

const UserInformations = () => {

  const [followerscount, setFollowerscount] = useState(0);
  const [followingcount, setFollowingcount] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

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
          readMe({
            fields: ["*"],
          })
        );
        setUserData(result);
      } catch (error) {
        console.log("error");
      }
    };
    fetchuserInfos();
  }, []);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        if (userData) {
          const result = await directus.request(
            readItems("following", {
              fields: [
                "follower_id"
              ],
              filter: {
                following_id: {
                  _eq: userData.id,
                },
              },
            })
          );
          setFollowerscount(result.length);
        }
      } catch (error) {
        console.log("error");
      }
    };
    getFollowers();
  }, [userData]);

useEffect(() => {
  const getFollowing = async () => {
    try {
      if (userData) {
        const result = await directus.request(
          readItems("following", {
            fields: [
              "following_id"
            ],
            filter: {
              follower_id: {
                _eq: userData.id,
              },
            },
          })
        );
        setFollowingcount(result.length);
      }
    } catch (error) {
      console.log("error");
    }
  };
  getFollowing();
}, [userData]);

  return (
    <>
      <Logout />
      <div className="flex flex-col justify-center items-center mt-10">
        {userData ? (
          <>
            <div className="avatar mb-2 mt-4">
              <div className="mask mask-hexagon w-[100px] bg-white">
                <div className="w-[94px] mask mask-hexagon relative left-[3.5px] bottom-[-3px]">
                  <img
                    src={`https://www.wanesni.live/assets/${userData.avatar}?access_token=${token}`}
                    className="!h-[94px] !w-[94px]"
                  />
                </div>
              </div>
            </div>
            <div className="font-semibold text-sm text-white mb-0.5">
              {userData.first_name} {userData.last_name}
            </div>
            <div className="font-bold text-sm text-white mb-2">
              ID: <span className="font-medium">{userData.id}</span>
            </div>
            <div className="flex justify-center items-center gap-4 mb-5">
              <Link href="/followers">
                <span className="text-sm text-white font-medium">
                  <strong>{followerscount}</strong> Followers
                </span>
              </Link>
              <Link href="/following">
                <span className="text-sm text-white font-medium">
                  <strong>{followingcount}</strong> Following
                </span>
              </Link>
            </div>
            <Link href="/charge-coins">
              <div className="flex justify-between items-center mb-4 rounded-full text-md text-center border-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 border-white mx-auto bg-white font-semibold px-5 py-1.5 text-white">
                <span
                  className="h-5 w-5 mr-1 bg-cover"
                  style={{ backgroundImage: "url('/assets/coin.png')" }}
                ></span>{" "}
                {userData.coins} Coins
              </div>
            </Link>
            <div className="mb-5 mt-6">
              <div className="grid grid-cols-1">
                <Link href="/edit">
                  <div className="bg-white rounded-md flex justify-center items-center text-pink-500 py-5 w-full mb-4 font-medium text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 float-left mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>{" "}
                    Edit Profile
                  </div>
                </Link>
              </div>
              <Options />
            </div>
            <HomeMenu />
          </>
        ) : (
          <>
            <div className="avatar mb-2 mt-4">
              <div className="mask mask-hexagon w-[100px]">
                <div className="w-[94px] mask mask-hexagon relative left-[3.5px] bottom-[-3px]">
                  <div className="skeleton w-24 h-24 mb-2"></div>
                </div>
              </div>
            </div>
            <div className="skeleton h-4 w-20 mb-1.5 rounded-sm"></div>
            <div className="skeleton h-3 w-14 mb-4 rounded-sm"></div>
            <div className="flex justify-center items-center gap-4 mb-5">
              <div className="skeleton h-3.5 w-20 mb-2 rounded-sm"></div>
              <div className="skeleton h-3.5 w-20 mb-2 rounded-sm"></div>
            </div>
            <div className="skeleton h-10 w-36 mb-10 rounded-full"></div>
            <div className="skeleton h-14 w-80 mb-3 rounded-md"></div>
            <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2">
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
              <div className="skeleton h-20 w-[100px] rounded-md"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInformations;
