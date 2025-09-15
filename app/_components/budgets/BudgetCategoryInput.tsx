"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { TransactionType } from "@/models/Transaction";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
type Category = TransactionType["category"];

type BudgetCategoryInputProps = {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
  usedCategories: Category[];
};

function BudgetCategoryInput({
  category,
  setCategory,
  usedCategories,
}: BudgetCategoryInputProps) {
  const [dropdown, setDropdown] = useState(false);
  const categories: Category[] = [
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
  const ref = useOutsideClick(() => setDropdown(false));
  const isUsedCategory = (category: Category) =>
    usedCategories.some((cat) => cat === category);

  return (
    <div ref={ref} className="relative flex flex-col gap-50">
      <label className="text-preset-5-bold text-grey-500">
        Budget Category
      </label>
      <div
        role="button"
        onClick={() => setDropdown((open) => !open)}
        className="border-beige-500 flex cursor-pointer items-center gap-150 rounded-lg border-1 bg-white px-250 py-150"
      >
        <p
          className={`text-preset-4 ${isUsedCategory(category) ? "text-grey-500" : "text-grey-900"} `}
        >
          {category}
        </p>
        {!dropdown ? (
          <TiArrowSortedDown className="text-grey-900 ml-auto h-200 w-200" />
        ) : (
          <TiArrowSortedUp className="text-grey-900 ml-auto h-200 w-200" />
        )}
      </div>
      {dropdown && (
        <div className="absolute top-20 z-999 flex h-74.5 w-full flex-col gap-150 overflow-y-scroll rounded-lg bg-white px-250 py-150 drop-shadow-xl">
          {categories.map((category) => (
            <React.Fragment key={category}>
              <div
                role="button"
                onClick={() => {
                  setCategory(category);
                  setDropdown(false);
                }}
                className="cursor-pointer"
              >
                <p
                  className={`text-preset-4 ${isUsedCategory(category) ? "text-grey-500" : "text-grey-900"} `}
                >
                  {category}
                </p>
              </div>
              <hr className="text-grey-100" />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default BudgetCategoryInput;
