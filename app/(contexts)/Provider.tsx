import { AuthContextProvider } from "./AuthContext";
import { DialogBoxProvider } from "./DialogBox";
import { SettingContext, SettingsContextProvider } from "./SettingsContext";

export function Provider(Props: any) {
  return (
    <AuthContextProvider>
      <SettingsContextProvider>
        <DialogBoxProvider>{Props.children}</DialogBoxProvider>
      </SettingsContextProvider>
    </AuthContextProvider>
  );
}
