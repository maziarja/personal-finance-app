import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonOverviewFinance() {
  return (
    <div className="flex flex-col gap-150">
      <div className="flex flex-col gap-150 rounded-xl bg-white p-250">
        <Skeleton width={120} height={21} />
        <Skeleton width={160} height={33} />
      </div>

      <div className="flex flex-col gap-150 rounded-xl bg-white p-250">
        <Skeleton width={120} height={21} />
        <Skeleton width={160} height={33} />
      </div>
      <div className="flex flex-col gap-150 rounded-xl bg-white p-250">
        <Skeleton width={120} height={21} />
        <Skeleton width={160} height={33} />
      </div>
    </div>
  );
}

export default SkeletonOverviewFinance;
