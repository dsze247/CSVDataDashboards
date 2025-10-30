import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./Data.css";

function Data(props) {
  const data = props.data;
  const columns = props.columns;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totRevenue = props.data.reduce(
    (acc, currRow) => acc + (Number(currRow.revenue || 0) || 0),
    0
  );

  const totQuantity = props.data.reduce(
    (acc, currRow) => acc + (Number(currRow.quantity || 0) || 0),
    0
  );

  return (
    <>
      {data.length > 0 && (
        <div className="dataSection">
          <table className="dataTable">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="statistics">
            <p className="value">{totRevenue}</p>
            <p className="label">Total Revenue</p>
            <p className="value">{totQuantity}</p>
            <p className="label">Total Quantity</p>
            <p className="value">{data.length}</p>
            <p className="label">Number of Transactions</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Data;
