"use client";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

function ThemeInput({
  colorsPicked,
  color,
  setColor,
}: {
  colorsPicked: string[];
  color:
    | {
        name: string;
        color: string;
      }
    | undefined;
  setColor: Dispatch<
    SetStateAction<
      | {
          name: string;
          color: string;
        }
      | undefined
    >
  >;
}) {
  const colorTag = [
    { name: "Green", color: "#277c78" },
    { name: "Yellow", color: "#f2cdac" },
    { name: "Cyan", color: "#82c9d7" },
    { name: "Navy", color: "#626070" },
    { name: "Red", color: "#c94736" },
    { name: "Purple", color: "#826cb0" },
    { name: "Turquoise", color: "#597c7c" },
    { name: "Brown", color: "#93674f" },
    { name: "Magenta", color: "#934f6f" },
    { name: "Blue", color: "#3f82b2" },
    { name: "Navy Grey", color: "#97a0ac" },
    { name: "Army Green", color: "#7f9161" },
    { name: "Pink", color: "#af81ba" },
    { name: "Gold", color: "#cab361" },
    { name: "Orange", color: "#be6c49" },
  ];
  const [dropdown, setDropdown] = useState(false);
  const ref = useOutsideClick(() => setDropdown(false));
  return (
    <div ref={ref} className="relative flex flex-col gap-50">
      <label className="text-preset-5-bold text-grey-500">Theme</label>
      <div
        role="button"
        onClick={() => setDropdown((open) => !open)}
        className="border-beige-500 flex cursor-pointer items-center gap-150 rounded-lg border-1 bg-white px-250 py-150"
      >
        <div
          style={{
            backgroundColor: color?.color,
            opacity: colorsPicked.some(
              (cr) => cr.toLowerCase() === color?.color.toLowerCase(),
            )
              ? 0.1
              : 1,
          }}
          className="h-200 w-200 rounded-full"
        ></div>
        <p
          className={`text-preset-4 ${
            colorsPicked.some(
              (cr) => cr.toLowerCase() === color?.color.toLowerCase(),
            )
              ? "text-grey-500"
              : "text-grey-900"
          }`}
        >
          {color?.name}
        </p>
        {!dropdown ? (
          <TiArrowSortedDown className="text-grey-900 ml-auto h-200 w-200" />
        ) : (
          <TiArrowSortedUp className="text-grey-900 ml-auto h-200 w-200" />
        )}
      </div>
      {dropdown && (
        <div className="flex h-55 w-full flex-col gap-150 overflow-y-scroll rounded-lg bg-white px-250 py-150 drop-shadow-2xl md:h-74.5">
          {colorTag.map((c) => {
            return (
              <React.Fragment key={c.name}>
                <div
                  role="button"
                  onClick={() => {
                    setColor(c);
                    setDropdown(false);
                  }}
                  className="flex cursor-pointer items-center gap-150"
                >
                  <div
                    style={{
                      backgroundColor: c.color,
                      opacity:
                        color?.name === c.name
                          ? 1
                          : colorsPicked.some(
                                (cr) =>
                                  cr.toLowerCase() === c.color.toLowerCase(),
                              )
                            ? 0.1
                            : 1,
                    }}
                    className={`h-200 w-200 rounded-full`}
                  ></div>
                  <p
                    className={`text-preset-4 ${
                      colorsPicked.some(
                        (cr) => cr.toLowerCase() === c.color.toLowerCase(),
                      )
                        ? "text-grey-500"
                        : "text-grey-900"
                    } `}
                  >
                    {c.name}
                  </p>
                  {color?.name === c.name && (
                    <FaCircleCheck className="fill-green ml-auto" />
                  )}
                  {colorsPicked.map(
                    (cr) =>
                      cr.toLowerCase() === c.color.toLowerCase() &&
                      color?.name !== c.name && (
                        <p
                          className="text-preset-5 text-grey-500 ml-auto"
                          key={cr}
                        >
                          Already used
                        </p>
                      ),
                  )}
                </div>
                <div className="border-grey-100 border-b-1"></div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ThemeInput;
