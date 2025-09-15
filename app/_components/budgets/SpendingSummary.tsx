import { TransactionType } from "@/models/Transaction";
import DonutPie from "../UI/DonutPie";
import SpendingSummaryPerBudget from "./SpendingSummaryPerBudget";
import { BudgetType } from "@/models/Budget";

type SpendingSummaryProps = {
  transactionsOfMonth: TransactionType[];
  budgets: BudgetType[];
};

function SpendingSummary({
  transactionsOfMonth,
  budgets,
}: SpendingSummaryProps) {
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
    <div className="flex flex-col justify-center gap-400 rounded-xl bg-white px-250 py-300 md:grid md:grid-cols-2 lg:flex lg:self-start">
      <div className="mx-auto flex gap-100">
        <DonutPie
          totalBudgetedSpendingOfMOnth={totalBudgetedSpendingOfMonth}
          budgets={budgets}
        />
      </div>
      <div className="space-y-300">
        <p className="text-preset-2 text-grey-900">Spending Summary</p>
        <div className="flex flex-col gap-200">
          {budgets.map((bu, i) => {
            const budgetedSpendingOfMonth = transactionsOfMonth.reduce(
              (acc, cur) =>
                cur.category === bu.category && cur.amount < 0
                  ? cur.amount + acc
                  : acc,
              0,
            );
            return (
              <SpendingSummaryPerBudget
                key={bu._id}
                budget={bu}
                budgetedSpendingOfMonth={budgetedSpendingOfMonth}
                numOfBudgets={budgets.length}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SpendingSummary;
