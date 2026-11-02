import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdAdd, MdAdminPanelSettings } from "react-icons/md";

// Components
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// modal screens
import SubAdminForm from "../modalScreens/subadmin/SubAdminForm";
import Confirmation from '../modalScreens/Confirmation';

// Hooks
import { useSubAdmins } from "../hooks/useSubAdmins";

// Utils
import { toastify } from "../utils/toastify";
import { formatDate, formatPhoneNumber } from "../utils/formatters";

// Store
import useModalStore from "../store/modalStore";
import SubAdminView from "../modalScreens/subadmin/SubAdminView";

const PAGE_SIZE = 10;

const SubAdmins = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();

    const { data: subAdmins = [], isLoading, isError, refetch, isFetching } = useSubAdmins();

    const [searchValues, setSearchValues] = useState({
        name: "",
        email: "",
        username: "",
    });

    const [filterValues, setFilterValues] = useState({
        isActive: "",
        isVerified: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [debouncedName] = useDebounce(searchValues.name, 500);
    const [debouncedEmail] = useDebounce(searchValues.email, 500);
    const [debouncedUsername] = useDebounce(searchValues.username, 500);

    // Search
    const handleSearchChange = (key, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    // Filters
    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    // Reset
    const handleReset = () => {
        setSearchValues({
            name: "",
            email: "",
            username: "",
        });

        setFilterValues({
            isActive: "",
            isVerified: "",
        });

        setCurrentPage(1);
        setPageSize(PAGE_SIZE);
    };

    // Page size
    const handlePageSizeChange = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // add sub-admin
    const handleAdd = () => {
        const formId = "sub-admin-form"
        openModal({
            icon: MdAdminPanelSettings,
            title: "Add Sub-Admin",
            size: "lg",
            formId: formId,
            content: (<SubAdminForm mode="add" formId={formId} />),
            action: {
                label: "Add Sub-Admin",
                variant: "theme",
                loadingText: "Adding...",
            },
        })
    }

    // View Sub-Admin
    const handleView = (admin) => {
        openModal({
            icon: MdAdminPanelSettings,
            title: "Sub-Admin Details",
            size: "lg",
            content: (
                <SubAdminView admin={admin} />
            ),
        });
    };

    // add sub-admin
    const handleEdit = (admin) => {
        const formId = "sub-admin-form"
        openModal({
            icon: MdAdminPanelSettings,
            title: "Edit Sub-Admin",
            size: "lg",
            formId: formId,
            content: (<SubAdminForm subAdmin={admin} mode="edit" formId={formId} />),
            action: {
                label: "Update",
                variant: "themeDark",
                loadingText: "Updating...",
            },
        })
    }

    // delete sub-admin
    const handleDelete = (admin) => {
        openModal({
            icon: MdAdminPanelSettings,
            title: "Delete Sub-Admin",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this sub-admin?"
                    data={admin?.name}
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
                        toastify.success("Sub-admin deleted successfully!");
                    }, 1000);
                },
            },
        });
    }

    // Table columns
    const columns = [
        {
            key: "avatar",
            header: "Profile",
            accessor: "profilePicture",
            render: (row) => (
                <Avatar src={row?.profilePicture} alt={row?.name} size="sm" />
            ),
        },
        {
            key: "name",
            header: "Name",
            minWidth: "140px",
            render: (row) => (
                <p className="font-semibold text-slate-800">{row?.name}</p>
            ),
        },
        {
            key: "email",
            header: "Email",
            accessor: "email",
            minWidth: "130px",
        },
        {
            key: "username",
            header: "Username",
            accessor: "username",
            render: (row) => (
                <p className="font-medium">@{row?.username || "-"}</p>
            ),
        },
        {
            key: "mobile",
            header: "Mobile",
            accessor: "mobile",
            minWidth: "120px",
            render: (row) => formatPhoneNumber(row.mobile)
        },
        {
            key: "permissions",
            header: "Permissions",
            minWidth: "180px",
            render: (row) => (
                <div className="flex max-w-50 flex-wrap gap-1">
                    {row?.permissions?.slice(0, 2).map((permission) => (
                        <Badge
                            key={permission}
                            text={permission}
                            variant="info"
                        />
                    ))}
                    {row?.permissions?.length > 2 && (
                        <Badge
                            text={`+${row.permissions.length - 2}`}
                            variant="default"
                        />
                    )}
                </div>
            ),
        },
        // {
        //     key: "isVerified",
        //     header: "Verification",
        //     minWidth: "100px",
        //     render: (row) => (
        //         <Badge
        //             text={row?.isVerified ? "Verified" : "Unverified"}
        //             variant={row?.isVerified ? "success" : "warning"}
        //         />
        //     ),
        // },
        {
            key: "isActive",
            header: "Status",
            render: (row) => (
                <Badge
                    text={row?.isActive ? "Active" : "Inactive"}
                    variant={row?.isActive ? "success" : "danger"}
                />
            ),
        },
        {
            key: "createdAt",
            header: "Joined Date",
            minWidth: "100px",
            render: (row) => <span className="text-xs">{formatDate(row?.createdAt)}</span>,
        },
        {
            key: "actions",
            header: "Actions",
            render: (row) => (
                <TableActionButtons
                    row={row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    // Search and filters
    const filteredSubAdmins = useMemo(() => {
        return subAdmins.filter((admin) => {
            const matchesName = (admin?.name || "")
                .toLowerCase()
                .includes(debouncedName.trim().toLowerCase());

            const matchesEmail = (admin?.email || "")
                .toLowerCase()
                .includes(debouncedEmail.trim().toLowerCase());

            const matchesUsername = (admin?.username || "")
                .toLowerCase()
                .includes(debouncedUsername.trim().toLowerCase());

            const matchesStatus =
                !filterValues.isActive ||
                String(admin?.isActive) === filterValues.isActive;

            return (
                matchesName &&
                matchesEmail &&
                matchesUsername &&
                matchesStatus
            );
        });
    }, [subAdmins, debouncedName, debouncedEmail, debouncedUsername, filterValues.isActive,]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredSubAdmins.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    // Reset button
    const isResetDisabled =
        !searchValues.name && !searchValues.email &&
        !searchValues.username && !filterValues.isActive &&
        !filterValues.isVerified;

    // Error state
    if (isError) {
        return (
            <EmptyState
                icon={MdAdminPanelSettings}
                iconClassName="text-sm text-[#ac1e44]"
                title="Failed to Load Sub-Admins"
                description="Something went wrong while fetching sub-admin records. Please try again."
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
                titleIcon={MdAdminPanelSettings}
                title="Sub-Admins"
                description="Manage sub-admin accounts, permissions, and access."

                actionLabel="Add Sub-Admin"
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
                        placeholder: "Search by name...",
                    },
                    {
                        key: "email",
                        type: "search",
                        label: "Email",
                        placeholder: "Search by email...",
                    },
                    {
                        key: "username",
                        type: "search",
                        label: "Username",
                        placeholder: "Search by username...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "isActive",
                        label: "Account Status",
                        placeholder: "All Statuses",
                        options: [
                            { label: "Active", value: "true" },
                            { label: "Inactive", value: "false" },
                        ],
                    }
                ]}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                isResetDisabled={isResetDisabled}
            />

            <Table
                columns={columns}
                data={filteredSubAdmins}
                loading={isLoading}
                rowKey="id"
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdAdminPanelSettings}
                        iconSize={26}
                        variant="minimal"
                        size="sm"
                        title="No sub-admins found"
                        description="No sub-admins match your search or filter criteria. Try adjusting your filters."
                    />
                }
            />
        </div>
    );
};

export default SubAdmins;