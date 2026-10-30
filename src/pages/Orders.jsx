import React, { useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdShoppingCart } from "react-icons/md";

// Components
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// Modal screens
import OrdersView from "../modalScreens/orders/OrdersView";

// Hooks
import { useOrders } from "../hooks/useOrders";

// Utils
import { formatCurrency, formatDateTime } from "../utils/formatters";

// Store
import useModalStore from "../store/modalStore";

const PAGE_SIZE = 10;

const Orders = () => {
    const { openModal } = useModalStore();
    const { data: orders = [], isLoading, isError, refetch, isFetching } = useOrders();

    const [searchValues, setSearchValues] = useState({
        orderNumber: "",
        trackingNumber: "",
    });

    const [filterValues, setFilterValues] = useState({
        orderStatus: "",
        paymentMethod: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [debouncedOrderNumber] = useDebounce(searchValues.orderNumber, 500);
    const [debouncedTrackingNumber] = useDebounce(searchValues.trackingNumber, 500);

    const handleSearchChange = (key, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [key]: value,
        }));

        setCurrentPage(1);
    };

    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchValues({
            orderNumber: "",
            trackingNumber: "",
        });
        setFilterValues({
            orderStatus: "",
            paymentStatus: "",
            paymentMethod: "",
        });
        setCurrentPage(1);
        setPageSize(PAGE_SIZE);
    };

    const handlePageSizeChange = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // view orders
    const handleView = (order) => {
        openModal({
            icon: MdShoppingCart,
            title: "Order Details",
            size: "xl",
            content: <OrdersView order={order} />,
        });
    };

    const columns = [
        {
            key: "orderNumber",
            header: "Order ID",
            minWidth: "130px",
            render: (row) => (
                <p className="text-xs font-semibold">{row?.orderNumber || "-"}</p>
            ),
        },
        {
            key: "customerName",
            header: "Customer",
            minWidth: "120px",
            render: (row) => (
                <p className="font-medium">{row?.customerName || "-"}</p>
            ),
        },
        {
            key: "totalItems",
            header: "Items",
            render: (row) => row?.totalItems ?? 0,
        },
        {
            key: "totalAmount",
            header: "Amount",
            render: (row) => (
                <p className="font-semibold">
                    {formatCurrency(row?.totalAmount ?? 0)}
                </p>
            ),
        },
        {
            key: "paymentMethod",
            header: "Payment Method",
            minWidth: "130px",
            render: (row) => row?.paymentMethod || "-",
        },
        {
            key: "paymentStatus",
            header: "Payment Status",
            render: (row) => (
                <Badge
                    text={row?.paymentStatus || "Unknown"}
                    variant={
                        {
                            Paid: "success",
                            Pending: "warning",
                            Failed: "danger",
                            Refunded: "info",
                        }[row?.paymentStatus] || "default"
                    }
                />
            ),
        },
        {
            key: "trackingNumber",
            header: "Tracking",
            minWidth: "130px",
            render: (row) => (
                <p className="text-xs font-semibold">
                    {row?.trackingNumber || "-"}
                </p>
            ),
        },
        {
            key: "orderStatus",
            header: "Order Status",
            render: (row) => (
                <Badge
                    text={row?.orderStatus || "Unknown"}
                    variant={
                        {
                            Pending: "warning",
                            Processing: "info",
                            Shipped: "primary",
                            Delivered: "success",
                            Cancelled: "danger",
                        }[row?.orderStatus] || "default"
                    }
                />
            ),
        },
        {
            key: "orderedAt",
            header: "Order Date",
            minWidth: "130px",
            render: (row) => (
                <p className="text-xs">{formatDateTime(row?.orderedAt)}</p>
            ),
        },
        {
            key: "action",
            header: "Action",
            render: (row) => (
                <TableActionButtons row={row} onView={handleView} />
            ),
        },
    ];

    const filteredOrders = orders.filter((order) => {
        const matchesOrderNumber = (order?.orderNumber || "")
            .toLowerCase()
            .includes(debouncedOrderNumber.trim().toLowerCase());

        const matchesTrackingNumber = (order?.trackingNumber || "")
            .toLowerCase()
            .includes(debouncedTrackingNumber.trim().toLowerCase());

        const matchesOrderStatus =
            !filterValues.orderStatus ||
            order?.orderStatus === filterValues.orderStatus;

        const matchesPaymentMethod =
            !filterValues.paymentMethod ||
            order?.paymentMethod === filterValues.paymentMethod;

        return (
            matchesOrderNumber &&
            matchesTrackingNumber &&
            matchesOrderStatus &&
            matchesPaymentMethod
        );
    });

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

    const safePage = Math.min(currentPage, totalPages);

    const isResetDisabled =
        !searchValues.orderNumber &&
        !searchValues.trackingNumber &&
        !filterValues.orderStatus &&
        !filterValues.paymentMethod;

    if (isError) {
        return (
            <EmptyState
                icon={MdShoppingCart}
                iconClassName="text-sm text-[#ac1e44]"
                title="Failed to Load Orders"
                description="Something went wrong while fetching orders. Please try again."
                size="md"
                action={
                    <Button
                        type="button"
                        variant="themeDark"
                        onClick={() => refetch()}
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
                titleIcon={MdShoppingCart}
                title="Orders"
                description="Manage and track all customer orders."
                onRefresh={refetch}
                refreshLoading={isLoading || isFetching}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "orderNumber",
                        type: "search",
                        label: "Order Number",
                        placeholder: "Search by order number...",
                    },
                    {
                        key: "trackingNumber",
                        type: "search",
                        label: "Tracking Number",
                        placeholder: "Search by tracking number...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "orderStatus",
                        label: "Order Status",
                        placeholder: "All Statuses",
                        options: [
                            { label: "Pending", value: "Pending" },
                            { label: "Processing", value: "Processing" },
                            { label: "Shipped", value: "Shipped" },
                            { label: "Delivered", value: "Delivered" },
                            { label: "Cancelled", value: "Cancelled" },
                        ],
                    },
                    {
                        key: "paymentMethod",
                        label: "Payment Method",
                        placeholder: "All Methods",
                        options: [
                            { label: "UPI", value: "UPI" },
                            { label: "Credit Card", value: "Credit Card" },
                            { label: "Debit Card", value: "Debit Card" },
                            { label: "Cash on Delivery", value: "Cash on Delivery" },
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
                data={filteredOrders}
                loading={isLoading}
                rowKey="id"
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdShoppingCart}
                        iconSize={26}
                        variant="minimal"
                        size="sm"
                        title="No orders found"
                        description="No orders match your search or filter criteria. Try adjusting your filters."
                    />
                }
            />
        </div>
    );
};

export default Orders;