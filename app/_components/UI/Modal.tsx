"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import {
  ButtonHTMLAttributes,
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  onOpen: Dispatch<SetStateAction<string>>;
  close: () => void;
  openName: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error("used outside");
  return context;
};

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const onOpen = setOpenName;
  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        onOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default Modal;

function Window({
  children,
  name,
}: {
  children: ReactElement<{ close: () => void }>;
  name: string;
}) {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black/50">
      <div
        ref={ref}
        className="absolute top-1/2 left-1/2 flex w-[93%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col gap-250 rounded-xl bg-white px-250 py-300"
      >
        {cloneElement(children, { close })}
      </div>
    </div>
  );
}

function Open({
  children,
  open,
}: {
  children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  open: string;
}) {
  const { onOpen } = useModal();
  return cloneElement(children, { onClick: () => onOpen(open) });
}

Modal.Window = Window;
Modal.Open = Open;
