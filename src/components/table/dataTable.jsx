import React from "react";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const getNestedValue = (obj, path) => {
    if (!path) return undefined;
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const DataTable = ({
    columns = [],
    data = [],
    page = 1,
    totalPages = 1,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    pageInput,
    setPageInput,
    goToPage,
}) => {
    return (
        <div className="bg-white py-4 px-2 rounded shadow-sm">
            {/* Table */}
            <div className="border border-gray-300 rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-green-600">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-3 text-left font-bold text-white border-l border-gray-300 first:border-l-0"
                                    >
                                        {column.Header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={row.id || rowIndex} className="hover:bg-gray-50">
                                        {columns.map((column, colIndex) => {
                                            const value = getNestedValue(row, column.accessor);

                                            return (
                                                <td
                                                    key={colIndex}
                                                    className="px-2 py-2 border border-gray-300"
                                                >
                                                    {column.Cell
                                                        ? column.Cell({
                                                            value,
                                                            row: { original: row },
                                                        })
                                                        : value && typeof value === "object"
                                                            ? JSON.stringify(value)
                                                            : value ?? "N/A"}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 mt-6">
                <button
                    onClick={firstPage}
                    disabled={page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded bg-green-600 text-white disabled:opacity-50"
                >
                    <MdKeyboardDoubleArrowLeft className="text-xl" />
                </button>

                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded bg-green-600 text-white disabled:opacity-50"
                >
                    <MdKeyboardArrowLeft className="text-xl" />
                </button>

                <div className="w-24 border border-gray-300 rounded">
                    <input
                        type="number"
                        value={pageInput}
                        onChange={(e) => setPageInput?.(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                goToPage?.(Number(pageInput));
                            }
                        }}
                        placeholder={`${page}/${totalPages}`}
                        className="w-full py-2 px-2 text-center focus:outline-none"
                    />
                </div>

                <button
                    onClick={() => nextPage(totalPages)}
                    disabled={page === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded bg-green-600 text-white disabled:opacity-50"
                >
                    <MdKeyboardArrowRight className="text-xl" />
                </button>

                <button
                    onClick={() => lastPage(totalPages)}
                    disabled={page === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded bg-green-600 text-white disabled:opacity-50"
                >
                    <MdKeyboardDoubleArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default DataTable;