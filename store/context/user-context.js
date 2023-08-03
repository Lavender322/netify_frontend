import { createContext, useState } from "react";

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

export const UserContext = createContext({
  token: null,
  // addFavorite: (id) => {},
  // removeFavorite: (id) => {}
});

function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);

  // function addFavorite(id) {
  //   setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  // };

  // function removeFavorite(id) {
  //   setFavoriteMealIds((currentFavIds) => currentFavIds.filter(mealId => mealId !== id));
  // };

  const value = {
    token,
    setToken,
    // addFavorite: addFavorite,
    // removeFavorite: removeFavorite
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;