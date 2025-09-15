import FilterTransactions from "./FilterTransactions";
import { Suspense } from "react";
import TransactionsList from "./TransactionsList";
import SkeletonTransactionList from "../UI/SkeletonTransactionList";

type TransactionsPageProps = {
  currentPage: number;
  currentCategory: string;
  currentSortBy: string;
  currentQuery: string;
};

async function TransactionsPage({
  currentPage,
  currentCategory,
  currentSortBy,
  currentQuery,
}: TransactionsPageProps) {
  return (
    <div className="flex flex-col gap-300 rounded-xl bg-white px-250 py-300 md:px-400 md:py-400">
      <FilterTransactions />

      <Suspense
        key={`${currentPage}-${currentCategory}-${currentSortBy}-${currentQuery}`}
        fallback={<SkeletonTransactionList />}
      >
        <TransactionsList
          currentPage={currentPage}
          currentCategory={currentCategory}
          currentSortBy={currentSortBy}
          currentQuery={currentQuery}
        />
      </Suspense>
    </div>
  );
}

export default TransactionsPage;
