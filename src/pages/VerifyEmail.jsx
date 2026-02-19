import React from "react";
import { CircleCheckBig } from "lucide-react";

const VerifyEmail = () => {
  return (
    <div className="h-screen flex items-center justify-center px-3">
      <div className="bg-gray-800 w-fit p-10 rounded-xl shadow-2xl ">
        <h2 className="text-white font-bold text-2xl mb-3 flex items-center justify-center gap-x-2">
          <CircleCheckBig className="text-green-600" />
          Check Your Email
        </h2>
        <p className="text-center text-gray-300">
          We have sent an email to verify your accout. Please check your inbox
          and click the verification link
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
