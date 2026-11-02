import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdReceiptLong } from "react-icons/md";

// Components
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// modal screens
import TransactionsView from "../modalScreens/transactions/TransactionsView";

// Hooks
import { useTransactions } from "../hooks/useTransactions";

// Utils
import { formatCurrency, formatDateTime } from "../utils/formatters";

// Store
import useModalStore from "../store/modalStore";

const PAGE_SIZE = 10;

const Transactions = () => {

    const { openModal } = useModalStore();
    const { data: transactions = [], isLoading, isError, refetch, isFetching } = useTransactions();

    const [searchValues, setSearchValues] = useState({
        transactionId: "",
        orderId: "",
    });

    const [filterValues, setFilterValues] = useState({
        paymentStatus: "",
        paymentMethod: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [debouncedTransactionId] = useDebounce(searchValues.transactionId, 500);
    const [debouncedOrderId] = useDebounce(searchValues.orderId, 500);

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
            transactionId: "",
            orderId: "",
        });

        setFilterValues({
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

    // view transaction
    const handleView = (trans) => {
        openModal({
            icon: MdReceiptLong,
            title: "Transaction Details",
            size: "lg",
            content: (
                <TransactionsView Trans={trans} />
            ),
        });
    };

    if (isError) {
        return (
            <EmptyState
                icon={MdReceiptLong}
                variant='minimal'
                title="Failed to Load Transactions"
                description="Something went wrong while fetching  Transactions. Please try again."
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

    const columns = [
        {
            key: "transactionId",
            header: "Transaction ID",
            minWidth: "140px",
            render: (row) => (
                <span className="font-semibold text-gray-800 text-xs">
                    {row?.transactionId || "-"}
                </span>
            ),
        },
        {
            key: "orderId",
            header: "Order ID",
            minWidth: "140px",
            render: (row) => (
                <span className="font-semibold text-gray-800 text-xs">
                    {row?.orderId || "-"}
                </span>
            ),
        },
        {
            key: "customerName",
            header: "Customer",
            minWidth: "180px",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-800">{row?.customerName || "-"}</p>
                    <p className="text-xs text-gray-500">{row?.customerEmail || "-"}</p>
                </div>
            ),
        },
        {
            key: "paymentMethod",
            header: "Payment Method",
            minWidth: "150px",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-700">{row?.paymentMethod || "-"}</p>
                    <p className="text-xs text-gray-500">{row?.paymentProvider || "-"}</p>
                </div>
            ),
        },
        {
            key: "amount",
            header: "Amount",
            render: (row) => (
                <span className="font-semibold text-gray-800">
                    {formatCurrency(row?.amount ?? 0)}
                </span>
            ),
        },
        {
            key: "netAmount",
            header: "Net Amount",
            render: (row) => formatCurrency(row?.netAmount ?? 0),
        },
        {
            key: "paymentStatus",
            header: "Status",
            render: (row) => (
                <Badge
                    text={row?.paymentStatus || "Unknown"}
                    variant={
                        {
                            Success: "success",
                            Pending: "warning",
                            Failed: "danger",
                            Refunded: "info",
                        }[row?.paymentStatus] || "default"
                    }
                />
            ),
        },
        {
            key: "transactionDate",
            header: "Transaction Date",
            minWidth: "170px",
            render: (row) => formatDateTime(row?.transactionDate),
        },
        {
            key: "actions",
            header: "Actions",
            render: (row) => (
                <TableActionButtons row={row} onView={handleView} />
            ),
        },
    ];

    const filteredTransactions = useMemo(() => {
        return (transactions || []).filter((transaction) => {
            const matchesTransactionId = (transaction?.transactionId || "")
                .toLowerCase()
                .includes(debouncedTransactionId.trim().toLowerCase());

            const matchesOrderId = (transaction?.orderId || "")
                .toLowerCase()
                .includes(debouncedOrderId.trim().toLowerCase());

            const matchesPaymentStatus =
                !filterValues.paymentStatus ||
                transaction?.paymentStatus === filterValues.paymentStatus;

            const matchesPaymentMethod =
                !filterValues.paymentMethod ||
                transaction?.paymentMethod === filterValues.paymentMethod;

            return (
                matchesTransactionId &&
                matchesOrderId &&
                matchesPaymentStatus &&
                matchesPaymentMethod
            );
        });
    }, [
        transactions,
        debouncedTransactionId,
        debouncedOrderId,
        filterValues.paymentStatus,
        filterValues.paymentMethod,
    ]);

    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const isResetDisabled =
        !searchValues.transactionId &&
        !searchValues.orderId &&
        !filterValues.paymentStatus &&
        !filterValues.paymentMethod;

    return (
        <div className="space-y-5">
            <PageHeader
                titleIcon={MdReceiptLong}
                title="Transactions"
                description="Monitor, track, and manage all payment transactions."

                onRefresh={refetch}
                refreshLoading={isLoading || isFetching}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "transactionId",
                        type: "search",
                        label: "Transaction ID",
                        placeholder: "Search by transaction ID...",
                    },
                    {
                        key: "orderId",
                        type: "search",
                        label: "Order ID",
                        placeholder: "Search by order ID...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "paymentStatus",
                        label: "Payment Status",
                        placeholder: "All Statuses",
                        options: [
                            { label: "Success", value: "Success" },
                            { label: "Pending", value: "Pending" },
                            { label: "Failed", value: "Failed" },
                            { label: "Refunded", value: "Refunded" },
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
                data={filteredTransactions}
                loading={isLoading}
                rowKey="id"
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdReceiptLong}
                        iconSize={26}
                        variant="minimal"
                        size="sm"
                        title="No transactions found"
                        description="No transactions match your search or filter criteria. Try adjusting your filters."
                    />
                }
            />
        </div>
    );
};

export default Transactions;