"use client";

import { useModal } from "@/app/_contexts/modalContext";
import { ChangeEvent, useState } from "react";
import { HiFilter } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { PiSortAscendingFill } from "react-icons/pi";
import CategoryModal from "./CategoryModal";
import SortModal from "./SortModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TiArrowSortedDown } from "react-icons/ti";

function FilterTransactions() {
  const { modal, toggleModal } = useModal();
  const [query, setQuery] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "All Transactions";
  const currentSortby = searchParams.get("sortBy") || "Latest";

  async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-300">
      <div className="ring-beige-500 flex items-center rounded-lg bg-white px-250 py-150 ring-1 md:w-[25%]">
        <input
          placeholder="Search transactions"
          type="text"
          id="queryTransaction"
          value={query}
          onChange={handleOnChange}
          className="text-preset-4 text-beige-500 outline-none md:hidden"
        />
        <input
          placeholder="Search tran..."
          type="text"
          id="transaction"
          value={query}
          onChange={handleOnChange}
          className="text-preset-4 text-beige-500 hidden outline-none md:block md:w-[80%]"
        />
        <IoIosSearch className="text-grey-900 md:ml-auto" />
      </div>
      <div className="flex gap-300">
        <div className="relative">
          <PiSortAscendingFill
            role="button"
            onClick={() => toggleModal("sort", true)}
            className="text-grey-900 cursor-pointer text-[20px] md:hidden"
          />

          <div className="hidden items-center gap-100 md:flex">
            <p className="text-preset-4 text-grey-500">Sort by</p>
            <button
              onClick={() => toggleModal("sort", true)}
              className="border-beige-500 flex cursor-pointer items-center gap-200 rounded-lg border-1 px-250 py-150"
            >
              <div className="text-preset-4 text-grey-900">{currentSortby}</div>
              <TiArrowSortedDown className="text-grey-900 h-200 w-200" />
            </button>
          </div>
          {modal.sort && <SortModal />}
        </div>
        <div className="relative">
          <HiFilter
            role="button"
            onClick={() => toggleModal("category", true)}
            className="text-grey-900 cursor-pointer text-[20px] md:hidden"
          />
          <div className="hidden items-center gap-100 md:flex">
            <p className="text-preset-4 text-grey-500">Category</p>
            <button
              onClick={() => toggleModal("category", true)}
              className="border-beige-500 flex cursor-pointer items-center gap-200 rounded-lg border-1 px-250 py-150"
            >
              <div className="text-preset-4 text-grey-900">
                {currentCategory}
              </div>
              <TiArrowSortedDown className="text-grey-900 h-200 w-200" />
            </button>
          </div>
          {modal.category && <CategoryModal />}
        </div>
      </div>
    </div>
  );
}

export default FilterTransactions;
