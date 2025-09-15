import { auth } from "@/config/auth";
import Sidebar from "../_components/Sidebar";
import OpenSidebar from "../_components/transactions/OpenSidebar";
import SidebarGridWrapper from "../_components/UI/SidebarGridWrapper";
import { redirect } from "next/navigation";
import RecurringPage from "../_components/recurring/RecurringPage";
import { getRecurringBills } from "../_actions/recurringBills/getRecurringBills";

export const metadata = {
  title: "Recurring-Bills",
};

type PageProps = {
  searchParams: {
    query?: string;
    sortBy?: string;
  };
};

async function Page({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { query, sortBy } = await searchParams;

  const { alreadyPaidBills, dueSoonBills, upcomingBills } =
    await getRecurringBills(query || "");

  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2 lg:px-100 @[1144px]:px-500">
        <OpenSidebar />
        <RecurringPage
          alreadyPaidBills={alreadyPaidBills}
          dueSoonBills={dueSoonBills}
          upcomingBills={upcomingBills}
          sortBy={sortBy || "Latest"}
        />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default Page;
