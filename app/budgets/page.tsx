import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import SidebarGridWrapper from "../_components/UI/SidebarGridWrapper";
import OpenSidebar from "../_components/transactions/OpenSidebar";
import Sidebar from "../_components/Sidebar";
import BudgetsPage from "../_components/budgets/BudgetsPage";
import { getBudgets } from "../_actions/budgets/getBudgets";
import { getAllTransactions } from "../_actions/transactions/getAllTransactions";
import SpendingSummary from "../_components/budgets/SpendingSummary";
import {
  TRANSACTION_PERIOD_END,
  TRANSACTION_PERIOD_START,
} from "@/config/constants";
import { isAfter, isBefore } from "date-fns";

export const metadata = {
  title: "Budgets",
};

async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [allTransactions, budgets] = await Promise.all([
    getAllTransactions(),
    getBudgets(),
  ]);

  const transactionsOfMonth = allTransactions.filter(
    (transaction) =>
      isAfter(new Date(transaction.date), new Date(TRANSACTION_PERIOD_START)) &&
      isBefore(new Date(transaction.date), new Date(TRANSACTION_PERIOD_END)),
  );

  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <BudgetsPage
          allTransactions={allTransactions}
          budgets={budgets}
          transactionsOfMonth={transactionsOfMonth}
        >
          <SpendingSummary
            transactionsOfMonth={transactionsOfMonth}
            budgets={budgets}
          />
        </BudgetsPage>
        <OpenSidebar />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default Page;
