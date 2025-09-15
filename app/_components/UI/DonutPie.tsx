import { BudgetType } from "@/models/Budget";

type DonutPieProps = {
  totalBudgetedSpendingOfMOnth: number;
  budgets: BudgetType[];
};

function DonutPie({ totalBudgetedSpendingOfMOnth, budgets }: DonutPieProps) {
  const totalBudget = budgets.reduce((acc, cur) => acc + cur.maximum, 0);
  const budgetPercent = budgets.map((bu) => (bu.maximum / totalBudget) * 100);
  function from(n: number, array: number[]) {
    const numOfN = Array.from({ length: n }, (_, i) => i);
    const numbers = numOfN.map((_, i) => array[i]);
    return numbers.reduce((acc, cur) => cur + acc, 0);
  }
  /////////////////////
  function to(n: number, array: number[]) {
    const numOfN = Array.from({ length: n + 1 }, (_, i) => i);
    const numbers = numOfN.map((_, i) => array[i]);
    return numbers.reduce((acc, cur) => cur + acc, 0);
  }

  return (
    <div
      style={{
        background: `conic-gradient(${budgets.map((bu, i) => `${bu.theme} ${from(i, budgetPercent)}% ${to(i, budgetPercent)}% `)})`,
      }}
      className="relative flex h-60 w-60 items-center justify-center rounded-full before:absolute before:inset-[17%] before:z-10 before:rounded-full before:bg-white before:content-[''] after:absolute after:inset-[11%] after:rounded-full after:bg-white after:opacity-25 after:content-['']"
    >
      <p className="text-preset-1 text-grey-900 relative z-10 flex flex-col items-center justify-center gap-100">
        ${Math.abs(totalBudgetedSpendingOfMOnth).toLocaleString()}
        <span className="text-preset-5 text-grey-500">
          of ${totalBudget.toLocaleString()} limit
        </span>
      </p>
    </div>
  );
}

export default DonutPie;
