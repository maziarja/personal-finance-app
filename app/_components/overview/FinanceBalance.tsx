import { getFinance } from "@/app/_actions/finance/getFinance";
import { formattedNum } from "@/app/_lib/formattedNum";

async function FinanceBalance() {
  const finance = await getFinance();
  const { current, expenses, income } = finance.balance;

  return (
    <div className="flex flex-col gap-150 md:flex-row md:gap-300">
      <div className="bg-grey-900 flex flex-1 flex-col gap-150 rounded-xl p-250">
        <p className="text-preset-4 text-white">Current Balance</p>
        <p className="text-preset-1 text-white">${formattedNum(current)}</p>
      </div>
      <div className="flex flex-1 flex-col gap-150 rounded-xl bg-white p-250">
        <p className="text-preset-4 text-grey-500">Income</p>
        <p className="text-preset-1 text-grey-900">${formattedNum(income)}</p>
      </div>
      <div className="flex flex-1 flex-col gap-150 rounded-xl bg-white p-250">
        <p className="text-preset-4 text-grey-500">Expenses</p>
        <p className="text-preset-1 text-grey-900">${formattedNum(expenses)}</p>
      </div>
    </div>
  );
}

export default FinanceBalance;
