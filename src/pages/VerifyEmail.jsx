import React, { useState } from "react";
import { CircleCheckBig, Loader } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { baseURL } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const email = localStorage.getItem("emailToverify");
      const response = await axios.post(
        `${baseURL}/user/resend-verification-email`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Resend Email error:-", error);
      toast.error(error?.response?.data?.message || "Failed to resend email");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center px-3">
      <div className="bg-gray-800 max-w-xl w-full p-10 rounded-xl shadow-2xl ">
        <h2 className="text-white font-bold text-2xl mb-3 flex items-center justify-center gap-x-2">
          <CircleCheckBig className="text-green-600" />
          Check Your Email
        </h2>
        <p className="text-center text-gray-300 mb-4">
          We have sent an email to verify your accout. Please check your inbox
          and click the verification link
        </p>

        <button
          onClick={handleResend}
          className="flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              <span>Sending Email</span>
            </>
          ) : (
            "Resend Email"
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
