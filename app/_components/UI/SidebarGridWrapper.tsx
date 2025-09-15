"use client";

import { useModal } from "@/app/_contexts/modalContext";
import { ReactNode } from "react";

function SidebarGridWrapper({ children }: { children: ReactNode }) {
  const { modal } = useModal();

  return (
    <div
      className={`bg-beige-100 @container flex min-h-dvh flex-col lg:relative lg:grid ${modal.sidebar ? "grid-cols-[300px_1fr]" : "grid-cols-[0px_1fr]"} `}
    >
      {children}
    </div>
  );
}

export default SidebarGridWrapper;
