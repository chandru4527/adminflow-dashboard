import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdAdd, MdCategory } from "react-icons/md";

// Components
import Switch from "../components/forms/Switch";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// Modal screens
import CategoryForm from "../modalScreens/category/CategoryForm";
import Confirmation from "../modalScreens/Confirmation";

// Hooks
import { useCategories } from "../hooks/useCategories";

// Utils
import { toastify } from "../utils/toastify";
import { formatDate } from "../utils/formatters";

// Store
import useModalStore from "../store/modalStore";

const PAGE_SIZE = 10;

const Categories = () => {
    const { openModal, closeModal, setActionLoading } = useModalStore();

    const { data: categories = [], isLoading, isError, refetch, isFetching, } = useCategories();

    // Search and filter states
    const [searchValues, setSearchValues] = useState({
        name: "",
    });

    const [filterValues, setFilterValues] = useState({
        isActive: "",
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    // Debounced search
    const [debouncedName] = useDebounce(searchValues.name, 500);

    // Search
    const handleSearchChange = (key, value) => {
        setSearchValues(prev => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    // Filters
    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    // Reset
    const handleReset = () => {
        setSearchValues({
            name: "",
        });

        setFilterValues({
            isActive: "",
        });

        setCurrentPage(1);
        setPageSize(PAGE_SIZE);
    };

    // Page size
    const handlePageSizeChange = value => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // Add category
    const handleAdd = () => {
        const formId = "category-form";

        openModal({
            title: "Add Category",
            icon: MdCategory,
            size: "lg",
            formId,
            content: (
                <CategoryForm
                    mode="add"
                    formId={formId}
                />
            ),
            action: {
                label: "Add Category",
                variant: "theme",
                loadingText: "Adding...",
            },
        });
    };

    // Edit category
    const handleEdit = data => {
        const formId = "category-form";

        openModal({
            title: "Edit Category",
            icon: MdCategory,
            size: "lg",
            formId,
            content: (
                <CategoryForm
                    category={data}
                    mode="edit"
                    formId={formId}
                />
            ),
            action: {
                label: "Update",
                variant: "themeDark",
                loadingText: "Updating...",
            },
        });
    };

    // Delete category
    const handleDelete = data => {
        openModal({
            icon: MdCategory,
            title: "Delete Category",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this category?"
                    data={data?.name}
                />
            ),
            action: {
                label: "Delete",
                variant: "danger",
                loadingText: "Deleting...",
                onClick: () => {
                    setActionLoading(true);

                    setTimeout(() => {
                        closeModal();
                        setActionLoading(false);
                        toastify.success("Category deleted successfully!");
                    }, 1000);
                },
            },
        });
    };

    // Table columns
    const columns = [
        {
            key: "name",
            header: "Category",
            minWidth: "180px",
            render: row => (
                <p className="font-semibold text-slate-800">{row?.name}</p>
            ),
        },
        {
            key: "description",
            header: "Description",
            minWidth: "250px",
            render: row => (
                <p
                    className="max-w-80 truncate text-sm text-slate-500"
                    title={row?.description}
                >
                    {row?.description || "-"}
                </p>
            ),
        },
        {
            key: "order",
            header: "Order",
            render: row => (
                <span className="font-medium text-slate-700">
                    {row?.order}
                </span>
            ),
        },
        {
            key: "status",
            header: "Status",
            accessor: "isActive",
            render: row => (
                <Switch
                    checked={row?.isActive}
                    label={row?.isActive ? "Active" : "Inactive"}
                    labelPosition="right"
                    onCheckedChange={() => {
                        toastify.success(
                            "Category status changed successfully!"
                        );
                    }}
                    activeColor="bg-green-600"
                    size="sm"
                    ariaLabel={`Toggle ${row?.name} status`}
                />
            ),
        },
        {
            key: "createdAt",
            header: "Created Date",
            minWidth: "120px",
            render: row => (
                <span className="text-sm">
                    {formatDate(row?.createdAt)}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            render: row => (
                <TableActionButtons
                    row={row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    // Search and filters
    const filteredCategories = useMemo(() => {
        return categories.filter(category => {
            const matchesName = (category?.name || "")
                .toLowerCase()
                .includes(debouncedName.trim().toLowerCase());

            const matchesStatus =
                !filterValues.isActive ||
                String(category?.isActive) === filterValues.isActive;

            return matchesName && matchesStatus;
        });
    }, [categories, debouncedName, filterValues.isActive]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));

    const safePage = Math.min(currentPage, totalPages);

    // Reset button
    const isResetDisabled = !searchValues.name && !filterValues.isActive;

    // Error state
    if (isError) {
        return (
            <EmptyState
                icon={MdCategory}
                title="Failed to Load Categories"
                variant="minimal"
                description="Something went wrong while fetching category records. Please try again."
                size="md"
                action={
                    <Button
                        type="button"
                        variant="themeDark"
                        onClick={refetch}
                        disabled={isFetching}
                        text={isFetching ? "Retrying..." : "Try Again"}
                    />
                }
            />
        );
    }

    return (
        <div className="space-y-5">

            <PageHeader
                titleIcon={MdCategory}
                title="Categories"
                description="Manage and organize your product categories."

                actionLabel="Add Category"
                actionIcon={MdAdd}
                actionVariant="theme"
                onClick={handleAdd}

                onRefresh={refetch}
                refreshLoading={isLoading || isFetching}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "name",
                        type: "search",
                        label: "Name",
                        placeholder: "Search by category name...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "isActive",
                        label: "Status",
                        placeholder: "All Statuses",
                        options: [
                            { label: "Active", value: "true" },
                            { label: "Inactive", value: "false" },
                        ],
                    },
                ]}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                isResetDisabled={isResetDisabled}
            />

            <Table
                columns={columns}
                data={filteredCategories}
                loading={isLoading}
                rowKey="id"
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdCategory}
                        iconSize={26}
                        variant="minimal"
                        size="sm"
                        title="No Categories Found"
                        description="No categories match your search or filter criteria. Try adjusting your filters."
                    />
                }
            />

        </div>
    );
};

export default Categories;