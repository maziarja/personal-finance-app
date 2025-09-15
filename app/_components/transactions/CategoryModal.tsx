"use client";
import { useModal } from "@/app/_contexts/modalContext";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { TransactionType } from "@/models/Transaction";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Category = TransactionType["category"];

function CategoryModal() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Transactions";
  const { toggleModal } = useModal();
  const ref = useOutsideClick(() => {
    toggleModal("category", false);
  });

  const categories: Category[] = [
    "All Transactions",
    "Bills",
    "Dining Out",
    "Education",
    "Entertainment",
    "General",
    "Groceries",
    "Lifestyle",
    "Personal Care",
    "Shopping",
    "Transportation",
  ];

  return (
    <div
      ref={ref}
      className="absolute top-12 right-0 flex h-75 w-44 flex-col gap-150 overflow-y-scroll rounded-lg bg-white px-250 py-150 drop-shadow-2xl md:top-16"
    >
      <p className="text-preset-4 text-grey-500 md:hidden">Category</p>
      <hr className="text-grey-100 md:hidden" />
      {categories.map((cat, i) => (
        <React.Fragment key={cat}>
          <Link
            onClick={() => toggleModal("category", false)}
            href={`/transactions?page=${1}&category=${cat}`}
            className={`text-grey-900 ${category === cat ? "text-preset-4-bold" : "text-preset-4"}`}
          >
            {cat}
          </Link>
          {i < categories.length - 1 && <hr className="text-grey-100" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CategoryModal;
