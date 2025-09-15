import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonOverviewRecurringBills() {
  return (
    <div className="flex flex-col gap-400 rounded-xl bg-white px-250 py-300">
      <div className="flex items-center justify-between">
        <Skeleton width={141} height={24} />
        <Skeleton width={100} height={20} />
      </div>
      <div className="flex flex-col gap-150">
        <div className="bg-beige-100 flex items-center justify-between rounded-lg px-200 py-250">
          <Skeleton width={100} height={20} />
          <p className="text-preset-4-bold text-grey-900">
            <Skeleton width={60} height={20} />
          </p>
        </div>
        <div className="bg-beige-100 flex items-center justify-between rounded-lg px-200 py-250">
          <Skeleton width={100} height={20} />
          <p className="text-preset-4-bold text-grey-900">
            <Skeleton width={60} height={20} />
          </p>
        </div>
        <div className="bg-beige-100 flex items-center justify-between rounded-lg px-200 py-250">
          <Skeleton width={100} height={20} />
          <p className="text-preset-4-bold text-grey-900">
            <Skeleton width={60} height={20} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default SkeletonOverviewRecurringBills;
