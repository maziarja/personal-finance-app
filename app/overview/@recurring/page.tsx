import RecurringBillsContainerOverview from "@/app/_components/overview/RecurringBillsContainerOverview";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

function page() {
  return (
    <div className="flex flex-col gap-400 rounded-xl bg-white px-250 py-300 md:px-400 md:py-400 lg:flex-1">
      <div className="flex items-center justify-between">
        <p className="text-preset-2 text-grey-900">Recurring Bills</p>
        <Link
          href={"/recurring-bills"}
          className="flex cursor-pointer items-center gap-150"
        >
          <p className="text-preset-4 text-grey-500">See Details</p>
          <IoMdArrowDropright className="fill-grey-500" />
        </Link>
      </div>
      <RecurringBillsContainerOverview />
    </div>
  );
}

export default page;
