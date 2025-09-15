import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonOverviewBudgets() {
  return (
    <div className="flex flex-col gap-400 rounded-xl bg-white px-250 py-300">
      <div className="flex items-center justify-between">
        <Skeleton width={123} height={24} />
        <div className="flex cursor-pointer items-center gap-150">
          <Skeleton width={80} height={20} />
        </div>
      </div>
      <div className="flex flex-col gap-200 py-100">
        <div className="mx-auto flex gap-100">
          <Skeleton width={240} height={240} borderRadius={1000} />
        </div>
        <div className="grid grid-cols-2 gap-200">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((i) => (
            <Skeleton key={i} width={143} height={43} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonOverviewBudgets;
