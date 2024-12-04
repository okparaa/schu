const Bulletins = () => {
  const bulletins = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      time: "2025-02-08",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet.",
      time: "2025-02-08",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet.",
      time: "2025-02-08",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
  ];
  return (
    <div className="bg-white p-2 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Bulletins</h1>
        <span className="text-sm text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {bulletins.map((item) => (
          <div key={item.id} className="rounded-md text-gray-600 p-2 border">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-sm">{item.title}</h1>
              <span className="text-xs to-gray-400 bg-white rounded-md p-1">
                {item.time}
              </span>
            </div>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bulletins;
