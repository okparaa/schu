"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const TableSearch = () => {
  const router = useRouter();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = (evt.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("sach", value);
      params.set("pg", "1");
    } else {
      params.delete("sach");
    }
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full md:w-auto md:flex items-center rounded-full text-sm ring-[1px] ring-gray-300 focus-within:ring-gray-400"
    >
      <i className="icon-search text-gray-300 text-xl"></i>
      <input
        type="text"
        placeholder="Search..."
        className="w-[98%] bg-transparent p-1 outline-none overflow-hidden"
      />
    </form>
  );
};

export default TableSearch;
