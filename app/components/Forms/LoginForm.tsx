import directus from "@/app/api/directus/clients";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const showToastMessage = () => {
    toast.error("Invalid login credentials!");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      return;
    }
    if (formData.password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      return;
    }

    try {
      setLoading(true);
      const data = await directus.login(formData.email, formData.password);
      console.log(data);
      router.push("/account");
    } catch (error) {
      showToastMessage();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

      <h2 className="text-black text-2xl font-bold text-center -mb-[13px]">
        Sign In
      </h2>
      <div className="h-4 w-20 bg-pink-500 mx-auto mb-2"></div>
      <p className="text-gray-500 font-medium text-sm text-center flex mx-auto max-w-[300px] mb-8">
        Sign In, To discover our world So many matches, waiting for you.
      </p>

      <form onSubmit={handleLogin}>
        <div className="lg:w-12/12 mb-3">
          <div className="w-100 flex flex-col mx-auto items-center justify-center">
            <div className="relative h-10 w-full">
              <input
                className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ background: errors.email ? "#ff000033" : "white" }}
              />
              <label
                style={{ color: errors.email ? "rgb(255 0 0 / 74%)" : "" }}
                className="before:content[' '] after:content[' '] text-pink-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Address Email
              </label>
            </div>
            {errors.email && (
              <p
                className="text-left font-bold text-[13px] mt-0.5 w-full flex justify-start"
                style={{ color: "rgb(255 0 0 / 74%)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-0.5 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>{" "}
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="lg:w-12/12 mb-3">
          <div className="w-100 flex flex-col mx-auto items-center justify-center">
            <div className="relative h-10 w-full">
              <input
                className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ background: errors.password ? "#ff000033" : "white" }}
              />
              <label
                style={{ color: errors.password ? "rgb(255 0 0 / 74%)" : "" }}
                className="before:content[' '] after:content[' '] text-pink-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Password
              </label>
            </div>
            {errors.password && (
              <p
                className="text-left font-bold text-[13px] mt-0.5 w-full flex justify-start"
                style={{ color: "rgb(255 0 0 / 74%)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-0.5 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>{" "}
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-[15px]">
          <button
            className="items-center py-2 px-4 pr-2 rounded-full font-medium btn-signup bg-pink-500 w-[40%] text-white hover:bg-pink-600 capitalize text-md"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-between">
                <span>Signing in...</span>
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-white animate-spin fill-pink-300"
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
                <span>Sign In</span>
              </>
            )}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" />

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
