import { createContext, useState } from 'react';
import { COOKIE_USER_TOKEN, LOCAL_STOGRATE_USER_INFOR } from '../contants';
import { getCookie } from '../helpers/cookie';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const isAuthenticated = getCookie(COOKIE_USER_TOKEN);
  const userInfo = localStorage.getItem(LOCAL_STOGRATE_USER_INFOR);
  const [authContext] = useState({
    isAuthenticated,
    userInfo,
  });

  // Return provider
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
