import directus from "@/app/api/directus/clients";
import { createUser, uploadFiles } from "@directus/sdk";
import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import Popup from "reactjs-popup";
import UserBirthday from "./UserBirthday";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AvatarUpload from "./HandlesSignup/AvatarUpload";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  birthday: string;
  phone: string;
  location: string;
  gender: string;
  user_type: string;
  isocode: string;
  dialcode: string;
  description: string;
  coins: number;
  role: string;
  fcm_token: string;
  device_id: string;
  manager_id: string;
}

const SignUPForm = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "89a3ccb0-c8b2-459f-bd6f-8ce52fb0055f",
    birthday: "",
    phone: "",
    description: "",
    location: "United Arab Emirates",
    gender: "",
    user_type: "normal",
    confirmPassword: "",
    isocode: "",
    coins: 80,
    dialcode: "",
    fcm_token: "123",
    role: "0eb17514-a007-424a-b7b2-11074e7cf585",
    device_id: "1",
    manager_id: "1",
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [randomCode, setRandomCode] = useState("");
  const [codeParts, setCodeParts] = useState(["", "", "", "", "", ""]);
  const codeRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [errors2, setErrors2] = useState<Partial<FormData>>({});

  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRandomCode(code);
    return code;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
    setErrors2({
      ...errors2,
      [e.target.name]: undefined,
    })
  };
  const handleCodeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    setCodeParts((prevCodeParts) => {
      const newCodeParts = [...prevCodeParts];
      newCodeParts[index] = value;
      return newCodeParts;
    });
    if (value === "" && index > 0) {
      codeRefs[index - 1]?.current?.focus();
    }

    if (value !== "" && index < codeRefs.length - 1) {
      codeRefs[index + 1]?.current?.focus();
    }
  };
  const handlePopupButtonClick = () => {
    if (codeParts.some((part) => part === "")) {
      console.log("PLEASE ENTER THE CODE");
      setLoading(true);
      return;
    }
    if (codeParts.join("") === randomCode) {
      setLoading(true);
      setShowPopup(false);
      setCurrentStep(2);
    } else {
      console.log("OTP CODE IN NOT CORRECT!");
    }
  };
  const handleDateChange = (date: any) => {
    console.log("Selected Date:", date);
    setFormData({
      ...formData,
      birthday: date,
    });
  };
  const handlePhoneChange = (
    value: string,
    country_name: { dialCode: string; name: string; countryCode: string }
  ) => {
    setFormData({
      ...formData,
      isocode: country_name.dialCode,
      phone: value.replace(country_name.dialCode, ""),
      location: country_name.name,
      dialcode: country_name.countryCode,
    });
  };
  
  const [fileId, setFileId] = useState<string>("");
  const handleFileIdChange = async (newFileId: globalThis.FormData) => {
    try {
      await directus.request(uploadFiles(newFileId));
      console.log("File data:", fileId);
      setFileId(newFileId.get("file") as string);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    phoneValue?: string
  ) => {
    const { name, value } = e.target;
    let defaultAvatarId: File | "89a3ccb0-c8b2-459f-bd6f-8ce52fb0055f" | "" =
      "";

    let description = "";
    if (name === "gender") {
      if (value === "men") {
        defaultAvatarId = "04819d6a-8958-4ae2-a401-828f6740a761" as any;
        description = `Hello, I'm ${formData.first_name || ""} im men.`;
      } else if (value === "women") {
        defaultAvatarId = "89a3ccb0-c8b2-459f-bd6f-8ce52fb0055f";
        description = `Hello, I'm ${formData.first_name || ""} im women.`;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      description: description,
    }));
    console.log("FormData:", formData);
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const newErrors: Partial<typeof formData> = {};
    const newErrors2: Partial<typeof formData> = {};

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if(!formData.birthday) {
      newErrors2.birthday = "Birthday is required";
    }

    setErrors(newErrors);
    setErrors2(newErrors2);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    if (Object.keys(newErrors2).length > 0) {
      setLoading(false);
      return;
    }

    try {
      if (currentStep === 1) {
        const randomCode = generateRandomCode();
        const response = await fetch("https://wanesni.live/otp-extension", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, code: randomCode }),
        });

        if (response.ok) {
          setShowPopup(true);
        } else {
          console.log("Error sending OTP code");
        }
      } else {
        const result = await directus.request(createUser(formData));
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <Popup
              open={showPopup}
              modal
              closeOnDocumentClick={false}
              className="modal-bg"
              contentStyle={{ height: "auto" }}
            >
              <div className="popup">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-1">
                      Enter Verification Code
                    </h1>
                    <p className="text-sm text-center max-w-[350px] mx-auto mb-7 text-gray-500 font-normal">
                      We have sent you a message consisting of 6 characters via
                      your email, please check it and then enter the codes in
                      the fields below
                    </p>
                    <div className="flex justify-center space-x-2 mb-4">
                      {codeParts.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          placeholder="0"
                          value={value}
                          onChange={(e) => handleCodeInputChange(e, index)}
                          maxLength={1}
                          className="w-12 h-12 text-3xl text-center text-black font-bold border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
                          ref={codeRefs[index]}
                        />
                      ))}
                    </div>
                    <button
                      className="items-center py-2 px-4 pr-2 rounded-full font-medium btn-signup bg-pink-500 w-[40%] text-white hover:bg-pink-600 mt-4 capitalize text-md"
                      type="submit"
                      disabled={codeParts.some((part) => part === "")}
                      onClick={handlePopupButtonClick}
                    >
                      {loading ? (
                        <div className="flex items-center justify-between">
                          <span>Verifying..</span>
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
                          <span>Verify Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Popup>

            <div className="lg:flex lg:gap-2">
              <div className="lg:w-6/12 mb-3">
                <div className="w-100">
                  <div className="relative h-10 w-full">
                    <input
                      className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      style={{
                        background: errors.email ? "#ff000033" : "white",
                      }}
                    />
                    <label
                      style={{
                        color: errors.email ? "rgb(255 0 0 / 74%)" : "",
                      }}
                      className="before:content[' '] after:content[' '] text-pink-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      First name
                    </label>
                  </div>
                  {errors.first_name && (
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
                        className="w-4 h-4 mr-0.5 mt-[1.5px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>{" "}
                      {errors.first_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:w-6/12 mb-3">
                <div className="w-100">
                  <div className="relative h-10 w-full">
                    <input
                      className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      style={{
                        background: errors.last_name ? "#ff000033" : "white",
                      }}
                    />
                    <label
                      style={{
                        color: errors.last_name ? "rgb(255 0 0 / 74%)" : "",
                      }}
                      className="before:content[' '] after:content[' '] text-pink-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      Last name
                    </label>
                  </div>
                  {errors.last_name && (
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
                        className="w-4 h-4 mr-0.5 mt-[1.5px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>{" "}
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-12/12 mb-3">
              <div className="w-100">
                <div className="relative h-10 w-full">
                  <input
                    className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="text"
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
                      className="w-4 h-4 mr-0.5 mt-[1.5px]"
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
            <div className="lg:flex lg:gap-2">
              <div className="lg:w-6/12 mb-3">
                <div className="w-100">
                  <div className="relative h-10 w-full">
                    <input
                      className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      style={{
                        background: errors.password ? "#ff000033" : "white",
                      }}
                    />
                    <label
                      style={{
                        color: errors.password ? "rgb(255 0 0 / 74%)" : "",
                      }}
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
                        className="w-4 h-4 mr-0.5 mt-[1.5px]"
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

              <div className="lg:w-6/12 mb-3">
                <div className="w-100">
                  <div className="relative h-10 w-full">
                    <input
                      className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      style={{
                        background: errors.confirmPassword
                          ? "#ff000033"
                          : "white",
                      }}
                    />
                    <label
                      style={{
                        color: errors.confirmPassword
                          ? "rgb(255 0 0 / 74%)"
                          : "",
                      }}
                      className="before:content[' '] after:content[' '] text-pink-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      Confirm Password
                    </label>
                  </div>
                  {errors.confirmPassword && (
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
                        className="w-4 h-4 mr-0.5 mt-[1.5px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>{" "}
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
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
                    <span>Please wait...</span>
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
                    <span>Continue</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="mb-5">
              <AvatarUpload onFileIdChange={handleFileIdChange} />
            </div>

            <UserBirthday
              id="birthday"
              value={formData.birthday}  
              onChange={handleDateChange}
            />
            {errors2.birthday && <div className="text-red-500 mt-3">{errors2.birthday}</div>}

            <div className="lg:flex lg:gap-2">
              <div className="lg:w-6/12 mb-3">
                <div className="relative h-10 w-full">
                  <PhoneInput
                    country={"ae"}
                    inputProps={{
                      required: true,
                      className:
                        "w-full h-10 indent-8 text-blue-gray-400 rounded-md border-2 border-blue-gray-200 px-3 py-2 font-sans text-sm font-medium focus:outline-none",
                    }}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="lg:w-6/12 mb-3">
                <div className="w-100">
                  <div className="relative h-10 w-full">
                    <input
                      className="peer h-full w-full rounded-md border-2 border-white bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={true}
                      id="country"
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none text-pink-300 absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Country
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-12/12 mb-5">
              <div className="w-100">
                <div className="relative h-10 w-full">
                  <select
                    className="select w-full text-blue-gray-400 bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      background: errors.gender ? "#ff000033" : "white",
                    }}
                  >
                    <option disabled value="">
                      Gender
                    </option>
                    <option value="men">Male</option>
                    <option value="women">Female</option>
                  </select>
                </div>
                {errors2.location && <div className="text-red-500 mt-3">{errors2.location}</div>}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-default btn-signup w-full bg-pink-500 text-white capitalize hover:bg-pink-600"
            >
              Sign Up
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUPForm;
