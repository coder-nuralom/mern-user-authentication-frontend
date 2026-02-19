import React, { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { baseURL } = useUser();
  const { email } = useParams();
  const navigate = useNavigate();
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleCange = (e) => {
    const { name, value } = e.target;
    setUserPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseURL}/user/change-password/${email}`,
        userPassword,
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Password changing error:-", error);
      toast.error(
        error?.response?.data?.message || "Failed to change password",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Change Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                New Password
              </label>
            </div>
            <div className="mt-1">
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPass ? "text" : "password"}
                  value={userPassword.newPassword}
                  onChange={handleCange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {userPassword.newPassword && (
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer"
                  >
                    {showNewPass ? <Eye size={22} /> : <EyeOff size={22} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-1">
              <div className="relative">
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type={showConfirmPass ? "text" : "password"}
                  value={userPassword.confirmNewPassword}
                  onChange={handleCange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {userPassword.confirmNewPassword && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer"
                  >
                    {showConfirmPass ? <Eye size={22} /> : <EyeOff size={22} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  <span>Changing Password</span>
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
