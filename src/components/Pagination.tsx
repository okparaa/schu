"use client";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  total: number;
};
const Pagination = ({ page, total }: PaginationProps) => {
  const router = useRouter();
  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < total;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("pg", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex justify-between items-center text-gray-50">
      <button
        disabled={!hasPrev}
        className={`icon-left-open i-btn ${hasPrev ? "" : "!bg-stone-100"}`}
        onClick={() => hasPrev && changePage(page - 1)}
      ></button>
      <div className="flex justify-center items-center gap-1 flex-1">
        {Array.from({ length: Math.ceil(total / ITEMS_PER_PAGE) }, (_, idx) => {
          const pageIdx = idx + 1;
          return (
            <button
              key={pageIdx}
              className={`c-btn ${
                pageIdx === page ? "bg-white text-black" : ""
              }`}
              onClick={() => changePage(pageIdx)}
            >
              {pageIdx}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className={`icon-right-open i-btn ${hasNext ? "" : "!bg-stone-100"}`}
        onClick={() => hasNext && changePage(page + 1)}
      ></button>
    </div>
  );
};

export default Pagination;
