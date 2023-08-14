import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  firstName: null,
  sectorTags: [],
  gradeTags: [],
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [firstName, setFirstName] = useState();
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    firstName,
    setFirstName,
    sectorTags,
    setSectorTags,
    gradeTags,
    setGradeTags,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;