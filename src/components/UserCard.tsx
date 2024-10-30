const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-woksBlueLght even:bg-woksYellow p-3 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 font-extrabold">
          2024/25
        </span>
        <i className="icon-dot-3"></i>
      </div>
      <h1 className="text-xl font-semibold my-1">1,200</h1>
      <h2 className="capitalize text-sm font-medium text-stone-100">{type}</h2>
    </div>
  );
};

export default UserCard;
