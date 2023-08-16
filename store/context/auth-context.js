import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  firstName: null,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [tempToken, setTempToken] = useState();
  const [firstName, setFirstName] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('first-name');
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    tempToken,
    setTempToken,
    authenticate: authenticate,
    logout: logout,
    firstName,
    setFirstName
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;