import React, { useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdAdd, MdViewCarousel } from "react-icons/md";

// Components
import Image from "../components/media/Image";
import PageHeader from "../components/PageHeader";
import Switch from "../components/forms/Switch";
import TableToolbar from "../components/table/TableToolbar";
import Table from "../components/table/Table";
import TableActionsButtons from "../components/table/TableActionButtons";
import EmptyState from "../components/EmptyState";

// Modal screens
import BannerForm from "../modalScreens/banners/BannerForm";
import BannerView from "../modalScreens/banners/BannerView";
import Confirmation from "../modalScreens/Confirmation";

// Hooks
import { useBanners } from "../hooks/useBanners";

// Store
import useModalStore from "../store/modalStore";

// Utils
import { toastify } from "../utils/toastify";

const Banners = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();
    const { data: banners = [], isLoading, isError } = useBanners();

    const PAGE_SIZE = 10;

    const [searchValues, setSearchValues] = useState({ title: "" });
    const [filterValues, setFilterValues] = useState({ status: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [debouncedSearch] = useDebounce(searchValues.title, 500);

    const handleSearchChange = (key, value) => {
        setSearchValues((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchValues({ title: "" });
        setFilterValues({ status: "" });
        setCurrentPage(1);
    };

    const handlePageSizeChange = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    // Add banner
    const handleAddBanner = () => {
        const formId = "banner-form";

        openModal({
            icon: MdViewCarousel,
            title: "Add Banner",
            content: <BannerForm mode="add" formId={formId} />,
            size: "lg",
            formId,
            action: {
                label: "Add Banner",
                variant: "theme",
                loadingText: "Adding...",
            },
        });
    };

    // Edit banner
    const handleEdit = (data) => {
        const formId = "banner-form";

        openModal({
            icon: MdViewCarousel,
            title: "Edit Banner",
            content: <BannerForm mode="edit" data={data} formId={formId} />,
            size: "lg",
            formId,
            action: {
                label: "Update",
                variant: "themeDark",
                loadingText: "Updating...",
            },
        });
    };

    // View banner
    const handleView = (data) => {
        openModal({
            icon: MdViewCarousel,
            title: "Banner Details",
            content: <BannerView data={data} />,
            size: "lg",
        });
    };

    // Delete banner
    const handleDelete = (data) => {
        openModal({
            icon: MdViewCarousel,
            title: "Delete Banner",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this banner?"
                    data={data.title}
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
                        toastify.success("Banner deleted successfully!");
                    }, 1000);
                },
            },
        });
    };

    // Table columns
    const columns = [
        {
            key: "bannerUrl",
            label: "Banner",
            render: (row) => (
                <Image
                    src={row.bannerUrl}
                    alt={row.title}
                    className="h-12 w-20 rounded-md border border-slate-200 object-cover"
                />
            ),
        },
        {
            key: "title",
            label: "Title",
            render: (row) => (
                <p className="font-semibold text-slate-800">{row.title}</p>
            ),
        },
        {
            key: "description",
            label: "Description",
            render: (row) => (
                <p
                    className="max-w-xs truncate text-sm text-slate-500"
                    title={row.description}
                >
                    {row.description}
                </p>
            ),
        },
        {
            key: "startDate",
            label: "Start Date",
            render: (row) => (
                <span className="whitespace-nowrap text-sm text-slate-600 font-medium">
                    {row.startDate}
                </span>
            ),
        },
        {
            key: "endDate",
            label: "End Date",
            render: (row) => (
                <span className="whitespace-nowrap text-sm text-slate-600 font-medium">
                    {row.endDate}
                </span>
            ),
        },
        {
            key: "isActive",
            label: "Status",
            render: (row) => (
                <Switch
                    checked={row.isActive}
                    label={row.isActive ? "Active" : "Inactive"}
                    labelPosition="right"
                    onCheckedChange={(checked) => {
                        console.log("Banner status:", row.id, checked);
                        toastify.success("Banner status changed successfully!");
                    }}
                    activeColor="bg-green-600"
                    size="sm"
                    ariaLabel={`Toggle ${row.title} status`}
                />
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <TableActionsButtons
                    row={row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    // Search and filter banners
    const filteredBanners = banners.filter((banner) => {
        const matchesSearch = banner.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        const matchesStatus =
            !filterValues.status ||
            (filterValues.status === "active" && banner.isActive) ||
            (filterValues.status === "inactive" && !banner.isActive);

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filteredBanners.length / pageSize));

    const safePage = Math.min(currentPage, totalPages);

    const isResetDisabled = !searchValues.title && !filterValues.status;

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Failed to load banners. Please try again.
            </div>
        );
    }

    return (
        <div className="space-y-5">

            <PageHeader
                titleIcon={MdViewCarousel}
                title="Banners"
                description="Manage promotional banners displayed on your platform."
                actionLabel="New Banner"
                actionIcon={MdAdd}
                actionVariant="theme"
                onClick={handleAddBanner}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "title",
                        label: "Search Banner",
                        placeholder: "Search by banner title...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "status",
                        label: "Status",
                        placeholder: "All Status",
                        options: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
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
                data={filteredBanners}
                loading={isLoading}
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdViewCarousel}
                        size="sm"
                        title="No banners found"
                        description="No promotional banners available yet. Add a new banner to showcase your latest offers and promotions."
                        variant="minimal"
                    />
                }
            />
        </div>
    );
};

export default Banners;