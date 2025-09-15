import { BudgetType } from "@/models/Budget";

type SpendingSummaryProps = {
  budget: BudgetType;
  budgetedSpendingOfMonth: number;
  numOfBudgets: number;
  index: number;
};

function SpendingSummaryPerBudget({
  budget,
  budgetedSpendingOfMonth,
  numOfBudgets,
  index,
}: SpendingSummaryProps) {
  return (
    <>
      <div className="flex justify-between">
        <div
          style={{
            borderColor: budget.theme,
          }}
          className={`flex items-center border-l-4 pl-200`}
        >
          <p className="text-preset-4 text-grey-500">{budget.category}</p>
        </div>
        <div>
          <p className="text-preset-3 text-grey-900">
            ${Math.abs(budgetedSpendingOfMonth).toFixed(2)}
            <span className="text-preset-5 text-grey-500 ml-100">
              of {budget.maximum.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      {index < numOfBudgets - 1 && (
        <div className="text-grey-100 border-b-1"></div>
      )}
    </>
  );
}

export default SpendingSummaryPerBudget;
