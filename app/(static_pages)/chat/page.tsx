"use client";
import React, { useState } from "react";
import Chatters from "@/app/components/Rooms/Chatters";
import Messages from "@/app/components/Rooms/Messages";
import HomeMenu from "@/app/components/Widgets/HomeMenu";

interface MessagesProps {
  message: {
    id_chatter: string;
  };
}

const Conversations = () => {
  const [message, setMessage] = useState<MessagesProps>({
    message: {
      id_chatter: "",
    },
  });
  const [isMobileChatVisible, setIsMobileChatVisible] = useState(true);

  const handleMessageClick = () => {
    setMessage({
      message: {
        id_chatter: "1",
      },
    });
    setIsMobileChatVisible((prev) => !prev);
  };

  return (
    <>
      <div className="desktop-chat hidden lg:block xl:block">
        <div className="lg:flex">
          <div className="lg:w-3/12 items-center justify-center h-screen">
            <div className="w-full h-full flex-col justify-center items-center bg-white p-5 border-r-4 border-gray-200 overflow-scroll">
              <Chatters onMessageClick={handleMessageClick} />
              <HomeMenu />
            </div>
          </div>
          <div className="lg:w-9/12 xl:block">
            <div className="w-full bg-white overflow-scroll" style={{ height: "100vh" }}>
              <Messages message={{
                chatter_id: ""
              }} giftse={[]} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`lg:w-3/12 items-center justify-center h-screen ${isMobileChatVisible ? '' : 'hidden'}`} id="sidechat">
        <div className="lg:flex">
          <div className="lg:w-3/12 items-center justify-center h-screen" id="sidechat">
            <div className="w-full h-full flex-col justify-center items-center bg-white p-5 border-r-4 border-gray-200 overflow-scroll">
              CHTRS
            </div>
          </div>
          <div className={`lg:w-9/12 xl:block ${isMobileChatVisible ? 'hidden' : ''}`} id="rightchat">
            <div className="w-full bg-white overflow-scroll" style={{ height: "100vh" }}>
              MSGS
            </div>
          </div>
        </div>
      </div> */}

    </>
  );
};

export default Conversations;
