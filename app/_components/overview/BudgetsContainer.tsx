import {
  TRANSACTION_PERIOD_END,
  TRANSACTION_PERIOD_START,
} from "@/config/constants";
import DonutPie from "../UI/DonutPie";
import { getAllTransactions } from "@/app/_actions/transactions/getAllTransactions";
import { getBudgets } from "@/app/_actions/budgets/getBudgets";
import { isAfter, isBefore } from "date-fns";

async function BudgetsContainer() {
  const [allTransactions, budgets] = await Promise.all([
    getAllTransactions(),
    getBudgets(),
  ]);

  const transactionsOfMonth = allTransactions.filter(
    (transaction) =>
      isAfter(new Date(transaction.date), new Date(TRANSACTION_PERIOD_START)) &&
      isBefore(new Date(transaction.date), new Date(TRANSACTION_PERIOD_END)),
  );

  const totalBudgetedSpendingOfMonth = transactionsOfMonth.reduce(
    (acc, cur) => {
      return cur.amount < 0 &&
        budgets.some((bu) => bu.category === cur.category)
        ? acc + cur.amount
        : acc;
    },
    0,
  );
  return (
    <div className="flex flex-col gap-200 py-100 md:flex-row">
      <div className="mx-auto flex gap-100">
        <DonutPie
          totalBudgetedSpendingOfMOnth={totalBudgetedSpendingOfMonth}
          budgets={budgets}
        />
      </div>
      <div className="grid grid-cols-2 gap-200 md:grid-cols-1">
        {budgets.map((budget, i) => {
          const budgetedSpendingOfMonth = transactionsOfMonth.reduce(
            (acc, cur) =>
              cur.category === budget.category && cur.amount < 0
                ? cur.amount + acc
                : acc,
            0,
          );
          return (
            <div key={i} className="flex items-center gap-200">
              <div
                style={{
                  backgroundColor: budget.theme,
                }}
                className="h-full w-50 rounded-lg"
              ></div>
              <div className="flex flex-col gap-50">
                <p className="text-preset-5 text-grey-500">{budget.category}</p>
                <p className="text-preset-4-bold text-grey-900">
                  ${Math.abs(budgetedSpendingOfMonth).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetsContainer;
