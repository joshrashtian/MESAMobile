import { createContext, FC, useEffect, useState } from "react";

export const SettingContext = createContext({});

const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState();
  useEffect(() => {}, []);
  return (
    <SettingContext.Provider value={{}}>{children}</SettingContext.Provider>
  );
};
