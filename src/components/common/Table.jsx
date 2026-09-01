const Table = ({
  columns = [],
  data = [],
  rowKey,
  onRowClick,
  getRowClassName = () => "",
  emptyState = null,
  className = "",
}) => {
  if (!data.length) {
    return (
      emptyState || (
        <div className="flex min-h-60 items-center justify-center px-6">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              No data found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no records to display.
            </p>
          </div>
        </div>
      )
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="max-h-[calc(100vh-360px)] overflow-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    whitespace-nowrap
                    px-6 py-4
                    text-xs font-semibold uppercase tracking-wide
                    text-slate-500
                    ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                          ? "text-center"
                          : "text-left"
                    }
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row, index) => {
              const rowClassName = getRowClassName(row, index);

              console.log(row,"rowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")

              return (
                <tr
                  key={
                    typeof rowKey === "function"
                      ? rowKey(row, index)
                      : (row[rowKey] ?? index)
                  }
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`
                    transition
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${rowClassName || "hover:bg-slate-50"}
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-6 py-4
                        ${
                          column.align === "right"
                            ? "text-right"
                            : column.align === "center"
                              ? "text-center"
                              : "text-left"
                        }
                      `}
                    >
                      {column.render
                        ? column.render(row, index)
                        : (row[column.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
