import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonOverviewPots() {
  return (
    <div className="flex flex-col gap-250 rounded-xl bg-white px-250 py-300">
      <div className="flex items-center justify-between">
        <Skeleton width={42} height={24} />
        <div className="flex cursor-pointer items-center gap-150">
          <Skeleton height={21} width={101} />
        </div>
      </div>
      <div className="flex flex-col gap-250">
        <div className="bg-beige-100 flex items-center gap-200 rounded-xl p-200">
          <Skeleton width={30} height={30} />
          <div className="flex flex-col gap-[11px]">
            <Skeleton width={85} height={20} />
            <Skeleton width={87} height={35} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-200">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((i) => (
            <Skeleton key={i} width={143} height={40} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonOverviewPots;
