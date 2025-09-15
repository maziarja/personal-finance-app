"use client";

import { useModal } from "@/app/_contexts/modalContext";
import { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { PiSortAscendingFill } from "react-icons/pi";
import { TiArrowSortedDown } from "react-icons/ti";
import SortModal from "../transactions/SortModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function RecurringBillsFilter() {
  const [query, setQuery] = useState("");
  const { modal, toggleModal } = useModal();
  const searchParams = useSearchParams();
  const currentSortby = searchParams.get("sortBy") || "Latest";
  const router = useRouter();
  const pathname = usePathname();

  async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <>
      <div className="flex flex-1 items-center justify-between gap-250 lg:flex-0">
        <div className="ring-beige-500 flex w-full items-center rounded-lg bg-white px-250 py-150 ring-1 md:w-auto md:flex-1">
          <input
            placeholder="Search bills"
            type="text"
            id="queryBills"
            value={query}
            onChange={handleOnChange}
            className="text-preset-4 text-beige-500 w-full outline-none md:hidden"
          />
          <input
            placeholder="Search bills"
            type="text"
            id="transaction"
            value={query}
            onChange={handleOnChange}
            className="text-preset-4 text-beige-500 hidden outline-none md:block"
          />
          <IoIosSearch className="text-grey-900 md:ml-auto" />
        </div>
        <div className="relative flex flex-1">
          <PiSortAscendingFill
            role="button"
            onClick={() => toggleModal("sort", true)}
            className="text-grey-900 h-250 w-250 cursor-pointer md:hidden"
          />

          <div className="ml-auto hidden items-center gap-100 md:flex">
            <p className="text-preset-4 text-grey-500">Sort by</p>
            <button
              onClick={() => toggleModal("sort", true)}
              className="border-beige-500 flex cursor-pointer items-center gap-200 rounded-lg border-1 px-250 py-150"
            >
              <div className="text-preset-4 text-grey-900">{currentSortby}</div>
              <TiArrowSortedDown className="text-grey-900 h-200 w-200" />
            </button>
          </div>
          {modal.sort && <SortModal isTransitionPage={false} />}
        </div>
      </div>
      <div className="border-grey-100 @container hidden flex-row items-center gap-400 border-b-1 py-150 md:flex">
        <div className="flex flex-1/5 items-center gap-200 lg:@[422px]:flex-1 lg:@[460px]:flex-1/5">
          <p className="text-preset-5 text-grey-500">Bill Title</p>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <p className="text-preset-5 text-grey-500">Due Date</p>
          <p className="text-preset-5 text-grey-500">Amount</p>
        </div>
      </div>
    </>
  );
}

export default RecurringBillsFilter;
