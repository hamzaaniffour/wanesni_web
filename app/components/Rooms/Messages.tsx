import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SwiperCards from "../Myaccount/SwiperCrads";
import directus from "@/app/api/directus/clients";
import Popup from "reactjs-popup";
import { getToken } from "@firebase/messaging";
import { readItems, readMe, updateMe } from "@directus/sdk";

interface MessagesProps {
  message: {
    chatter_id: string;
  };
  gift_id: Gift[];
}

interface Message {
  id: string;
  content: string;
  isread: boolean;
  date_created: string;
  message_type: string;
  user_created: UserCreated;
  receiver_id: UserReceiver;
  gift_id: Gift[]
}

interface Gift {
  id: number;
  name_gift: string;
  coins_gift: number;
  gift_image: string;
}

interface UserCreated {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

interface UserReceiver {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

interface NewMessage {
  user_created: string;
  receiver_id: string;
  avatar: string;
  content: string;
  first_name: string;
  id: string;
  last_name: string;
  isread: boolean;
  gift_id: number;
}

const Messages: React.FC<MessagesProps> = ({ message, gift_id }) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [gifts, setGifts] = useState<any>(null);
  const [selectedGift, setSelectedGift] = useState<Gift[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userCoins, setUserCoins] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const connectionRef = useRef<WebSocket | null>(null);
  const [chatters, setChatters] = useState<NewMessage[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const url = "wss://wanesni.live/websocket";

  const token = async () => {
    return await directus.getToken();
  };

  useEffect(() => {
    return () => {
      if (connectionRef.current) {
        connectionRef.current.close();
        connectionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    connectionRef.current = new WebSocket(url);
    connectionRef.current.addEventListener("open", (event) => {
      console.log("Connected!", event);
      authenticate(event);
    });
    connectionRef.current.addEventListener("message", (message) =>
      getallMessages(message)
    );
  }, []);

  const authenticate = async (event: any) => {
    connectionRef.current?.send(
      JSON.stringify({ type: "auth", access_token: await token() })
    );
  };

  const getallMessages = (event: any) => {
    const data = JSON.parse(event.data);

    if (data["type"] == "auth" && data["status"] == "ok") {
      connectionRef.current?.send(
        JSON.stringify({
          type: "subscribe",
          collection: "chats",
          query: {
            fields: [
              "content,isread,date_created,message_type,gift_id,name_gift,coins_gift,gift_image,user_created.id,user_created.avatar,user_created.first_name,user_created.last_name,receiver_id.id,receiver_id.avatar,receiver_id.first_name,receiver_id.last_name",
            ],
            limit: 10,
            offset: offset,
            sort: "-date_created",
          },
        })
      );
    }

    console.log("Event:", data);
    console.log("Event:", typeof data);
    console.log(
      "WebSocket Connection Status:",
      connectionRef.current?.readyState
    );
    console.log("datatype:", data["type"]);

    if (data["type"] == "subscription" && data["event"] == "init") {
      console.log("Data 1:", JSON.stringify(data));
      setChatters(data.data);
      for (const message of data.data) {
        setMessageHistory((history) => [...history, message]);
      }
    }

    if (data["type"] == "subscription" && data["event"] == "create") {
      console.log("Data 2:", JSON.stringify(data["data"]));
      setUserCoins(data);
      setMessageHistory((history) => [...history, data.data[0]]);
    }
  };

  const onScrolling = (event: React.UIEvent<HTMLDivElement>) => {
    console.log("Scrolling...");
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop === 0) {
      setOffset(offset + 20);
    }
  };

  const sendMessagetext = (
    newMessage: string,
    message_type: string,
    isread: boolean
  ) => {
    if (
      connectionRef.current &&
      connectionRef.current.readyState === WebSocket.OPEN
    ) {
      connectionRef.current.send(
        JSON.stringify({
          type: "items",
          collection: "chats",
          action: "create",
          data: {
            content: newMessage,
            receiver_id: "58a64d10-7690-4f36-80c1-a410bab37924",
            isread: false,
            message_type: "",
          },
        })
      );

      setNewMessage("");
    } else {
      console.error("WebSocket connection not open or no chatter selected.");
    }
  };

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
    setNewMessage(event.target.value);
  }

  const [acctoken, setToken] = useState<string | null>(null);
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
    const fetchmedata = async () => {
      try {
        const result = await directus.request(readMe({ fields: ["id"] }));
        setUserData(result);
      } catch (error) {
        console.log("error");
      }
    };
    fetchmedata();
  }, []);

  const toggleDivVisibility = () => {
    setIsDivVisible((prevVisibility) => !prevVisibility);
  };

  
  const sendMessagegift = async (gift_id: number, message_type: string) => {
  
    if (userCoins !== null && userCoins < selectedGift[0].coins_gift) {
      console.log("Insufficient coins");
      return; // Exit early if user has insufficient coins
    }
  
    console.log(selectedGift)

    setIsLoading(true);
    try {
      connectionRef.current?.send(
        JSON.stringify({
          type: "items",
          collection: "chats",
          action: "create",
          data: {
            content: "This is a gift message",
            receiver_id: "58a64d10-7690-4f36-80c1-a410bab37924",
            isread: false,
            message_type: message_type,
            gift_id: gift_id,
          },
        })
      );
      console.log(gift_id)
    } catch (error) {
      console.log("Error sending gift message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const result = await directus.request(readItems("gifts"));
        setGifts(result);
      } catch (error) {
        console.log("error");
      }
    };
    getFavorites();
  }, []);

  const handleCancel = () => {
    setSelectedGift([]);
  };

  const handleGiftClick = (gift: Gift) => {
    setShowPopup(true);
    console.log(gift)
    setSelectedGift([gift]);
    console.log("gift selected:", selectedGift);
  };

  return (
    <div onScroll={onScrolling}>
      <div className="p-5">
        <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow mb-10">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
            T
          </div>
          <div className="flex flex-col ml-3">
            <div className="font-semibold text-sm">UI Art Design</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="ml-auto">
            <ul className="flex flex-row items-center space-x-2">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-pink-500"
                    >
                      <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
                >
                  <span>
                    <svg
                      className="w-5 h-5 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="space-y-5">
          {messageHistory.map((message) => {
            const currentUserId = userData?.id;

            return (
              <li
                className={`${
                  message.receiver_id.id === currentUserId
                    ? "flex ms-auto gap-x-2 sm:gap-x-4 justify-start"
                    : "flex gap-x-2 sm:gap-x-4 me-11 justify-end"
                }`}
                key={message.id}
              >
                <div className="flex items-center gap-x-2">
                  {message.receiver_id.id === currentUserId && (
                    <>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={`https://wanesni.live/assets/${message.user_created.avatar}?access_token=${acctoken}`}
                        alt="User Avatar"
                      />
                    </>
                  )}
                  <div>
                    <div
                      className={`${
                        message.receiver_id.id === currentUserId
                          ? "bg-gray-200 rounded-2xl p-4 space-y-3"
                          : "bg-pink-500 rounded-2xl p-4 space-y-3"
                      }`}
                    >
                      <p
                        className={`${
                          message.receiver_id.id === currentUserId
                            ? "font-medium text-sm text-gray-800"
                            : "font-medium text-sm text-white"
                        }`}
                      >
                        {message.content}
                      </p>
                      {message.message_type === "text" && (
                        <span className="text-xs text-gray-500">
                          THIS IS A TEXT MESSAGE
                        </span>
                      )}
                      {message.message_type === "gift" && (
                        <>
                          <span className="text-xs text-white">GIFT: {message?.id}</span>
                        </>
                      )}
                      {message.message_type === "image" && (
                        <span className="text-xs text-gray-500">
                          THIS IS A IMAGE MESSAGE
                        </span>
                      )}
                    </div>
                    <span
                      className={`mt-1.5 flex items-center gap-x-1 text-xs text-gray-500 ${
                        message.isread ? "text-green-500" : ""
                      }`}
                    >
                      <svg
                        className="flex-shrink-0 w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 7 17l-5-5" />
                        <path d="m22 10-7.5 7.5L13 16" />
                      </svg>
                      Sent
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-row items-center fixed bottom-3 bg-white w-[73%]">
          <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
            <form>
              {/* <button
                  // onClick={toggleDivVisibility}
                  className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1"
                >
                  <div
                    className="float-left h-14 w-14 bg-center"
                    style={{
                      backgroundImage: 'url("/assets/animations/gift.gif")',
                      backgroundSize: "38px",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </button> */}
              <div className="w-full">
                <input
                  className="border border-transparent w-full indent-3 focus:outline-none text-sm h-10 flex items-center"
                  placeholder="Type your message...."
                  type="text"
                  id="message"
                  name="message"
                  value={newMessage}
                  onChange={handleMessageChange}
                />
              </div>
              <div className="flex flex-row">
                  <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                    <div
                      className="float-left h-14 w-14 bg-center"
                      style={{
                        backgroundImage:
                          'url("/assets/animations/emoji-sent.gif")',
                        backgroundSize: "27px",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </button>
                  <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                    <div
                      className="float-left h-14 w-14 bg-center"
                      style={{
                        backgroundImage:
                          'url("/assets/animations/image-sent.gif")',
                        backgroundSize: "25px",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </button>
                </div>
              <button
                onClick={toggleDivVisibility}
                type="button"
                className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1"
              >
                <div
                  className="float-left h-14 w-14 bg-center"
                  style={{
                    backgroundImage: 'url("/assets/animations/gift.gif")',
                    backgroundSize: "38px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </button>
              <button
                className=""
                type="button"
                onClick={() => sendMessagetext(newMessage, "text", false)}
              >
                send msg
              </button>
            </form>

            {isDivVisible && (
              <div className="gifts-box absolute bottom-full shadow-xl w-[400px] h-[400px] overflow-auto rounded-box p-5 bg-slate-800 border border-slate-400">
                <div className="grid grid-cols-4 gap-y-1 gap-x-1">
                  {gifts?.map((gift: any, index: any) => (
                    <div
                      className="flex flex-col justify-center items-center"
                      key={index}
                      onClick={() => handleGiftClick(gift)}
                    >
                      <div
                        className="h-[42px] w-[42px] bg-center bg-cover"
                        style={{
                          backgroundImage: `url(https://wanesni.live/assets/${gift.gift_image}?access_token=${token})`,
                        }}
                      ></div>
                      <div className="text-xs font-medium text-pink-50 mt-1">
                        {gift.name_gift}
                      </div>
                      <div className="mt-1">
                        <span
                          className="mr-1 bg-center bg-cover h-4 w-4 float-left"
                          style={{
                            backgroundImage: 'url("/assets/coin.png")',
                          }}
                        ></span>
                        <b className="text-xs text-pink-50 relative -top-1.5">
                          {gift.coins_gift}
                        </b>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedGift && (
              <Popup
                open={showPopup}
                modal
                closeOnDocumentClick={false}
                className="modal-bg"
                contentStyle={{ height: "auto" }}
              >
                <div className="popup flex justify-center items-center flex-col">
                  <h3 className="text-xl text-slate-700 font-semibold w-[300px] text-center mb-3">
                    Are you sure you want to send this gift?
                  </h3>
                  <div
                    className="h-16 w-16 bg-cover bg-center mb-2"
                    style={{
                      backgroundImage: `url(https://wanesni.live/assets/${selectedGift[0]?.gift_image}?access_token=${token})`,
                    }}
                  ></div>
                  <div className="flex justify-center items-center gap-2">
                    <div className="text-black font-semibold text-lg mb-1">
                      {selectedGift[0]?.name_gift}
                    </div>{" "}
                    <strong className="text-gray-200 relative -top-0.5">
                      |
                    </strong>
                    <div>
                      <span
                        className="mr-1 bg-center bg-cover h-5 w-5 float-left"
                        style={{ backgroundImage: 'url("/assets/coin.png")' }}
                      ></span>
                      <b className="text-base text-black relative -top-0.5">
                        {selectedGift[0]?.coins_gift}
                      </b>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-5">
                    <button
                      onClick={() => sendMessagegift(selectedGift[0]?.id, "gift")}
                      disabled={isLoading}
                      className="bg-pink-500 text-white font-medium px-4 py-1.5 text-sm rounded-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-between">
                          <span>Sending...</span>
                          <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 ml-2 text-white animate-spin fill-pink-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      ) : (
                        <>
                          <span>Yes, Send It</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-200 text-black font-medium px-4 py-1.5 text-sm rounded-full"
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
