import { TRANSACTION_LIMIT_FOR_OVERVIEW } from "@/config/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function SkeletonOverviewTransactions() {
  return (
    <div className="flex flex-col gap-400 rounded-xl bg-white px-250 py-300">
      <div className="flex items-center justify-between">
        <Skeleton width={123} height={24} />
        <div className="flex cursor-pointer items-center gap-150">
          <Skeleton width={80} height={20} />
        </div>
      </div>
      <div className="flex flex-col gap-150">
        <div>
          <div>
            {Array.from({ length: TRANSACTION_LIMIT_FOR_OVERVIEW }).map(
              (_, i) => (
                <div key={i} className="flex flex-col gap-200">
                  <div className="flex items-center justify-between rounded-lg md:grid md:grid-cols-[2fr_0.5fr_0.5fr_1fr]">
                    <div className="flex items-center gap-150">
                      <Skeleton width={32} height={32} borderRadius={100} />
                      <div>
                        <p className="text-preset-4-bold text-grey-900">
                          <Skeleton width={120} height={21} />
                        </p>
                        <p className="text-preset-5 text-grey-500 md:hidden">
                          <Skeleton width={80} height={18} />
                        </p>
                      </div>
                    </div>
                    <p className="text-preset-5 text-grey-500 hidden justify-self-start md:block">
                      <Skeleton width={60} height={18} />
                    </p>
                    <p className="text-preset-5 text-grey-500 hidden justify-self-end md:block">
                      <Skeleton width={70} height={18} />
                    </p>
                    <div className="md:justify-self-end">
                      <p className="text-preset-4-bold text-grey-900">
                        <Skeleton width={70} height={21} />
                      </p>
                      <p className="text-preset-5 text-grey-500 md:hidden">
                        <Skeleton width={60} height={18} />
                      </p>
                    </div>
                  </div>

                  <hr className="text-grey-100 mb-200" />
                </div>
              ),
            )}
          </div>
          <div className="hidden items-center justify-between pt-14 md:flex">
            <Skeleton width={95} height={40} />

            <Skeleton width={95} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonOverviewTransactions;
