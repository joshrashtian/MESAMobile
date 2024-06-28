import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

export type DialogBoxProps = {
  onConfirm?: () => void;
  title: string;
  desc: string;
  customButtons?: {
    title: string;
    onPress?: () => void;
    confirm?: boolean;
  }[];
  disengagable?: boolean;
  customComponent?: React.ReactNode;
};

type CloseParams = {
  onClose?: () => void;
};

interface DialogBox {
  open: (dialogBox: DialogBoxProps) => void;
  close: (closeOptions?: CloseParams) => void;
}

const DialogContext = createContext<DialogBox>({
  open: (dialogBox: DialogBoxProps) => {},
  close: (closeOptions?: CloseParams) => {},
});

export function DialogBoxProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogBoxProps | null>();
  const dialogFunction = useMemo(
    () => ({
      open: (dialogBox: DialogBoxProps) => setDialog(dialogBox),
      close: (closeOptions?: CloseParams) => {
        if (closeOptions?.onClose) closeOptions.onClose();
        setDialog(null);
      },
    }),
    []
  );
  return (
    <DialogContext.Provider value={dialogFunction}>
      {children}
      <FullWindowOverlay>
        {dialog && (
          <Dialog
            {...dialog}
            finished={() => setTimeout(() => setDialog(null), 200)}
          />
        )}
      </FullWindowOverlay>
    </DialogContext.Provider>
  );
}

export const Dialog = (Props: DialogBoxProps & { finished: any }) => {
  const points = useMemo(() => ["33%"], []);
  const dialogRef = useRef();

  return (
    <BottomSheet
      //@ts-ignore
      ref={dialogRef}
      backdropComponent={(props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          onPress={() => Props.finished()}
          pressBehavior={Props.disengagable ? "close" : "none"}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      enablePanDownToClose={false}
      style={{ padding: 10 }}
      backgroundStyle={{ backgroundColor: "#dedede" }}
      snapPoints={points}
      onClose={() => Props.finished()}
      index={0}
    >
      {Props.customComponent ? (
        Props.customComponent
      ) : (
        <>
          <Text style={{ fontFamily: "eudoxusbold", fontSize: 16 }}>
            {Props.title}
          </Text>
          <Text style={{ fontFamily: "eudoxus", fontSize: 12 }}>
            {Props.desc}
          </Text>
          <View style={{ gap: 3, marginTop: 10 }}>
            {!Props.customButtons ? (
              <>
                {Props.onConfirm && (
                  <>
                    <TouchableOpacity
                      style={{ backgroundColor: "#fff", padding: 10 }}
                      onPress={() => {
                        //@ts-ignore
                        Props.onConfirm();
                        //@ts-ignore
                        dialogRef.current.close();
                      }}
                    >
                      <Text style={{ fontFamily: "eudoxus" }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ backgroundColor: "#fff", padding: 10 }}
                      onPress={() => {
                        //@ts-ignore
                        dialogRef.current.close();
                      }}
                    >
                      <Text style={{ fontFamily: "eudoxus" }}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : (
              <>
                {Props.customButtons.map((e) => (
                  <TouchableOpacity
                    style={{ backgroundColor: "#fff", padding: 10 }}
                    onPress={() => {
                      if (e.confirm) {
                        //@ts-ignore
                        Props.onConfirm();
                        //@ts-ignore
                        dialogRef.current.close();
                      } else
                        e.onPress
                          ? e.onPress()
                          : //@ts-ignore
                            dialogRef.current.close();
                    }}
                  >
                    <Text style={{ fontFamily: "eudoxus" }}>{e.title}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </>
      )}
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

  function close(closeOptions?: CloseParams) {
    dialog.close(closeOptions);
  }

  return { getContext, open, close };
}
