import { createContext, useContext } from 'react';

export const theme = {
  primary: 'from-black to-zinc-900',
  secondary: 'bg-zinc-900',
  accent: 'bg-blue-600',
  text: 'text-white',
  input: 'bg-black',
  border: 'border-zinc-800'
};

export const ThemeContext = createContext(theme);
export const useTheme = () => useContext(ThemeContext);
