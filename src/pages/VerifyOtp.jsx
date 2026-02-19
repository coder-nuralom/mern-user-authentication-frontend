import React, { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../context/UserContext";

const VerifyOtp = () => {
  const { baseURL } = useUser();
  const { email } = useParams();
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(120);
  const [isCounting, setIsCounting] = useState(true);
  const [isOtpSending, setIsOtpSending] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleCange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      return inputRefs.current[index + 1]?.focus();
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  useEffect(() => {
    let intervel;
    if (isCounting && timer > 0) {
      intervel = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsCounting(false);
    }

    return () => {
      clearInterval(intervel);
    };
  }, [timer, isCounting]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : `${secs}`}`;
  };

  const handleResendOtp = async () => {
    try {
      setIsOtpSending(true);
      const response = await axios.post(`${baseURL}/user/resend-otp/${email}`);
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent successfully..!");
        clearOtp();

        setTimer(120);
        setIsCounting(true);
      }
    } catch (error) {
      console.error("OTP Resend error:", error);
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsOtpSending(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const finalOTP = otp.join("");
    if (finalOTP.length !== 6) {
      toast.error("Please Enter all 6 digits.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseURL}/user/verify-otp/${email}`,
        {
          otp: finalOTP,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message || "OTP Verified.");
        navigate(`/change-password/${email}`);
      }
    } catch (error) {
      console.error("OTP verification error:-", error);
      toast.error(error?.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center px-3">
      <div className="bg-gray-800 w-fit p-10 rounded-xl shadow-2xl ">
        <h2 className="text-2xl font-semibold text-center text-indigo-400">
          Enter Verification Code
        </h2>
        <p className="text-lg text-gray-300 text-center mt-1">
          We have sent a 6-digit verification code to your email.
        </p>

        <form onSubmit={submitHandler} className="mt-5 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 max-[350px]:gap-x-1">
            {otp.map((digit, index) => (
              <input
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                key={index}
                value={digit}
                onChange={(e) => handleCange(index, e.target.value)}
                required
                className="border rounded-sm border-gray-400 w-12 max-[450px]:w-7 h-12 max-[450px]:h-8 text-center font-bold text-xl focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading || otp.some((digit) => digit === "")}
            className={`flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer ${isLoading || otp.some((digit) => digit === "") ? "opacity-50" : "opacity-100"}`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                <span>verifying OTP</span>
              </>
            ) : (
              "Vefity OTP"
            )}
          </button>
        </form>
        <button
          type="button"
          onClick={clearOtp}
          disabled={isLoading || otp.every((digit) => digit === "")}
          className={`mt-3 flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer ${isLoading || otp.every((digit) => digit === "") ? "opacity-50" : "opacity-100"}`}
        >
          Clear OTP
        </button>

        {/* // resend otp */}
        <button
          type="button"
          onClick={handleResendOtp}
          className={`mt-3 flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer`}
        >
          {isOtpSending ? (
            <>
              <Loader className="animate-spin" />
              <span>Sending OTP</span>
            </>
          ) : isCounting ? (
            `Resend in ${formatTime(timer)}`
          ) : (
            "Resend OTP."
          )}
        </button>
        <p className="text-center text-base text-gray-300 mt-4">
          Remember your password?{" "}
          <Link
            to={"/login"}
            className="text-lg text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
