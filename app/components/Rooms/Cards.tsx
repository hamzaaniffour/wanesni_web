import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import directus from "@/app/api/directus/clients";
import { createItem, readMe, readUsers } from "@directus/sdk";
import Link from "next/link";
import LoadingIcons from "react-loading-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = () => {
  const [cards, setCards] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mydata, setMydata] = useState<any>(null);
  const [isFavoriting, setIsFavoriting] = useState<boolean>(false);

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
          readUsers({
            fields: ["*"],
          })
        );
        setCards(result);
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

  const showToastMessage = () => {
    toast('😍 Wow so easy!', {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const handleFavorite = async (favoritedId: number) => {
    try {
        await directus.request(createItem("favorites", {
            favoriter: mydata.id,
            favorited: favoritedId
        }))
        setIsFavoriting(true);
        showToastMessage()
        console.log("ADDED SUCCESS")
    }catch{
        console.log("ERROR")
    }
}

const handleRemoveFavorite = async () => {
  
}

  return (
    <>
      <div className="flex justify-center items-center h-full lg:h-screen xl:h-screen">
        {loading ? (
          <div className="flex justify-center items-center mx-auto">
            <div className="flex justify-center items-center">
              <LoadingIcons.BallTriangle stroke="#FFFFFF" fill="#ec4899" />
            </div>
          </div>
        ) : cards?.length === 0 ? (
          <>No Users Found!</>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            loop={true}
            modules={[EffectCards]}
            className="mySwiper h-[340px] w-[260px] lg:h-[500px] lg:w-[400px] xl:h-[500px] xl:w-[400px]"
          >
            {cards?.map((user: any, index: any) => (
              <SwiperSlide
                className="!bg-center !bg-cover p-5 pt-3 flex justify-between"
                key={index}
                style={{
                  backgroundImage: `url('https://wanesni.live/assets/${user.avatar}?access_token=${token}')`,
                }}
              >
                <div className="flex justify-between gap-4">
                  <div className="bg-black bg-opacity-45 py-1.5 px-3 rounded-lg w-full">
                    <h4 className="text-white text-sm lg:text-base xl:text-base md:text-base mb-0.5 !capitalize leading-4">
                      {user.first_name + " " + user.last_name}
                    </h4>
                    <span
                      className="h-3.5 w-6 relative top-[0.5px] rounded-sm bg-white float-left mr-1 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg'`,
                      }}
                    ></span>{" "}
                    <p className="text-white font-medium text-xs uppercase">
                      {user.location}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Link href={{ pathname: `/profile/${user.id}` }}>
                      <div className="h-10 w-10 bg-pink-500 shadow-xl rounded-full flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </Link>
                    {isFavoriting ? (
                    <>
                      <button
                        onClick={() => handleRemoveFavorite()}
                        className="h-10 w-10 bg-white shadow-xl rounded-full flex justify-center items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-pink-500"
                          >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                        </button>
                    </>
                    ) : (
                      <>
                        <button
                        onClick={() => user.id && handleFavorite(user.id)}
                        className="h-10 w-10 bg-white shadow-xl rounded-full flex justify-center items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col relative top-[65%]">
                  <div className="text-white font-bold text-3xl text-center mb-1 font-serif">
                    It&lsquo;s a match
                  </div>
                  <div className="text-white font-medium text-base text-center mb-3">
                    You and &lsquo; {user.first_name} &lsquo; have liked each
                    other.
                  </div>

                  <div className="flex justify-center items-center">
                    <button className="w-full bg-pink-500 text-white font-medium text-base py-2">
                      Call me
                    </button>
                    <button className="w-full bg-slate-700 text-white font-medium text-base py-2">
                      Say Hi!
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
    </>
  );
};

export default Cards;
