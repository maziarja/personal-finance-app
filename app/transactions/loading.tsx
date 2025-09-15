import Sidebar from "../_components/Sidebar";
import Skeleton from "react-loading-skeleton";
import SkeletonTransactionList from "../_components/UI/SkeletonTransactionList";

function loading() {
  return (
    <div className={`bg-beige-100 flex min-h-dvh flex-col lg:relative lg:grid`}>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <Skeleton width={160} height={30} />
        <div className="flex flex-col gap-300 rounded-xl bg-white px-250 py-300 md:px-400 md:py-400">
          <div className="flex items-center justify-between gap-300">
            <div className="flex items-center rounded-lg bg-white px-250 py-150 md:w-[25%]"></div>
          </div>
          <SkeletonTransactionList />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default loading;
