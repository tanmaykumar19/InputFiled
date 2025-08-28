import React, { useState } from "react";
import clsx from "clsx";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Handle sort click
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    if (sortConfig?.key === column.dataIndex) {
      setSortConfig({ key: column.dataIndex, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    } else {
      setSortConfig({ key: column.dataIndex, direction: "asc" });
    }
  };

  // Handle row selection
  const toggleRowSelection = (index: number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      if (!selectable) return;
      newSelection.add(index);
    }
    setSelectedRows(newSelection);
    onRowSelect?.(Array.from(newSelection).map((i) => data[i]));
  };

  // Render table rows
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="px-4 py-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={clsx(
                  "px-4 py-2 text-left font-medium text-gray-700 cursor-pointer select-none",
                  col.sortable && "hover:text-blue-600"
                )}
              >
                {col.title}
                {sortConfig?.key === col.dataIndex && (
                  <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                className={clsx(
                  selectedRows.has(index) ? "bg-blue-50" : "hover:bg-gray-50",
                  "cursor-pointer"
                )}
                onClick={() => toggleRowSelection(index)}
              >
                {selectable && (
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      readOnly
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-gray-700">
                    {row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
