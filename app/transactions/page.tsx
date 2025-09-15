import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import TransactionsPage from "../_components/transactions/TransactionsPage";
import { TransactionType } from "@/models/Transaction";
import Sidebar from "../_components/Sidebar";
import SidebarGridWrapper from "../_components/UI/SidebarGridWrapper";
import OpenSidebar from "../_components/transactions/OpenSidebar";

export const metadata = {
  title: "Transactions",
};

type Category = TransactionType["category"];

type PageProps = {
  searchParams: {
    page: string;
    category: Category;
    sortBy: string;
    query: string;
  };
};

async function Page({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { page, category, sortBy, query } = await searchParams;

  const currentPage = Number(page) || 1;
  const currentCategory = category || "All Transactions";
  const currentSortBy = sortBy || "Latest";
  const currentQuery = query || "";
  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <h1 className="text-preset-1 text-grey-900 py-100">Transactions</h1>
        <TransactionsPage
          currentPage={currentPage}
          currentCategory={currentCategory}
          currentSortBy={currentSortBy}
          currentQuery={currentQuery}
        />
        <OpenSidebar />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default Page;
