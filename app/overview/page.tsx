import { Suspense } from "react";
import FinanceBalance from "../_components/overview/FinanceBalance";
import SkeletonOverviewFinance from "../_components/UI/SkeletonOverviewFinance";
import { signOutAction } from "../_actions/auth/signOut";
import { FiLogOut } from "react-icons/fi";

export const metadata = {
  title: "Home",
};

function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 text-grey-900 py-100">Overview</h1>
        <form action={signOutAction}>
          <button className="flex cursor-pointer items-center gap-100">
            <p className="text-preset-3 text-grey-900 hidden md:block">
              Logout
            </p>
            <FiLogOut className="text-grey-900 h-250 w-250" />
          </button>
        </form>
      </div>
      <Suspense fallback={<SkeletonOverviewFinance />}>
        <FinanceBalance />
      </Suspense>
    </>
  );
}

export default Page;
