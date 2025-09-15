import { getTransactions } from "@/app/_actions/transactions/getTransactions";
import SingleTransaction from "./SingleTransaction";
import Pagination from "./Pagination";
import { PAGE_SIZE } from "@/config/constants";

type Props = {
  currentPage: number;
  currentCategory: string;
  currentSortBy: string;
  currentQuery: string;
};

export default async function TransactionsList({
  currentPage,
  currentCategory,
  currentSortBy,
  currentQuery,
}: Props) {
  const { transactions, numOfTransactions } = await getTransactions(
    currentPage,
    currentCategory,
    currentSortBy,
    currentQuery,
  );

  return (
    <>
      <div>
        <div className="border-grey-100 mb-300 hidden border-b-1 py-150 md:grid md:grid-cols-[2fr_0.5fr_0.5fr_1fr]">
          <p className="text-preset-5 text-grey-500">Recipient / Sender</p>
          <p className="text-preset-5 text-grey-500 justify-self-start">
            Category
          </p>
          <p className="text-preset-5 text-grey-500 justify-self-end">
            Transaction Date
          </p>
          <p className="text-preset-5 text-grey-500 justify-self-end">Amount</p>
        </div>
        {transactions.map((transaction, i) => (
          <SingleTransaction
            key={transaction._id}
            totalTransactions={transactions.length}
            transaction={transaction}
            index={i}
          />
        ))}
      </div>

      {numOfTransactions > PAGE_SIZE && (
        <Pagination numOfTransactions={numOfTransactions} />
      )}
    </>
  );
}
