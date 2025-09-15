import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SidebarGridWrapper from "./SidebarGridWrapper";
import OpenSidebar from "../transactions/OpenSidebar";
import Sidebar from "../Sidebar";
import React from "react";

function SkeletonRecurringBills() {
  return (
    <SidebarGridWrapper>
      <div className="flex flex-col gap-400 px-200 py-300 md:px-500 md:py-400 lg:col-start-2 lg:px-100 @[1144px]:px-500">
        <OpenSidebar />
        <div className="space-y-400">
          <div className="py-100">
            <Skeleton width={250} height={38} />
          </div>
          <div className="@container flex flex-col gap-300 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.08fr)]">
            <div className="flex flex-col gap-150 md:grid md:grid-cols-2 md:gap-300 lg:flex">
              <Skeleton height={110} />
              <div className="flex flex-col gap-250 rounded-xl bg-white p-250">
                <Skeleton height={24} />
                <div className="flex flex-col gap-200">
                  <div className="flex items-center justify-between gap-200">
                    <Skeleton height={18} width={90} />
                    <Skeleton height={18} width={90} />
                  </div>
                  <hr className="text-grey-500/15" />
                  <div className="flex items-center justify-between gap-200">
                    <Skeleton height={18} width={90} />
                    <Skeleton height={18} width={90} />
                  </div>
                  <hr className="text-grey-500/15" />
                  <div className="flex items-center justify-between gap-200">
                    <Skeleton height={18} width={90} />
                    <Skeleton height={18} width={90} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-300 rounded-xl bg-white px-250 py-300">
              <Skeleton height={45} />
              <div className="flex flex-col gap-250">
                {Array.from({ length: 8 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="@container flex flex-col gap-100 rounded-lg md:flex-row md:items-center md:gap-400">
                      <div className="flex items-center gap-200 md:flex-1/5 lg:@[422px]:flex-1 lg:@[460px]:flex-1/5">
                        <Skeleton width={32} height={32} borderRadius={1000} />
                        <Skeleton width={160} height={20} />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-100">
                          <Skeleton width={100} height={18} />
                        </div>
                        <Skeleton width={55} height={20} />
                      </div>
                    </div>
                    <hr className="text-grey-100" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </SidebarGridWrapper>
  );
}

export default SkeletonRecurringBills;
