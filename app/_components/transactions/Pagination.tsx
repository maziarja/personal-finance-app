"use client";

import { PAGE_SIZE } from "@/config/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

type PaginationProps = {
  numOfTransactions: number;
};
function Pagination({ numOfTransactions }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "All Transactions";
  const currentSortBy = searchParams.get("sortBy") || "Latest";
  const totalPages = Math.ceil(numOfTransactions / PAGE_SIZE);
  const totalPagesArr = Array.from({ length: totalPages }, (v, i) => i + 1);
  function getMobilePages(current: number, total: number): (number | string)[] {
    if (total <= 4) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 2) {
      return [1, 2, "…", total];
    }

    if (current >= total - 1) {
      return [1, "…", total - 1, total];
    }

    return ["…", current - 1, current, total];
  }
  const mobilePages = getMobilePages(currentPage, totalPages);
  return (
    <div className="flex items-center justify-between pt-300">
      <Link
        href={`/transactions?page=${currentPage > 1 ? currentPage - 1 : currentPage}&category=${currentCategory}&sortBy=${currentSortBy}`}
        className={`flex h-500 ${currentPage <= 1 && "pointer-events-none"} hover:bg-beige-500 group cursor-pointer items-center justify-center gap-200 rounded-lg bg-white p-200 ring-1 ${
          currentPage > 1 ? "ring-beige-500" : "ring-gray-300"
        }`}
      >
        <FaCaretLeft
          className={`text-base group-hover:text-white ${
            currentPage > 1 ? "text-grey-500" : "text-gray-300"
          }`}
        />
        <p className="text-preset-4 text-grey-900 hidden group-hover:text-white md:block">
          Prev
        </p>
      </Link>
      <div className="hidden items-center gap-100 sm:flex">
        {totalPagesArr.map((page) => {
          return (
            <Link
              href={`/transactions?page=${page}&category=${currentCategory}&sortBy=${currentSortBy}`}
              className={`ring-beige-500 text-preset-4 flex h-500 w-500 cursor-pointer items-center justify-center rounded-lg p-200 ring-1 ${currentPage === page ? "bg-grey-900 text-white" : "text-grey-900 hover:bg-beige-500 bg-white hover:text-white"}`}
              key={page}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-100 sm:hidden">
        {mobilePages.map((page, i) =>
          typeof page === "number" ? (
            <Link
              key={i}
              href={`/transactions?page=${page}&category=${currentCategory}&sortBy=${currentSortBy}`}
              className={`flex h-500 w-500 items-center justify-center rounded-lg p-200 ring-1 ${
                page === currentPage
                  ? "bg-grey-900 text-white"
                  : "text-grey-900 hover:bg-beige-500 bg-white hover:text-white"
              }`}
            >
              {page}
            </Link>
          ) : (
            <div
              key={i}
              className="text-grey-900 flex h-500 w-500 items-center justify-center rounded-lg bg-white ring-1"
            >
              …
            </div>
          ),
        )}
      </div>

      <Link
        href={`/transactions?page=${currentPage < totalPages ? currentPage + 1 : currentPage}&category=${currentCategory}&sortBy=${currentSortBy}`}
        className={`${currentPage >= totalPages && "pointer-events-none"} hover:bg-beige-500 group flex h-500 cursor-pointer items-center justify-center gap-200 rounded-lg bg-white p-200 ring-1 ${
          currentPage < totalPages ? "ring-beige-500" : "ring-gray-300"
        }`}
      >
        <p className="text-preset-4 text-grey-900 hidden group-hover:text-white md:block">
          Next
        </p>
        <FaCaretRight
          className={`text-base group-hover:text-white ${
            currentPage < totalPages ? "text-grey-500" : "text-gray-300"
          }`}
        />
      </Link>
    </div>
  );
}

export default Pagination;
