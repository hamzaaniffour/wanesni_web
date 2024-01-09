import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div>
        <Link href="/">
          <div
            className="rounded-md bg-cover flex mx-auto justify-center items-center mb-5"
            style={{
              backgroundImage: "url('/assets/icon.png')",
              height: "50px",
              width: "50px",
            }}
          ></div>
        </Link>
      </div>

      <h2 className="text-black text-2xl font-bold text-center mb-8">Log In</h2>
      <p className="text-gray-500 font-medium text-sm text-center flex mx-auto max-w-[300px] mb-6">
        Sign In, To discover our world So many matches, waiting for you.
      </p>

      <div className="lg:w-12/12 mb-3">
        <div className="w-100 flex mx-auto items-center justify-center">
          <div className="relative h-10 w-full">
            <input
              className="peer h-full w-full rounded-md border-2 border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="email"
              name="email"
              //   value={email}
              //   onChange={(e) => handleEmailChange(e.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Address Email
            </label>
          </div>
        </div>
        {/* {errors.email && (
          <p className="text-red-600 text-xs font-semibold mt-1">
            {errors.email}
          </p>
        )} */}
      </div>

      <div className="lg:w-12/12 mb-3">
        <div className="w-100 flex mx-auto items-center justify-center">
          <div className="relative h-10 w-full">
            <input
              className="peer h-full w-full rounded-md border-2 border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="password"
              name="password"
              //   value={password}
              //   onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
        </div>
        {/* {errors.password && (
          <p className="text-red-600 text-xs font-semibold mt-1">
            {errors.password}
          </p>
        )} */}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center mx-auto btn btn-default btn-signup w-full bg-pink-500 text-white hover:bg-pink-600 capitalize text-base"
        // onClick={handleLogin}
      >
        Log In
      </button>

      <p className="text-sm text-gray-400 font-medium text-center mt-8 mx-10">
        By clicking the “Sign up” button, you are creating a Wanesni account and
        therefore you agree to Freepik Company&rsquo;s
        <Link href="/" className="text-sky-500">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link className="text-sky-500" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-gray-600 font-medium mt-3">
        Don&rsquo;t you have an account?{" "}
        <Link className="text-pink-500" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
