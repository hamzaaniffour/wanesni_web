import directus from "@/app/api/directus/clients";
import { readMe, updateMe } from "@directus/sdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface UserData {
  first_name?: string;
  last_name?: string;
  description?: string;
  location?: string;
  phone?: string;
  isocode?: string;
  dialcode?: string;
}

const initialFormData: UserData = {
  first_name: "",
  last_name: "",
  description: "",
  location: "",
  phone: "",
  isocode: "",
  dialcode: "",
};

const UpdateInfos = () => {
  const [formData, setFormData] = useState<UserData>(initialFormData);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await directus.request(
          readMe({
            fields: ["*"],
          })
        );
        setFormData(result);
        console.log(result);
      } catch (error) {
        console.log("NO DATA FOUND!");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (key: keyof UserData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

    const handlePhoneChange = (key: keyof UserData, value: string) => (
    country_name: { dialcode: string; name: string; countryCode: string }
  ) => {
    setFormData({
      ...formData,
      // isocode: country_name.dialcode,
      phone: value.replace(country_name.dialcode, ""),
      // location: country_name.name,
      // dialcode: country_name.countryCode,
    });
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resdata = await directus.request(
        updateMe({
          first_name: formData.first_name,
          last_name: formData.last_name,
          description: formData.description,
          location: formData.location,
          phone: formData.phone,
          isocode: formData.isocode,
          dialcode: formData.dialcode,
        })
      );
      router.push('/account');
      console.log(resdata);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Link href="/account">
        <button className="px-4 py-1 rounded-full bg-gray-100 absolute top-2 left-2 border-0 hover:bg-gray-200 capitalize text-black font-semibold text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 float-left mr-1 text-pink-500 relative top-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>{" "}
          Back
        </button>
      </Link>
      <h2 className="text-lg mt-5 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 font-bold py-3 pt-0 pb-2 text-center">
        Update Your Profile
      </h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex mx-auto mb-10 rounded-full"></div>

      <form onSubmit={handleUpdateProfile}>
        <div className="mx-auto w-24 text-center relative top-[-125px] mb-12">
          <div className="relative w-24">
            <img
              className="w-24 h-24 rounded-full absolute"
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            <div className="w-24 h-24 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
              <img
                className="hidden group-hover:block w-12"
                src="https://www.svgrepo.com/show/33565/upload.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="lg:flex lg:gap-2 mt-40">
          <div className="w-12/12 lg:w-6/12 w-full mb-3">
            <div className="w-100 flex mx-auto items-center justify-center">
              <div className="relative h-10">
                <input
                  className="peer h-full w-full rounded-md border-2 border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  First Name
                </label>
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 w-12/12 mb-3">
            <div className="w-100 flex mx-auto items-center justify-center">
              <div className="relative h-10">
                <input
                  className="peer h-full w-full rounded-md border-2 border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Last Name
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-12/12 mb-3">
          <div className="w-100 flex mx-auto items-center justify-center">
            <div className="relative h-20 w-full">
              <textarea
                id="biography"
                name="biography"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="border-blue-gray-200 bg-transparent font-sans text-sm font-medium text-blue-gray-700 outline-none border-2 resize-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:gap-2">
          <div className="lg:w-6/12 mb-3">
            <div className="w-100 flex mx-auto items-center justify-center">
              <div className="relative h-10 w-100">
                <input
                  className="peer h-full w-full rounded-md border-2 border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Country
                </label>
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 mb-3">
            <div className="w-100 flex mx-auto items-center justify-center">
              <div className="relative h-10 w-80">
                <PhoneInput
                  country={`${formData.dialcode}`}
                  inputProps={{
                    required: true,
                    className:
                      "w-full h-10 indent-8 text-blue-gray-400 rounded-md border-2 border-blue-gray-200 px-3 py-2 font-sans text-sm font-medium focus:outline-none",
                  }}
                  value={formData?.phone || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-defualt bg-pink-500 hover:bg-pink-600 text-white font-medium capitalize text-base w-full"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateInfos;
