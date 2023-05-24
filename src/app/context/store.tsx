"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

let logoutTimer: NodeJS.Timeout;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

//@ts-ignore
const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  return exp - currentTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");

  const remaingingTime = calculateRemainingTime(storedExp);

  if (remaingingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return null;
  }

  return {
    token: storedToken,
    duration: remaingingTime,
  };
};

//@ts-ignore
export const AuthContextProvider = ({ children }) => {
  const localData = getLocalData();

  let initialToken;
  if (localData) {
    initialToken = localData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  //@ts-ignore
  const login = (tkn, expTime, useId) => {
    setToken(tkn);
    setUserId(useId);

    localStorage.setItem("token", tkn);
    localStorage.setItem("userId", useId);
    localStorage.setItem("exp", expTime);

    const remainingTime = calculateRemainingTime(expTime)

    logoutTimer = setTimeout(() => {logout()}, remainingTime)
  };

  const contextValue = {
    token,
    login,
    logout,
    userId
  }

  return (
    //@ts-ignore
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => useContext(AuthContext)
