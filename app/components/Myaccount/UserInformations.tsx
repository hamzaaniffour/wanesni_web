import Link from 'next/link'
import React from 'react'
import Options from './Options'
import HomeMenu from '../Widgets/HomeMenu'

const UserInformations = () => {
  return (
    <>
        <button className='absolute bg-pink-100 text-pink-500 font-medium px-3 py-1 text-sm rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 float-left mr-1 relative top-[2px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg> Log out
        </button>
        <div className='flex flex-col justify-center items-center mt-10'>
            <div className="avatar mb-2 mt-4">
                <div className="mask mask-hexagon w-[100px] bg-white">
                    <div className="w-[94px] mask mask-hexagon relative left-[3.5px] bottom-[-3px]">
                        <img src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    </div>
                </div>
            </div>
            <div className='font-semibold text-sm text-white mb-0.5'>Hamza Aniffour</div>
            <div className='font-bold text-sm text-white mb-2'>ID: <span className='font-medium'>501</span></div>
            <div className='flex justify-center items-center gap-4 mb-5'>
                <Link href="/followers">
                    <span className='text-sm text-white font-medium'><strong>100</strong> Followers</span>
                </Link>
                <Link href="/following">
                    <span className='text-sm text-white font-medium'><strong>100</strong> Following</span>
                </Link>
            </div>
            <Link href="/charge-coins">
            <div className="flex justify-between items-center mb-8 rounded-full text-md text-center border-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 border-white mx-auto bg-white font-semibold px-5 py-1.5 text-white">
                <span
                className="h-5 w-5 mr-1 bg-cover"
                style={{ backgroundImage: "url('/assets/coin.png')" }}
                ></span>{" "}
                180 Coins
            </div>
            </Link>
            <div className='mb-5 mt-6'>
                <Options />
            </div>
            <HomeMenu />
        </div>
    </>
  )
}

export default UserInformations