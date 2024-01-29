import directus from "@/app/api/directus/clients";
import { readItems, readMe, updateUser } from "@directus/sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface BlockedListItem {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

const BlockedList = () => {
  const [blockeds, setBlocked] = useState<BlockedListItem[] | null>([]);
  const [mydata, setMydata] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
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
        setMydata(result);
      } catch (error) {
        console.log("error");
      }
    };
    getmyData();
  }, []);

  useEffect(() => {
    const getBlocked = async () => {
      try {
        const result = await directus.request<any>(
          readMe({
            fields: [
              "blocked_list.id",
              "blocked_list.first_name",
              "blocked_list.last_name",
              "blocked_list.avatar",
            ],
          })
        );
        console.log(result);
        if (result.blocked_list && result.blocked_list.length > 0) {
          setBlocked(result.blocked_list);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching blocked list:", error);
      }
    };

    getBlocked();
  }, []);

  const handleUnblock = async () => {
    
    try {
      await directus.request(updateUser(
        mydata.id,{
          blocked_list: {
            delete: [
              blockeds?.[0]?.id
            ]
          }
        }
      ))
      console.log(mydata.id)
      console.log(blockeds?.[0]?.id)
    } catch (error) {
      console.log(error);
    }
  };

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
        Blocked Users
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <div className="w-full px-2 mx-auto">
        <div className="bgwhite rounded-lg px-2">
          <div className="flow-root">
            {blockeds && blockeds.length > 0 ? (
              <ul role="list" className="divide-y">
                {blockeds.map((blocked) => (
                  <li className="py-3" key={blocked.id}>
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={`https://www.wanesni.live/assets/${blocked.avatar}?access_token=${token}`}
                          alt={``}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {blocked.first_name} {blocked.last_name}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button className="bg-red-700 text-white font-semibold text-sm rounded-full py-2 px-3 hover:text-white hover:bg-red-800 pt-1.5"
                        onClick={handleUnblock}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 float-left mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>{" "}
                          Unblock
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 font-normal text-center flex mx-auto max-w-[220px] text-sm">
                You haven't blocked anyone right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedList;
