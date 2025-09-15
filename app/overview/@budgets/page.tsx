import BudgetsContainer from "@/app/_components/overview/BudgetsContainer";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

function page() {
  return (
    <div className="flex flex-col gap-250 rounded-xl bg-white px-250 py-300 md:px-400 md:py-400">
      <div className="flex items-center justify-between">
        <p className="text-preset-2 text-grey-900">Budgets</p>
        <Link
          href={"/budgets"}
          className="flex cursor-pointer items-center gap-150"
        >
          <p className="text-preset-4 text-grey-500">See Details</p>
          <IoMdArrowDropright className="fill-grey-500" />
        </Link>
      </div>
      <BudgetsContainer />
    </div>
  );
}

export default page;
