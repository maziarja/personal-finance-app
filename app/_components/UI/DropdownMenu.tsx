"use client";

import React from "react";
import Modal from "./Modal";

type DropdownItem = {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  open: string;
};

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <div className="flex flex-col gap-150 rounded-lg bg-white px-250 py-150 shadow-lg drop-shadow-lg">
      {items.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <div role="button" onClick={item.onClick}>
              <Modal.Open open={item.open}>
                <button
                  key={i}
                  className={`text-preset-4 mr-auto cursor-pointer ${item.variant === "danger" ? "text-red" : "text-grey-900"}`}
                >
                  {item.label}
                </button>
              </Modal.Open>
            </div>
            {items.length > i + 1 && (
              <div className="border-grey-100 border-b-1"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default DropdownMenu;
