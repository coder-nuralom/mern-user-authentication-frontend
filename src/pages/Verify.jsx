import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const { baseURL } = useUser();
  const { token } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Verifying Email");

  useEffect(() => {
    let messageTimeout;
    let redirectTimeout;

    const verifyEmail = async () => {
      if (!token) {
        setStatus("Invalid or missing token.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.post(
          `${baseURL}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          setIsLoading(false);
          setStatus(response.data.message || "Email Verified.");

          messageTimeout = setTimeout(() => {
            setIsLoading(true);
            setStatus("Redirecting to login page.");
          }, 2000);

          redirectTimeout = setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        console.error("Email Verification Error:-", error);
        setStatus(error?.response?.data?.message);
        setIsLoading(false);
      }
    };
    verifyEmail();
    return () => {
      clearTimeout(messageTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [token, navigate, baseURL]);

  return (
    <div className="h-screen flex items-center justify-center px-3">
      <div className="bg-gray-800 w-fit p-10 rounded-xl shadow-2xl ">
        <h2 className="text-white font-bold text-2xl mb-3 flex items-center justify-center gap-x-2">
          {isLoading && <Loader className="animate-spin" />}
          {status}
        </h2>
      </div>
    </div>
  );
};

export default Verify;
