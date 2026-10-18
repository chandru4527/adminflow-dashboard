import React, { useEffect, useState } from "react";
import {
    MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight
} from "react-icons/md";

import Input from "../forms/Input";
import Button from "../Button";
import Select from "../forms/Select";
import EmptyState from '../EmptyState';
import theme from "../../theme/theme";

const getNestedValue = (obj, path) => {
    if (!path) return obj;
    return path.split(".").reduce((value, key) => value?.[key], obj);
};

const Table = ({
    columns = [],
    data = [],
    pagination = true,
    page = 1,
    pageSize = 10,
    total,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
    loading = false,
    loadingRows = 4,
    emptyMessage = <EmptyState variant="minimal" title="no data" size="sm" />,
    rowKey = "id",
    onRowClick,
    getRowClassName,
    serialNumberHeader = "S.No",
    bordered = true,
    striped = true,
    hoverable = true,
    className = "",
    tableClassName = "",
    wrapperClassName = "",
}) => {
    const isServerSide = total !== undefined;
    const [pageInput, setPageInput] = useState(String(page));
    const safePageSize = Math.max(Number(pageSize) || 10, 1);
    const totalResults = isServerSide ? Number(total ?? data.length) : data.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / safePageSize));
    const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

    useEffect(() => {
        setPageInput(String(currentPage));
    }, [currentPage]);

    const paginatedData = isServerSide ? data : data.slice((currentPage - 1) * safePageSize, currentPage * safePageSize);

    const handlePageChange = (nextPage) => {
        const validPage = Math.min(Math.max(Number(nextPage) || 1, 1), totalPages);
        setPageInput(String(validPage));
        onPageChange?.(validPage);
    };

    const handlePageInputChange = (event) => {
        const value = event.target.value;
        if (value === "") {
            setPageInput("");
            return;
        }
        if (/^\d+$/.test(value)) setPageInput(value);
    };

    const handlePageInputKeyDown = (event) => {
        if (event.key !== "Enter") return;
        const input = Number(pageInput);
        if (!Number.isInteger(input) || input < 1) {
            setPageInput(String(currentPage));
            return;
        }
        handlePageChange(input);
    };

    const handlePageInputBlur = () => {
        const input = Number(pageInput);
        if (!Number.isInteger(input) || input < 1) {
            setPageInput(String(currentPage));
            return;
        }
        handlePageChange(input);
    };

    const handlePageSizeChange = (event) => {
        const value = Number(event.target.value);
        onPageSizeChange?.(value);
    };

    const getRowId = (row, index) => typeof rowKey === "function" ? rowKey(row, index) : row?.[rowKey] ?? index;

    const renderCell = (column, row) => {
        if (column.render) return column.render(row);

        if (column.Cell) {
            return column.Cell({
                value: getNestedValue(row, column.accessor || column.key),
                row,
            });
        }

        const value = getNestedValue(row, column.accessor || column.key);

        if (value === null || value === undefined || value === "") return column.emptyValue ?? "-";
        if (typeof value === "object") return JSON.stringify(value);

        return value;
    };

    const renderLoadingRows = () => Array.from({ length: loadingRows }, (_, rowIndex) => (
        <tr key={`loading-${rowIndex}`}>
            <td className="border-b border-gray-200 px-4 py-4">
                <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
            </td>
            {columns.map((column, columnIndex) => (
                <td key={column.key || columnIndex} className="border-b border-gray-200 px-4 py-4">
                    <div className="h-4 w-full max-w-45 animate-pulse rounded bg-gray-200" />
                </td>
            ))}
        </tr>
    ));

    return (
        <div className={`w-full ${className}`}>
            <div className={`w-full overflow-x-auto bg-white ${bordered ? "rounded-md border border-gray-200" : ""} ${wrapperClassName}`}>
                <table className={`w-full table-auto border-collapse ${tableClassName}`}>
                    <thead className={`${theme.bg_primary}`}>
                        <tr>
                            <th className="border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">{serialNumberHeader}</th>

                            {columns.map((column, index) => (
                                <th
                                    key={column.key || index}
                                    className={`border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white ${column.headerClassName || ""}`}
                                    style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    {column.header || column.label || column.key}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? renderLoadingRows() : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => {
                                const id = getRowId(row, rowIndex);
                                const rowClass = getRowClassName?.(row, rowIndex) || "";
                                const serialNumber = (currentPage - 1) * safePageSize + rowIndex + 1;

                                return (
                                    <tr
                                        key={id}
                                        onClick={() => onRowClick?.(row, rowIndex)}
                                        className={`transition-colors 
                                            ${striped && rowIndex % 2 !== 0 ? "bg-gray-50" : "bg-white"} 
                                            ${hoverable ? "hover:bg-gray-50" : ""} ${onRowClick ? "cursor-pointer" : ""}
                                             ${rowClass}`}
                                    >
                                        <td className="border-b border-gray-100 px-4 py-3 text-sm text-gray-700">
                                            {serialNumber}
                                        </td>

                                        {columns.map((column, columnIndex) => (
                                            <td
                                                key={column.key || columnIndex}
                                                className={`border-b border-gray-100 px-4 py-3 text-sm text-gray-700 ${column.nowrap ? "whitespace-nowrap" : ""} ${column.cellClassName || ""}`}
                                            >
                                                {renderCell(column, row)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="mt-4 flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap text-sm font-medium text-gray-600">Rows per page :</span>
                        <div className="w-22">
                            <Select
                                className=""
                                name="pageSize"
                                value={safePageSize}
                                options={pageSizeOptions.map((value) => ({
                                    label: String(value),
                                    value
                                }))}
                                onChange={handlePageSizeChange} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="theme"
                            icon={MdKeyboardDoubleArrowLeft}
                            iconSize={19}
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="h-9! w-9! p-0!"
                        />

                        <Button
                            type="button"
                            variant="theme"
                            icon={MdKeyboardArrowLeft}
                            iconSize={19}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="h-9! w-9! p-0!"
                        />

                        <div className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-600">
                            <span>Page</span>
                            <span className="font-semibold text-gray-900">{currentPage}</span>
                            <span>of</span>
                            <span className="font-semibold text-gray-900">{totalPages}</span>
                        </div>

                        <Input
                            type="number"
                            value={pageInput}
                            onChange={handlePageInputChange}
                            onKeyDown={handlePageInputKeyDown}
                            onBlur={handlePageInputBlur}
                            containerClassName="w-16"
                            inputClassName="text-center"
                        />

                        <Button
                            type="button"
                            variant="theme"
                            icon={MdKeyboardArrowRight}
                            iconSize={19}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="h-9! w-9! p-0!"
                        />

                        <Button
                            type="button"
                            variant="theme"
                            icon={MdKeyboardDoubleArrowRight}
                            iconSize={19}
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="h-9! w-9! p-0!"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Table.displayName = "Table";

export default Table;