const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-lg p-3 flex-1 min-w-[130px] border-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-blue-50 px-2 py-1 rounded-full text-purple-800 font-extrabold">
          2024/25
        </span>
        <i className="icon-dot-3"></i>
      </div>
      <h1 className="text-xl font-semibold my-1">1,200</h1>
      <h2 className="capitalize text-sm font-medium text-stone-800">{type}</h2>
    </div>
  );
};

export default UserCard;
