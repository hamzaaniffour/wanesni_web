// Chatters.tsx
import React from "react";

interface ChattersProps {
  onMessageClick: () => void;
}

const Chatters: React.FC<ChattersProps> = ({ onMessageClick }) => {
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
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img
                    className="rounded-full items-start flex-shrink-0 mr-3"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg"
                    width={32}
                    height={32}
                    alt="Nhu Cassel"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Nhu Cassel
                    </h4>
                    <div className="text-[13px]">Hello Lauren 👋, · 24 Mar</div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img
                    className="rounded-full items-start flex-shrink-0 mr-3"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-03_uzwykl.jpg"
                    width={32}
                    height={32}
                    alt="Patrick Friedman"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Patrick Friedman
                    </h4>
                    <div className="text-[13px]">
                      Yes, you&lsquo;re right but… · 14 Mar
                    </div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img
                    className="rounded-full items-start flex-shrink-0 mr-3"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-04_ttlftd.jpg"
                    width={32}
                    height={32}
                    alt="Byrne McKenzie"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Byrne McKenzie
                    </h4>
                    <div className="text-[13px]">
                      Hey Lauren ✨, first of all… · 14 Mar
                    </div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img
                    className="rounded-full items-start flex-shrink-0 mr-3"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-05_bktgmb.jpg"
                    width={32}
                    height={32}
                    alt="Scott Micheal"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Scott Micheal
                    </h4>
                    <div className="text-[13px]">No way 🤙! · 11 Mar</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* Bottom right button */}
        </div>
      </div>
    </div>
  );
};

export default Chatters;
