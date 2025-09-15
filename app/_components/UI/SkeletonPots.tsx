import Sidebar from "../Sidebar";
import OpenSidebar from "../transactions/OpenSidebar";
import SidebarGridWrapper from "./SidebarGridWrapper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonPots() {
  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2">
        <div className="py-100">
          <div className="mb-400 flex items-center justify-between">
            <Skeleton width={68} height={33} />
            <Skeleton width={128} height={48} />
          </div>
          <div className="flex flex-col gap-300 overflow-y-scroll lg:grid lg:grid-cols-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="relative flex flex-col gap-400 rounded-xl bg-white px-250 py-300"
              >
                <div className="absolute top-15 right-5"></div>

                <div className="flex w-full items-center justify-between">
                  <Skeleton width={172} height={19} />
                  <Skeleton width={16} height={4} />
                </div>

                <div className="flex flex-col gap-200">
                  <Skeleton width={317} height={80} />
                </div>

                <div className="flex justify-between gap-200">
                  <Skeleton width={150} height={45} />
                  <Skeleton width={150} height={45} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <OpenSidebar />
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default SkeletonPots;
