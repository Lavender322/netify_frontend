import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  userInfo: null,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [tempToken, setTempToken] = useState();
  const [userInfo, setUserInfo] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user-info');
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    tempToken,
    setTempToken,
    authenticate: authenticate,
    logout: logout,
    userInfo,
    setUserInfo
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;