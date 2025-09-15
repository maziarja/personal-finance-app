"use client";

import { useModal } from "@/app/_contexts/modalContext";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

function OpenSidebar() {
  const { modal, toggleModal } = useModal();
  // if (modal.sidebar) return null;
  return (
    <button
      onClick={() => toggleModal("sidebar", true)}
      className={`fixed bottom-42.5 left-0 hidden cursor-pointer transition-all duration-350 lg:flex ${!modal.sidebar ? "opacity-100" : "translate-x-[300px] opacity-0"}`}
    >
      <TbArrowBigRightLinesFilled className="fill-grey-900 h-300 w-300" />
    </button>
  );
}

export default OpenSidebar;
