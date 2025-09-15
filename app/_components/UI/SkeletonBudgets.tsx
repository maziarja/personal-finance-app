import Skeleton from "react-loading-skeleton";
import Sidebar from "../Sidebar";
import OpenSidebar from "../transactions/OpenSidebar";
import SidebarGridWrapper from "./SidebarGridWrapper";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonBudgets() {
  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <div className="space-y-400">
          <div className="flex items-center justify-between">
            <Skeleton width={128} height={35} />

            <Skeleton width={154} height={50} />
          </div>
          <div className="space-y-400 lg:grid lg:grid-cols-2 lg:gap-300">
            <div className="flex flex-col justify-center gap-400 rounded-xl bg-white px-250 py-300 md:grid md:grid-cols-2 lg:flex lg:self-start">
              <div className="mx-auto flex gap-100">
                <Skeleton width={240} height={240} borderRadius={1000} />
              </div>
              <div className="space-y-300">
                <Skeleton width={200} height={20} />
                <div className="flex flex-col gap-200">
                  {Array.from({ length: 6 }, (_, i) => (
                    <Skeleton key={i} width={305} height={22} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-300">
              <div className="overflow-x-hidden sm:hidden">
                <Skeleton width={334} height={200} borderRadius={12} />
              </div>
              <div className="hidden overflow-x-hidden sm:block">
                <Skeleton width={714} height={486} borderRadius={12} />
              </div>
              <div className="hidden overflow-x-hidden sm:block">
                <Skeleton width={714} height={486} borderRadius={12} />
              </div>
            </div>
          </div>
        </div>

        <OpenSidebar />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default SkeletonBudgets;
