const TableSearch = () => {
  return (
    <div className="flex w-full md:w-auto md:flex items-center rounded-full text-sm ring-[1px] ring-gray-300 focus-within:ring-gray-400">
      <i className="icon-search text-gray-300 text-xl"></i>
      <input
        type="text"
        placeholder="Search..."
        className="w-[98%] bg-transparent p-1 outline-none overflow-hidden"
      />
    </div>
  );
};

export default TableSearch;
