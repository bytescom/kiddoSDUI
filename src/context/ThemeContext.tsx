import React, { createContext, useContext } from 'react';
import { ThemeConfig } from '../types';

const defaultTheme: ThemeConfig = {
  primary: '#FF9933',
  background: '#FFF5E6',
};

// create context component
const ThemeContext = createContext<ThemeConfig>(defaultTheme);

// create context provider component
export const ThemeProvider: React.FC<{ theme: ThemeConfig; children: React.ReactNode;
}> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);