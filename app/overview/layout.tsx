import { Public_Sans } from "next/font/google";
import OpenSidebar from "../_components/transactions/OpenSidebar";
import Sidebar from "../_components/Sidebar";
import SidebarGridWrapper from "../_components/UI/SidebarGridWrapper";
import OverviewLayoutWrapper from "../_components/UI/OverviewLayoutWrapper";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export default function OverviewLayout({
  children,
  pots,
  transactions,
  budgets,
  recurring,
}: Readonly<{
  children: React.ReactNode;
  pots: React.ReactNode;
  transactions: React.ReactNode;
  budgets: React.ReactNode;
  recurring: React.ReactNode;
}>) {
  return (
    <div className={`${publicSans.className} antialiased`}>
      <SidebarGridWrapper>
        {/*  make client wrapper here */}
        <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
          <OpenSidebar />
          {children}
          <div className="@container">
            <OverviewLayoutWrapper>
              <div className="flex flex-col gap-300 lg:flex-1">
                {pots}
                {transactions}
              </div>
              <div className="flex flex-col gap-300">
                {budgets}
                {recurring}
              </div>
            </OverviewLayoutWrapper>
          </div>
        </div>
        <Sidebar />
      </SidebarGridWrapper>
    </div>
  );
}
