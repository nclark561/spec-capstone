"use client";
import isBrowser from "is-in-browser";

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
  const storedToken = isBrowser ? localStorage.getItem("token") : '';
  const storedExp = isBrowser ? localStorage.getItem("exp") : '';

  const remaingingTime = calculateRemainingTime(storedExp);

  if (remaingingTime <= 1000 * 60 * 30) {
    isBrowser && localStorage.removeItem("token");
    isBrowser && localStorage.removeItem("exp");
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

    isBrowser && localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  //@ts-ignore
  const login = (tkn, expTime, useId) => {
    setToken(tkn);
    setUserId(useId);

    isBrowser && localStorage.setItem("token", tkn);
    isBrowser && localStorage.setItem("userId", useId);
    isBrowser && localStorage.setItem("exp", expTime);

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
