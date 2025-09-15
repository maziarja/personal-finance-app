"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ModalProviderType = {
  children: ReactNode;
};

const initialState = {
  category: false,
  sort: false,
  sidebar: true,
};

type Name = keyof typeof initialState;

type ContextType = {
  modal: typeof initialState;
  toggleModal: (name: Name, value?: boolean) => void;
};

const ModalContext = createContext<ContextType | undefined>(undefined);

function ModalProvider({ children }: ModalProviderType) {
  const [modal, setModal] = useState(initialState);
  const toggleModal = (name: Name, value?: boolean) => {
    setModal((prev) =>
      value === undefined
        ? { ...prev, [name]: !prev[name] }
        : { ...prev, [name]: value },
    );
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

const useModal = function () {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal context was used outside of the modalProvider");
  return context;
};

export { ModalProvider, useModal };
