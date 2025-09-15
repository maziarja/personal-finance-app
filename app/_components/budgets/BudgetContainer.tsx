"use client";
import Link from "next/link";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { BudgetType } from "@/models/Budget";
import { TransactionType } from "@/models/Transaction";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { TRANSACTIONS_LIMIT } from "@/config/constants";
import Image from "next/image";
import DropdownMenu from "../UI/DropdownMenu";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import Modal from "../UI/Modal";
import EditBudgetForm from "./EditBudgetForm";
import DeleteBudgetForm from "./DeleteBudgetForm";

type BudgetContainerProps = {
  budget: BudgetType;
  budgets: BudgetType[];
  allTransactions: TransactionType[];
  transactionsOfMonth: TransactionType[];
};

function BudgetContainer({
  budget,
  budgets,
  allTransactions,
  transactionsOfMonth,
}: BudgetContainerProps) {
  const { category, maximum, theme } = budget;
  const [budgetDropdown, setBudgetDropdown] = useState(false);
  const ref = useOutsideClick(() => setBudgetDropdown(false));
  const [progress, setProgress] = useState(0);
  const totalBudgetedSpendingOfMonth = transactionsOfMonth.reduce(
    (acc, cur) =>
      cur.category === category && cur.amount < 0 ? cur.amount + acc : acc,
    0,
  );

  const totalProgress =
    (Math.abs(totalBudgetedSpendingOfMonth) / maximum) * 100;

  useEffect(() => {
    setProgress(totalProgress);
  }, [totalProgress]);

  const remaining =
    maximum - Math.abs(totalBudgetedSpendingOfMonth) >= 0
      ? (maximum - Math.abs(totalBudgetedSpendingOfMonth)).toFixed(2)
      : 0;

  const threeLatestSpendingBudgetedTransactions = allTransactions
    .filter(
      (transaction) =>
        transaction.category === category && transaction.amount < 0,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, TRANSACTIONS_LIMIT);

  const usedColor = budgets.map((bu) => bu.theme);
  const usedCategories = budgets.map((bu) => bu.category);

  return (
    <div className="relative flex flex-col gap-250 rounded-xl bg-white px-250 py-300">
      <Modal>
        <Modal.Window name="edit-budget">
          <EditBudgetForm
            usedColor={usedColor}
            budget={budget}
            usedCategories={usedCategories}
          />
        </Modal.Window>
        <Modal.Window name="delete-budget">
          <DeleteBudgetForm budget={budget} />
        </Modal.Window>
        {budgetDropdown && (
          <div ref={ref} className="absolute top-15 right-5">
            <DropdownMenu
              items={[
                {
                  label: "Edit Budget",
                  onClick: () => setBudgetDropdown(false),
                  open: "edit-budget",
                },
                {
                  label: "Delete Budget",
                  onClick: () => setBudgetDropdown(false),
                  variant: "danger",
                  open: "delete-budget",
                },
              ]}
            />
          </div>
        )}
        <div className="flex items-center gap-200">
          <div
            style={{
              backgroundColor: theme,
            }}
            className="h-200 w-200 rounded-full"
          ></div>
          <p className="text-preset-2 text-grey-900">{category}</p>
          <IoEllipsisHorizontalOutline
            role="button"
            onClick={() => setBudgetDropdown(true)}
            className="text-grey-300 ml-auto cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-200">
          <div className="flex flex-col gap-200">
            <p className="text-preset-4 text-grey-500">
              Maximum of ${maximum.toFixed(2)}
            </p>
          </div>
          <div className="bg-beige-100 h-400 rounded-sm p-50">
            <div
              style={{
                backgroundColor: theme,
                width: `${progress}%`,
              }}
              className="h-full max-w-full rounded-sm transition-all duration-500 ease-out"
            ></div>
          </div>
          <div className="flex gap-200">
            <div className="flex flex-1 gap-200">
              <div
                style={{
                  backgroundColor: theme,
                }}
                className="w-50 rounded-lg"
              ></div>
              <div className="flex flex-col gap-50">
                <p className="text-preset-5 text-grey-500">Spent</p>
                <p className="text-preset-4-bold text-grey-900">
                  ${Math.abs(totalBudgetedSpendingOfMonth).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex flex-1 gap-200">
              <div className="bg-beige-100 w-50 rounded-lg"></div>
              <div className="flex flex-col gap-50">
                <p className="text-preset-5 text-grey-500">Remaining</p>
                <p className="text-preset-4-bold text-grey-900">${remaining}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-beige-100 flex flex-col gap-250 rounded-xl p-200">
          <div className="flex items-center justify-between">
            <p className="text-preset-3 text-grey-900 flex">Latest Spending</p>
            <Link
              href={`/transactions?category=${budget.category}`}
              className="flex items-center gap-150"
            >
              <p className="text-preset-4 text-grey-500">See All</p>
              <IoMdArrowDropright className="fill-grey-500" />
            </Link>
          </div>
          <div className="flex flex-col gap-150">
            {threeLatestSpendingBudgetedTransactions.map((transaction, i) => (
              <React.Fragment key={transaction._id}>
                <div className="flex items-center gap-200">
                  <Image
                    className="rounded-full"
                    src={`/${transaction.avatar.replace("./", "")}`}
                    width={32}
                    height={32}
                    alt="avatar"
                  />
                  <p className="text-preset-5-bold text-grey-900">
                    {transaction.name}
                  </p>
                  <div className="ml-auto flex flex-col items-end gap-50">
                    <p className="text-preset-5-bold text-grey-900">
                      {transaction.amount < 0
                        ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                        : `$${Math.abs(transaction.amount).toFixed(2)}`}
                    </p>
                    <p className="text-preset-5 text-grey-500">
                      {format(new Date(transaction.date), "d MMM yyyy")}
                    </p>
                  </div>
                </div>
                {threeLatestSpendingBudgetedTransactions.length > i + 1 && (
                  <hr className="text-grey-300"></hr>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BudgetContainer;
