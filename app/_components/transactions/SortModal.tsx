"use client";
import { useModal } from "@/app/_contexts/modalContext";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function SortModal({ isTransitionPage = true }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Transactions";
  const sortBy = searchParams.get("sortBy") || "Latest";
  const page = searchParams.get("page") || 1;
  const { toggleModal } = useModal();
  const ref = useOutsideClick(() => {
    toggleModal("sort", false);
  });

  const sort = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  return (
    <div
      ref={ref}
      className="absolute top-12 right-0 flex w-28.5 flex-col gap-150 rounded-lg bg-white px-250 py-150 drop-shadow-2xl md:top-16"
    >
      <p className="text-preset-4 text-grey-500 md:hidden">Sort by</p>
      <hr className="text-grey-100 md:hidden" />
      {sort.map((s, i) => (
        <React.Fragment key={s}>
          {isTransitionPage && (
            <Link
              onClick={() => toggleModal("sort", false)}
              href={`/transactions?page=${page}&category=${category}&sortBy=${s}`}
              className={`text-grey-900 ${sortBy === s ? "text-preset-4-bold" : "text-preset-4"}`}
            >
              {s}
            </Link>
          )}
          {!isTransitionPage && (
            <Link
              onClick={() => toggleModal("sort", false)}
              href={`/recurring-bills?sortBy=${s}`}
              className={`text-grey-900 ${sortBy === s ? "text-preset-4-bold" : "text-preset-4"}`}
            >
              {s}
            </Link>
          )}
          {i < sort.length - 1 && <hr className="text-grey-100" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SortModal;
