import { useState } from "react";
import { useUserContext } from "../../context";
import showPassword from "./../../assets/show-password.png";
import hidePassword from "./../../assets/hide-password.png";

export default function Registration({ setIsLogin, isAdmin }) {
  const { verifyAdminOTPAndRegister, sendAdminOTP, registerDev, loading } =
    useUserContext();

  const [localState, setLocalState] = useState({
    name: "",
    password: "",
    email: "",
    otp: "",
  });
  const [otpSend, setOtpSend] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (isAdmin) {
      if (!otpSend) {
        await sendAdminOTP({ email: localState.email });
        setOtpSend(true);
      } else {
        await verifyAdminOTPAndRegister({ ...localState });
      }
    } else {
      await registerDev({ ...localState, otp: undefined });
    }
  };

  return (
    <div className="rounded-2xl bg-white items-center flex flex-col p-4">
      <h1 className="text-lg-custom">
        {isAdmin ? "Register as Admin" : "Register as faculy or expert"}
      </h1>
      <form className="flex flex-col m-4 text-sm-custom">
        {!otpSend && (
          <>
            <div className="flex justify-between my-1">
              <label className="mr-2 self-center">Name</label>
              <input
                className="p-4 py-2 border-2 border-gray-300 rounded-lg self-center"
                placeholder="Enter Name"
                name="name"
                type="text"
                value={localState.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between my-1">
              <label className="mr-2 self-center">password</label>
              <div className="w-[70%] flex justify-between border-2 border-gray-300 outline-none rounded-lg bg-white self-center">
                <input
                  className="p-4 py-2 rounded-lg w-full h-full outline-none"
                  placeholder="Enter password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={localState.password}
                  onChange={handleChange}
                />
                <p className="w-8" onClick={() => setShowPass((prev) => !prev)}>
                  <img
                    className="w-5 h-5"
                    src={showPass ? showPassword : hidePassword}
                    alt="password"
                  />
                </p>
              </div>
            </div>
            <div className="flex justify-between my-1">
              <label className="mr-2 self-center">
                {isAdmin ? "AICTE email" : "email"}
              </label>
              <input
                className="p-4 py-2 border-2 border-gray-300 rounded-lg self-center"
                placeholder="Enter AICTE email"
                name="email"
                type="email"
                value={localState.email}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {otpSend && (
          <div className="m-1">
            <label className="my-2 self-center block">
              Enter the otp send to your mail
            </label>
            <input
              className="p-4 py-2 border-2 border-gray-300 rounded-lg self-center"
              placeholder="Enter OTP"
              name="otp"
              value={localState.otp}
              onChange={handleChange}
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-secondary-400 my-2 p-4 py-2 rounded-lg ${
            loading && "bg-opacity-50"
          }`}
          onClick={onSubmit}
        >
          {isAdmin ? (otpSend ? "Register" : "Generate OTP") : "Register"}
        </button>
      </form>
      <p>
        Already Registered?
        <span
          className="text-blue-400 hover:cursor-pointer"
          onClick={() => setIsLogin(true)}
        >
          click here
        </span>
      </p>
    </div>
  );
}
