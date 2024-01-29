import directus from "@/app/api/directus/clients";
import { readItems, readMe } from "@directus/sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';

const FollowingList = () => {
  const [getmyData, setGetmyData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [following, setFollowing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await directus.getToken();
        setToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    const getmyData = async () => {
      try {
        const result = await directus.request(readMe());
        setGetmyData(result);
      } catch (error) {
        console.log("error");
      }
    };
    getmyData();
  }, []);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        if (getmyData) {
          const result = await directus.request(
            readItems("following", {
              fields: [
                "following_id.first_name",
                "following_id.last_name",
                "following_id.avatar",
                "following_id.location",
              ],
              filter: {
                follower_id: {
                  _eq: getmyData.id,
                },
              },
            })
          );
          setFollowing(result);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        console.log("error");
      }
    };
    getFollowing();
  }, [getmyData]);

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
        Your Following
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <div className="w-full px-2 mx-auto">
        <div className="bgwhite rounded-lg px-2">
          <div className="flow-root">
            {loading ? (
              <>Load...</>
            ) : following.length === 0 ? (
              <>No Users Found!</>
            ) : (
              <ul role="list" className="divide-y">
                {following.map((user: any, index: any) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={`https://www.wanesni.live/assets/${user.following_id.avatar}?access_token=${token}`}
                          alt={``}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {user.following_id.first_name}{" "}
                          {user.following_id.last_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate font-medium dark:text-gray-400">
                          <svg
                            className="w-4 h-4 fill-current flex-shrink-0 float-left mr-0.5 text-pink-500"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                          </svg>{" "}
                          {user.following_id.location}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button className="bg-gray-300 text-black font-semibold text-sm rounded-full hover:text-white py-2 px-4 hover:bg-pink-500 pt-1.5">
                          Unfollow
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
