import { auth } from "@/config/auth";
import PotsPage from "../_components/pots/PotsPage";
import Sidebar from "../_components/Sidebar";
import OpenSidebar from "../_components/transactions/OpenSidebar";
import SidebarGridWrapper from "../_components/UI/SidebarGridWrapper";
import { redirect } from "next/navigation";
import { getPots } from "../_actions/pots/getPots";

export const metadata = {
  title: "Pots",
};

async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const pots = await getPots();
  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <PotsPage pots={pots} />
        <OpenSidebar />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default Page;
