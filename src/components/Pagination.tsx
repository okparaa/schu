const Pagination = () => {
  return (
    <div className="p-4 flex justify-between items-center text-gray-50">
      <span className="icon-left-open i-btn"></span>
      <div className="flex justify-center items-center gap-1 flex-1">
        <span className="c-btn">1</span>
        <span className="c-btn">2</span>
        <span className="c-btn">3</span>
        <span className="c-btn">4</span>
      </div>
      <span className="icon-right-open i-btn"></span>
    </div>
  );
};

export default Pagination;
