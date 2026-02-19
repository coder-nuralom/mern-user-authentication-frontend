import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const ForgotPass = () => {
  const navigate = useNavigate();
  const { baseURL } = useUser();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/user/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        setEmail("");
        toast.success(response.data.message || "OTP sent to your email.");
        navigate(`/verify-otp/${email}`);
      }
    } catch (error) {
      console.error("Email Verify and OTP sent error:", error);
      toast.error(
        error?.response?.data?.message || "No account found with this email.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-3">
      <div className="bg-gray-800 w-fit p-10 rounded-xl shadow-2xl ">
        <h2 className="text-2xl font-semibold text-center text-indigo-400">
          Forgot Password
        </h2>
        <p className="text-lg text-gray-300 text-center mt-1">
          Enter your email address to receive a password reset link
        </p>

        <form onSubmit={submitHandler} className="mt-5 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                <span>Sending OTP</span>
              </>
            ) : (
              "Send Reset OTP"
            )}
          </button>
        </form>
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

export default ForgotPass;
