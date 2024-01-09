// Messages.tsx
import React from "react";
import SwiperCards from "../Myaccount/SwiperCrads";
import SwiperCrads from "../Myaccount/SwiperCrads";

interface MessagesProps {
  message: {
    id_chatter: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ message }) => {
  return (
    <div>
      {message.id_chatter !== "" ? (
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
            {/* Chat */}
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />
              <div>
                {/* Card */}
                <div className="bg-gray-200 rounded-2xl p-4 space-y-3">
                  <p className="font-medium text-sm text-gray-800">
                    How can we help?
                  </p>
                </div>
                {/* End Card */}
                <span className="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
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
            </li>
            {/* End Chat */}
            {/* Chat */}
            <li className="flex ms-auto gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-flex flex-col justify-end">
                  {/* Card */}
                  <div className="inline-block bg-pink-600 rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-white">what&lsquo;s preline ui?</p>
                  </div>
                  {/* End Card */}
                  <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500">
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
              <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                <span className="text-sm font-medium text-white leading-none">
                  AZ
                </span>
              </span>
            </li>
            {/* End Chat */}
            {/* Chat Bubble */}
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />
              <div>
                {/* Card */}
                <div className="bg-gray-200 rounded-2xl p-4 space-y-3">
                  <p className="text-sm text-gray-800">
                    Preline UI is an open-source set of prebuilt UI components
                    based on the utility-first Tailwind CSS framework.
                  </p>
                </div>
                {/* End Card */}
                <span className="mt-1.5 flex items-center gap-x-1 text-xs text-red-500">
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
                    <circle cx={12} cy={12} r={10} />
                    <line x1={12} x2={12} y1={8} y2={12} />
                    <line x1={12} x2="12.01" y1={16} y2={16} />
                  </svg>
                  Not sent
                </span>
              </div>
            </li>
            {/* End Chat Bubble */}
          </ul>

          <div className="flex flex-row items-center fixed bottom-3 bg-white w-[73%]">
            <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
              <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
                <div
                  className="float-left h-14 w-14 bg-center"
                  style={{
                    backgroundImage: 'url("/assets/animations/gift.gif")',
                    backgroundSize: "38px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </button>
              <div className="w-full">
                <input
                  type="text"
                  className="border border-transparent w-full indent-3 focus:outline-none text-sm h-10 flex items-center"
                  placeholder="Type your message...."
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
            </div>
            <div className="ml-3">
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white">
                <svg
                  className="w-5 h-5 transform rotate-90 -mr-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-cover bg-center p-2"
            style={{ height: "100vh" }}
          >
            <SwiperCrads />
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
