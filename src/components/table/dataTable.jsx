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
        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="min-w-full table-auto border-collapse">
                    {/* Header */}
                    <thead className="bg-green-600 sticky top-0 z-10">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-left text-sm font-semibold text-white tracking-wide whitespace-nowrap"
                                >
                                    {column.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={`transition-colors duration-150 hover:bg-green-50 ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    {columns.map((column, colIndex) => {
                                        const value = getNestedValue(row, column.accessor);

                                        return (
                                            <td
                                                key={colIndex}
                                                className="px-4 py-3 max-w-80 text-sm text-gray-700 text-start whitespace-now border border-gray-200 "
                                            >
                                                {column.Cell
                                                    ? column.Cell({
                                                        value,
                                                        row: { original: row },
                                                    })
                                                    : value && typeof value === "object"
                                                        ? JSON.stringify(value)
                                                        : value ?? <span className="text-gray-400">N/A</span>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-10 text-center text-gray-500 border border-gray-200"
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-gray-200 bg-gray-50">
                {/* Info */}
                <div className="text-sm text-gray-600">
                    Page <span className="font-semibold">{page}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={firstPage}
                        disabled={page === 1}
                        className="w-10 h-10 flex items-center justify-center rounded text-white bg-green-600
                         transition disabled:opacity-40 cursor-pointer"
                    >
                        <MdKeyboardDoubleArrowLeft className="text-xl" />
                    </button>

                    <button
                        onClick={prevPage}
                        disabled={page === 1}
                        className="w-10 h-10 flex items-center justify-center rounded text-white bg-green-600
                         transition disabled:opacity-40 cursor-pointer"
                    >
                        <MdKeyboardArrowLeft className="text-xl" />
                    </button>

                    <div className="w-24">
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
                            className="w-full h-10 rounded-lg border border-gray-300 text-center text-sm focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={() => nextPage(totalPages)}
                        disabled={page === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded text-white bg-green-600 transition disabled:opacity-40 cursor-pointer"
                    >
                        <MdKeyboardArrowRight className="text-xl" />
                    </button>

                    <button
                        onClick={() => lastPage(totalPages)}
                        disabled={page === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded text-white bg-green-600 transition disabled:opacity-40 cursor-pointer"
                    >
                        <MdKeyboardDoubleArrowRight className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;