import { formattedNum } from "@/app/_lib/formattedNum";
import { TransactionType } from "@/models/Transaction";
import { format } from "date-fns";
import Image from "next/image";

type SingleTransactionProps = {
  transaction: TransactionType;
  index: number;
  totalTransactions: number;
  isOverviewPage?: boolean;
};

function SingleTransaction({
  transaction,
  index,
  totalTransactions,
  isOverviewPage = false,
}: SingleTransactionProps) {
  const { amount, avatar, category, date, name } = transaction;
  return (
    <div className="flex flex-col gap-200">
      <div
        className={`flex items-center justify-between rounded-lg md:grid ${!isOverviewPage ? "md:grid-cols-[2fr_0.5fr_0.5fr_1fr]" : "md:grid-cols-2"}`}
      >
        <div className="flex items-center gap-150">
          <Image
            src={`/${avatar.replace("./", "")}`}
            alt="logo"
            height={32}
            width={32}
            className="h-400 w-400 rounded-full md:h-500 md:w-500"
          />
          <div>
            <p className="text-preset-4-bold text-grey-900">{name}</p>
            {!isOverviewPage && (
              <p className="text-preset-5 text-grey-500 md:hidden">
                {category}
              </p>
            )}
          </div>
        </div>
        {!isOverviewPage && (
          <p className="text-preset-5 text-grey-500 hidden justify-self-start md:block">
            {category}
          </p>
        )}
        {!isOverviewPage && (
          <p className="text-preset-5 text-grey-500 hidden justify-self-end md:block">
            {format(date, "dd LLL yyyy")}
          </p>
        )}
        <div className="md:justify-self-end">
          <p className="text-preset-4-bold text-grey-900">
            {amount > 0
              ? `+$${formattedNum(amount)}`
              : `-$${formattedNum(Math.abs(amount))}`}
          </p>
          <p
            className={`text-preset-5 text-grey-500 ${!isOverviewPage ? "md:hidden" : "md:block"}`}
          >
            {format(date, "dd LLL yyyy")}
          </p>
        </div>
      </div>
      {index < totalTransactions - 1 && <hr className="text-grey-100 mb-200" />}
    </div>
  );
}

export default SingleTransaction;
