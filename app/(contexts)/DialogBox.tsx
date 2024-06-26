import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createContext, useContext, useMemo, useState } from "react";
import { Text } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

export type DialogBoxProps = {
  onConfirm?: () => void;
  title: string;
  desc: string;
  disengagable?: boolean;
};

interface DialogBox {
  open: (dialogBox: DialogBoxProps) => void;
  close: () => void;
}

const DialogContext = createContext<DialogBox>({
  open: (dialogBox: DialogBoxProps) => {},
  close: () => {},
});

export function DialogBoxProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogBoxProps | null>();
  const dialogFunction = useMemo(
    () => ({
      open: (dialogBox: DialogBoxProps) => setDialog(dialogBox),
      close: () => setDialog(null),
    }),
    []
  );
  return (
    <DialogContext.Provider value={dialogFunction}>
      {children}
      <FullWindowOverlay>{dialog && <Dialog {...dialog} />}</FullWindowOverlay>
    </DialogContext.Provider>
  );
}

export const Dialog = (Props: DialogBoxProps) => {
  const points = useMemo(() => ["33%"], []);

  return (
    <BottomSheet
      backdropComponent={(props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          pressBehavior={Props.disengagable ? "close" : "none"}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      enablePanDownToClose={false}
      style={{ padding: 10 }}
      snapPoints={points}
      index={0}
    >
      <Text style={{ fontFamily: "eudoxusbold", fontSize: 18 }}>
        {Props.title}
      </Text>
      <Text>{Props.desc}</Text>
    </BottomSheet>
  );
};
export function useDialog() {
  const dialog = useContext(DialogContext);

  if (!dialog) {
    throw new Error("useDialog must be used within a DialogBoxProvider");
  }

  function getContext() {
    return dialog;
  }

  function open(dialogBox: DialogBoxProps) {
    dialog.open(dialogBox);
  }

  function close() {
    dialog.close();
  }

  return dialog;
}
