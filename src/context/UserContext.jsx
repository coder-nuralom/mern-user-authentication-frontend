import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const baseURL =
    "https://mern-user-authentication-backend-production.up.railway.app";
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  return (
    <UserContext.Provider value={{ baseURL, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
// mern-user-authentication-cuxs.onrender.com
