import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useUser } from "../context/UserContext";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, baseURL } = useUser();
  const accessToken = localStorage.getItem("accessToken");

  const dropDownRef = useRef();
  const mobileMenuRef = useRef();

  const [openToggleMenu, setOpenToggleMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggle = () => {
    setOpenToggleMenu((prev) => !prev);
  };

  // close toggle menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenToggleMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success(response.data.message || "Logged out successfully..!");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:-", error);
      toast.error(error?.response?.data?.message || "Failed to logout.");
    }
  };

  return (
    <header
      className={`sticky top-0 bg-gray-900 py-6 transition-all duration-200 ${isScrolled ? "shadow-2xl" : ""}`}
    >
      <div className="container px-3 mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="text-green-600" />
            <span className="text-xl font-semibold text-white">NotesApp</span>
          </Link>

          {/* menu */}
          <ul className="hidden sm:inline-flex items-center text-gray-300 text-lg font-[500]">
            <li className="mr-5">
              <Link>Features</Link>
            </li>
            <li className="mr-5">
              <Link>Pricing</Link>
            </li>
            <li className="mr-5">
              <Link>About</Link>
            </li>
            {user ? (
              <>
                <div className="relative">
                  <img
                    alt="Your Profile"
                    ref={dropDownRef}
                    src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                    onClick={handleToggle}
                    className="h-10 w-10 rounded-full object-cover inline-block"
                  />
                  {openToggleMenu && (
                    <ul className="absolute top-[120%] right-[30%] text-right bg-gray-800 rounded-md">
                      <li className="hover:bg-gray-700 px-6 py-1.5 rounded-t-md">
                        <Link>Profile</Link>
                      </li>
                      <li className="hover:bg-gray-700 px-6 py-1.5">
                        <Link>Settings</Link>
                      </li>
                      <li className="hover:bg-gray-700 px-6 py-1.5 rounded-b-md">
                        <Link onClick={logoutHandler}>Logout</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <li className="mr-5">
                  <Link
                    to={"/signup"}
                    className="bg-green-800 py-2 px-3 rounded-sm"
                  >
                    Sign up
                  </Link>
                </li>
                <li className="mr-5">
                  <Link
                    to={"/login"}
                    className="bg-green-800 py-2 px-3 rounded-sm"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Hamberger */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="sm:hidden text-white text-3xl cursor-pointer"
          >
            {showMenu ? <X /> : <Menu />}
          </button>

          {/* mobile Menu */}
          {showMenu && (
            <ul
              ref={mobileMenuRef}
              className="sm:hidden w-[80%] absolute top-[80px] left-[50%] -translate-x-[50%] bg-gray-800 p-6 rounded-md text-gray-300 text-lg font-[500] space-y-3 text-left"
            >
              <li className="mr-5">
                <Link onClick={() => setShowMenu(false)}>Features</Link>
              </li>
              <li className="mr-5">
                <Link onClick={() => setShowMenu(false)}>Pricing</Link>
              </li>
              <li className="mr-5">
                <Link onClick={() => setShowMenu(false)}>About</Link>
              </li>
              {user ? (
                <>
                  <div className="relative">
                    <img
                      alt="Your Profile"
                      ref={dropDownRef}
                      src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                      onClick={handleToggle}
                      className="h-10 w-10 rounded-full object-cover inline-block"
                    />
                    {openToggleMenu && (
                      <ul className="absolute top-[120%] left-[0%] text-left bg-gray-800 rounded-md">
                        <li className="hover:bg-gray-700 px-6 py-1.5 rounded-t-md">
                          <Link onClick={() => setShowMenu(false)}>
                            Profile
                          </Link>
                        </li>
                        <li className="hover:bg-gray-700 px-6 py-1.5">
                          <Link onClick={() => setShowMenu(false)}>
                            Settings
                          </Link>
                        </li>
                        <li className="hover:bg-gray-700 px-6 py-1.5 rounded-b-md">
                          <Link
                            onClick={() => {
                              logoutHandler();
                              setShowMenu(false);
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <li className="mr-5">
                    <Link
                      to={"/signup"}
                      onClick={() => setShowMenu(false)}
                      className="bg-green-800 py-2 px-3 rounded-sm"
                    >
                      Sign up
                    </Link>
                  </li>
                  <li className="mr-5">
                    <Link
                      to={"/login"}
                      onClick={() => setShowMenu(false)}
                      className="bg-green-800 py-2 px-3 rounded-sm"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
