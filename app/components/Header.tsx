import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/public/assets/icon.png";

const Header = () => {
  return (
    <>
      <header className="drawer px-2 lg:px-5 xl:px-5">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar z-50 -mb-20">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="h-9 w-9 relative rounded-full top-0.5 cursor-pointer text-center bg-white mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current text-pink-500 relative top-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="navbar-start">
              <Link href="/" className="logo text-white text-3xl mt-0">
                <Image
                  src={Logo}
                  alt="Logo"
                  height={23}
                  width={23}
                  className="float-left mr-1 mt-2.5"
                />{" "}
                wanesni
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    href="/"
                    className="text-white font-medium text-lg hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white font-medium text-lg hover:text-white"
                  >
                    Safety Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white font-medium text-lg hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white font-medium text-lg hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white font-medium text-lg hover:text-white"
                  >
                    Download APP
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end space-x-1.5">
              <Link
                href="/signup"
                className="hidden lg:block xl:block py-2 px-5 bg-black rounded-full text-white font-medium justify-center"
              >
                Create Account{" "}
                <svg
                  className="float-right w-5 h-5 ml-2 relative top-0.5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                  />
                </svg>
              </Link>
              <Link
                href="/login"
                className="py-2 px-5 bg-white rounded-full text-pink-500 font-medium flex justify-center"
              >
                Log In{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-1 relative top-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            <li>
              <Link
                href="/"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Safety Center
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-slate-900 font-medium text-lg hover:text-slate-900"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
