import React, { useState } from 'react'
import { useDebounce } from "use-debounce";

// icons
import { MdAdd, MdNotifications } from 'react-icons/md'

// components
import PageHeader from '../components/PageHeader';
import EmptyState from "../components/EmptyState";
import Badge from '../components/Badge';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import TableActionButtons from '../components/table/TableActionButtons';

// modal screens
import Confirmation from "../modalScreens/Confirmation";
import SendNotificationForm from '../modalScreens/notifications/SendNotificationForm';
import NotificationView from '../modalScreens/notifications/NotificationView';

// hook
import { useNotifications } from '../hooks/useNotifications';

// store
import useModalStore from '../store/modalStore';

// utils
import { toastify } from "../utils/toastify";

const Notifications = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();

    const { data, isLoading } = useNotifications();

    const [searchValues, setSearchValues] = useState({
        title: "",
    });

    const [debouncedSearch] = useDebounce(searchValues.title, 500);

    const [filterValues, setFilterValues] = useState({
        status: "",
        channel: "",
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSearchChange = (key, value) => {
        setSearchValues((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleReset = () => {
        setSearchValues({ title: "" });
        setFilterValues({ status: "", channel: "" });
        setPage(1);
    };

    const filteredNotifications = (data || []).filter((notification) => {
        const matchesTitle = notification.title
            ?.toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase());

        const matchesStatus =
            !filterValues.status ||
            (filterValues.status === "sent" && notification.isSent === true) ||
            (filterValues.status === "failed" && notification.isSent === false);

        const matchesChannel =
            !filterValues.channel ||
            notification.channel?.toLowerCase() === filterValues.channel;

        return matchesTitle && matchesStatus && matchesChannel;
    });

    // send notification
    const handleSendNotification = () => {
        const formId = "send-notification-form"
        openModal({
            title: "Send Notification",
            icon: MdNotifications,
            size: "md",
            formId: formId,
            content: <SendNotificationForm formId={formId} />,
            action: {
                label: "Send",
                variant: "theme",
                loadingText: "Sending...",
            }
        });
    };

    // view notification
    const handleView = (data) => {
        openModal({
            icon: MdNotifications,
            title: "Notification Details",
            content: <NotificationView data={data} />,
            size: "md",
        });
    };

    // delete notification
    const handleDelete = (data) => {
        openModal({
            icon: MdNotifications,
            title: "Delete Notification",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this notification?"
                    data={data.title}
                />
            ),
            action: {
                label: "Delete",
                variant: "danger",
                loadingText: "Deleting...",
                onClick: () => {
                    setActionLoading(true)
                    setTimeout(() => {
                        closeModal();
                        setActionLoading(false)
                        toastify.success('Notification deleted successfully!')
                    }, 1000)
                }
            },
        });
    };

    // columns
    const columns = [
        {
            key: "title",
            label: "Notification",
            render: (row) => (
                <p className='font-semibold'>{row?.title}</p>
            )
        },
        {
            key: "message",
            label: "Message",
            render: (row) => (
                <p className="max-w-xs truncate" title={row.message}>
                    {row.message}
                </p>
            ),
        },
        {
            key: "recipients",
            label: "Recipients",
            minWidth: "120px",
        },
        {
            key: "channel",
            label: "Channel",
        },
        {
            key: "sentAt",
            label: "Date",
            minWidth: "120px",
            render: (row) => (
                <p className='font-semibold'>{row?.sentAt}</p>
            )
        },
        {
            key: "isSent",
            label: "Status",
            render: (row) => (
                <Badge
                    text={row?.isSent ? "Sent" : "Failed"}
                    variant={row?.isSent ? "success" : "danger"}
                />
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <TableActionButtons
                    row={row}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            )
        },
    ];

    return (
        <div className='space-y-5'>

            <PageHeader
                title="Notifications"
                titleIcon={MdNotifications}
                description="Send announcements and important updates to your users."
                actionLabel="New Notification"
                actionIcon={MdAdd}
                actionVariant="theme"
                onClick={handleSendNotification}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "title",
                        label: "Search Notifications",
                        placeholder: "Search by title...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "status",
                        label: "Status",
                        placeholder: "All Statuses",
                        options: [
                            { label: "Sent", value: "sent" },
                            { label: "Failed", value: "failed" },
                        ],
                    },
                    {
                        key: "channel",
                        label: "Channel",
                        placeholder: "All Channels",
                        options: [
                            { label: "In-App", value: "in-app" },
                            { label: "Email", value: "email" },
                            { label: "Both", value: "both" },
                        ],
                    },
                ]}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                isResetDisabled={
                    !searchValues.title &&
                    !filterValues.status &&
                    !filterValues.channel
                }
            />

            <Table
                data={filteredNotifications}
                columns={columns}
                loading={isLoading}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}
                emptyMessage={
                    <EmptyState
                        icon={MdNotifications}
                        iconClassName=''
                        size='sm'
                        title="No Notifications Found"
                        description="There are no notifications matching your search or filters."
                        variant="minimal"
                    />
                }
            />


        </div>
    )
}

export default Notifications;