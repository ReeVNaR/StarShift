import { createContext, useContext } from 'react';

export const theme = {
  primary: 'from-gray-900 to-black',
  secondary: 'bg-gray-800',
  accent: 'bg-blue-600',
  text: 'text-blue-400',
  input: 'bg-gray-700',
  border: 'border-blue-500/20'
};

export const ThemeContext = createContext(theme);
export const useTheme = () => useContext(ThemeContext);
