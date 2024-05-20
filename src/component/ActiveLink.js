import React, { createContext, useContext, useState } from 'react';

const ActiveLinkContext = createContext();

export const useActiveLink = () => useContext(ActiveLinkContext);

export const ActiveLinkProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <ActiveLinkContext.Provider value={{ activeLink, handleLinkClick }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};
