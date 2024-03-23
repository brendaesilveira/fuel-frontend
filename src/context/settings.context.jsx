import { createContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProviderWrapper = props => {
  const [showSettings, setShowSettings] = useState(false)

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState);
  };

  return (
    <SettingsContext.Provider value={{ showSettings, toggleSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProviderWrapper };