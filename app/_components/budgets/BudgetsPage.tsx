"use client";

import { TransactionType } from "@/models/Transaction";
import Button from "../UI/Button";
import { BudgetType } from "@/models/Budget";
import React, { ReactNode } from "react";
import BudgetContainer from "./BudgetContainer";
import Modal from "../UI/Modal";
import AddNewBudgetForm from "./AddNewBudgetForm";

type BudgetsPageProps = {
  children: ReactNode;
  allTransactions: TransactionType[];
  transactionsOfMonth: TransactionType[];
  budgets: BudgetType[];
};

function BudgetsPage({
  children,
  allTransactions,
  transactionsOfMonth,
  budgets,
}: BudgetsPageProps) {
  const usedColor = budgets.map((bu) => bu.theme);

  return (
    <Modal>
      <div className="space-y-400">
        <div className="flex items-center justify-between">
          <h1 className="text-preset-1 text-grey-900">Budgets</h1>
          <Modal.Open open="new-budget">
            <Button>+ Add New Budget</Button>
          </Modal.Open>
          <Modal.Window name="new-budget">
            <AddNewBudgetForm usedColor={usedColor} budgets={budgets} />
          </Modal.Window>
        </div>
        <div className="space-y-400 lg:grid lg:grid-cols-2 lg:gap-300">
          {children}
          <div className="flex flex-col gap-300">
            {budgets.map((bu) => (
              <BudgetContainer
                key={bu._id}
                budget={bu}
                allTransactions={allTransactions}
                transactionsOfMonth={transactionsOfMonth}
                budgets={budgets}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BudgetsPage;
