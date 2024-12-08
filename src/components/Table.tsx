import { ReactNode } from "react";

type TableProps = {
  columns: {
    header: string;
    accessor: string;
    className?: string;
    width?: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderRow: (item: any) => ReactNode;
  data: unknown[];
};
const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-md">
      <table className="w-full mt-4 border-collapse table-fixed">
        <thead>
          <tr className="text-left font-bold text-sm bg-slate-50 text-gray-800">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`${col.className} py-2 border-y border-gray-400`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
};

export default Table;
