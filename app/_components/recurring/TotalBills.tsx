import { formattedNum } from "@/app/_lib/formattedNum";
import RecurringIcon from "../UI/RecurringIcon";

function TotalBills({ totalBills }: { totalBills: number }) {
  return (
    <div className="bg-grey-900 flex items-center gap-300 rounded-xl p-250 md:flex-col md:items-start md:gap-400 md:p-300">
      <RecurringIcon className="h-500 w-500 stroke-white" />

      <div className="flex flex-col gap-[11px]">
        <p className="text-preset-4 text-white">Total bills</p>
        <p className="text-preset-1 text-white">${formattedNum(totalBills)}</p>
      </div>
    </div>
  );
}

export default TotalBills;
