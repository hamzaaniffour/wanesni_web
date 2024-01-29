// Chatters.tsx
import directus from "@/app/api/directus/clients";
import { readItem, readItems, readMe } from "@directus/sdk";
import React, { useEffect, useState } from "react";

interface ChattersProps {
  onMessageClick: () => void;
}

const Chatters: React.FC<ChattersProps> = ({ onMessageClick }) => {

  const [mydata, setMYdata] = useState<number | null>(null);
  const [chatters, setChatters] = useState<number | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const data = await directus.request(
        readMe()
      );
      const userCoins = data.coins;
      setMYdata(userCoins);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const getChatters = async () => {
      try {
        if (mydata) {
          const result = await directus.request(
            readItems("chats", {
              fields: [
                "content",
                "isread",
                "date_created",
                "user_created.id",
                "user_created.avatar",
                "user_created.first_name",
                "user_created.last_name",
                "receiver_id.id",
                "receiver_id.avatar",
                "receiver_id.first_name",
                "receiver_id.last_name"
              ],
              filter: {
                _or: [
                  {
                    "user_created": {
                      _eq: mydata
                    }
                  },
                  {
                    "receiver_id": {
                      _eq: mydata
                    }
                  }
                ]
              }
            })
          );
          console.log(result)
        }
      } catch (error) {
        console.log("error");
      }
    };
    getChatters();
  }, [mydata]);

  return (
    <div>
      {/* <button onClick={onMessageClick}>Send Message</button> */}

      <h2 className="text-lg mt-5 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 font-bold py-3 pt-0 pb-2 text-center">
        Messages
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <div className="h-full">
        {/* Card */}
        <div className="relative max-w-full mx-auto bg-white rounded-lg">
          {/* Card header */}
          <header className="pb-4 px-2 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              {/* Image + name */}
              <div className="flex items-center">
                <a className="inline-flex items-start mr-3" href="#0">
                  <img
                    className="rounded-full"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
                    width={48}
                    height={48}
                    alt="Lauren Marsano"
                  />
                </a>
                <div className="pr-1">
                  <a
                    className="inline-flex mb-0.5 text-gray-800 hover:text-gray-900"
                    href="#0"
                  >
                    <h2 className="text-xl leading-snug font-bold">
                      Lauren Marsano
                    </h2>
                  </a>
                  <span className="block text-sm font-medium text-pink-500">
                    <svg
                      className="w-4 h-4 fill-current flex-shrink-0 float-left mr-0.5 text-gray-400"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                    </svg>
                    <span className="text-sm whitespace-nowrap ml-0.5 relative -top-0.5">
                      Milan, IT
                    </span>
                  </span>
                </div>
              </div>
              {/* Settings button */}
            </div>
            {/* Meta */}
          </header>
          {/* Card body */}
          <div className="py-3 px-2">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
              Chats
            </h3>
            {/* Chat list */}
            <div className="divide-y divide-gray-200">
              {/* User */}
              <button
                className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                onClick={onMessageClick}
              >
                <div className="flex items-center">
                  <img
                    className="rounded-full items-start flex-shrink-0 mr-3"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                    width={32}
                    height={32}
                    alt="Marie Zulfikar"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Marie Zulfikar
                    </h4>
                    <div className="text-[13px]">
                      The video chat ended · 2hrs
                    </div>
                  </div>
                </div>
              </button>
              {/* User */}
            </div>
          </div>
          {/* Bottom right button */}
        </div>
      </div>
    </div>
  );
};

export default Chatters;
