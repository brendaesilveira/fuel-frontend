import { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProviderWrapper = props => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProviderWrapper };