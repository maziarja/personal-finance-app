import { getTransactionsOverviewPage } from "@/app/_actions/transactions/getTransactionsOverviewPage";
import SingleTransaction from "../transactions/SingleTransaction";

async function TransactionsContainer() {
  const transactions = await getTransactionsOverviewPage();

  return (
    <div className="flex flex-col gap-150">
      {transactions.map((transaction, i) => (
        <SingleTransaction
          key={transaction._id}
          transaction={transaction}
          index={i}
          totalTransactions={transactions.length}
          isOverviewPage={true}
        />
      ))}
    </div>
  );
}

export default TransactionsContainer;
