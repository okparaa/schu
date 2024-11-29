import { ReactNode } from "react";

type TableProps = {
  columns: { header: string; accessor: string; className?: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderRow: (item: any) => ReactNode;
  data: unknown[];
};
const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left font-bold text-sm bg-slate-50 text-gray-800">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`${col.className} py-2 border-y border-gray-200`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
