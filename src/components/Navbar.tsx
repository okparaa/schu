const Navbar = () => {
  return (
    <div className="flex bg-white justify-end md:justify-between items-center p-4">
      <div className="hidden md:flex items-center rounded-full text-sm ring-[1px] ring-gray-300 w-[230px] focus-within:ring-gray-400">
        <i className="icon-search text-xl"></i>
        <input
          type="text"
          placeholder="Search..."
          className="w-[90%] bg-transparent p-1 outline-none"
        />
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className="flex items-center justify-center">
          <i className="icon-commenting-o text-xl"></i>
        </div>
        <div className="flex items-center justify-center relative">
          <i className="icon-megaphone text-xl"></i>
          <span className="absolute w-5 h-5 text-white -top-3 -right-2 flex items-center justify-center text-[10px] bg-purple-500 rounded-full">
            1
          </span>
        </div>
        <div className="flex flex-col w-auto ml-3">
          <span className="leading-3 font-medium text-sm text-right">
            Okpara Ifeanyi Ambrose
          </span>
          <span className="text-[12px] text-gray-600 text-right">Admin</span>
        </div>
        <i className="icon-user-o border rounded-full p-2 bg-slate-300"></i>
      </div>
    </div>
  );
};

export default Navbar;