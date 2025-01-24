import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    theme: 'light',
    language: 'en',
  });

  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
