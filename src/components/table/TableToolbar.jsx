import React from "react";
import { MdRefresh, MdFileDownload } from "react-icons/md";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../Button";

const TableToolbar = ({
    searchFields = [],
    searchValues = {},
    onSearchChange,
    filters = [],
    filterValues = {},
    onFilterChange,
    onReset,
    isResetDisabled = true,
    className = "",
    onExport,
}) => {
    return (
        <div className={`grid grid-cols-2 items-end gap-3 rounded-md shadow-sm bg-white p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ${className}`}>
            {searchFields.map((field) => (
                <Input
                    key={field.key}
                    label={field.label}
                    name={field.key}
                    type={field.type || "text"}
                    placeholder={field.placeholder || `Search by ${field.label || ""}`}
                    value={searchValues[field.key] ?? ""}
                    onChange={(event) => onSearchChange?.(field.key, event.target.value)}
                />
            ))}

            {filters.map((filter) => (
                <Select
                    key={filter.key}
                    label={filter.label}
                    name={filter.key}
                    value={filterValues[filter.key] ?? ""}
                    options={filter.options || []}
                    placeholder={filter.placeholder || "Select"}
                    onChange={(event) => onFilterChange?.(filter.key, event.target.value)}
                />
            ))}

            {onReset && (
                <Button
                    type="button"
                    variant="theme"
                    icon={MdRefresh}
                    iconSize={20}
                    onClick={onReset}
                    disabled={isResetDisabled}
                    text="Reset"
                    className="py-2.5! disabled:pointer-events-none disabled:opacity-50"
                />
            )}

            {onExport && (
                <Button
                    type="button"
                    variant="theme"
                    icon={MdFileDownload}
                    iconSize={20}
                    onClick={onExport}
                    text="Export Excel"
                    className="py-2.5!"
                />
            )}
        </div>
    );
};

export default TableToolbar;