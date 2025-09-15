"use client";

import { useModal } from "@/app/_contexts/modalContext";
import { ReactNode } from "react";

function OverviewLayoutWrapper({ children }: { children: ReactNode }) {
  const { modal } = useModal();
  return (
    <div
      className={`flex flex-col gap-300 lg:@[920px]:flex-row ${modal.sidebar ? "lg:@[644px]:flex-col" : "lg:@[644px]:flex-row"}`}
    >
      {children}
    </div>
  );
}

export default OverviewLayoutWrapper;
