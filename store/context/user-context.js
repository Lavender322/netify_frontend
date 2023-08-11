import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DUMMY_EVENTS = [
  {
    id: 'e1',
    name: 'Emma',
    grade: 'Senior Associate',
    sector: 'EUMI',
    period: '10:00 - 10:15',
    date: 'Tomorrow'
  },
  {
    id: 'e2',
    name: 'Albina Ranniaia',
    grade: 'Senior Associate',
    sector: 'EUMI',
    period: '12:00 - 12:30',
    date: 'Tomorrow'
  },
  {
    id: 'e3',
    name: 'Kevin Liang',
    grade: 'Senior Associate',
    sector: 'IPS',
    period: '18:30 - 18:50',
    date: 'Tomorrow'
  },
  {
    id: 'e4',
    name: 'Elizabeth D',
    grade: 'Senior Associate',
    sector: 'IPS',
    period: '08:00 - 08:15',
    date: 'Jun 13'
  },
  {
    id: 'e5',
    name: 'Emma',
    grade: 'Senior Associate',
    sector: 'EUMI',
    period: '10:00 - 10:15',
    date: 'Jun 15'
  },
  {
    id: 'e6',
    name: 'Emma',
    grade: 'Senior Associate',
    sector: 'EUMI',
    period: '10:00 - 10:15',
    date: 'Jun 15'
  }
];

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  firstName: null
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [firstName, setFirstName] = useState();

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
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;