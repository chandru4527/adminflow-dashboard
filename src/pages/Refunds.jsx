import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdCurrencyExchange } from "react-icons/md";

// Components
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// modal screens
import RefundsView from "../modalScreens/refunds/RefundsView";

// Hooks
import { useRefunds } from "../hooks/useRefunds";

// Utils
import { formatCurrency, formatDateTime } from "../utils/formatters";

// Store
import useModalStore from "../store/modalStore";

const PAGE_SIZE = 10;

const Refunds = () => {

  const { openModal } = useModalStore();
  const { data: refunds = [], isLoading, isError, refetch, isFetching } = useRefunds();

  const [searchValues, setSearchValues] = useState({
    refundId: "",
    transactionId: "",
  });

  const [filterValues, setFilterValues] = useState({
    refundStatus: "",
    paymentMethod: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [debouncedRefundId] = useDebounce(searchValues.refundId, 500);
  const [debouncedTransactionId] = useDebounce(searchValues.transactionId, 500);

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
      refundId: "",
      transactionId: "",
    });

    setFilterValues({
      refundStatus: "",
      paymentMethod: "",
    });

    setCurrentPage(1);
    setPageSize(PAGE_SIZE);
  };

  // Page size
  const handlePageSizeChange = (value) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  // View refund
  const handleView = (refund) => {
    openModal({
      icon: MdCurrencyExchange,
      title: "Refund Details",
      size: "lg",
      content: (<RefundsView refund={refund} />),
    });
  };

  const columns = [
    {
      key: "refundId",
      header: "Refund ID",
      minWidth: "120px",
      render: (row) => (
        <span className="font-semibold text-[#ac1e44] text-xs">
          {row?.refundId || "-"}
        </span>
      ),
    },
    {
      key: "transactionId",
      header: "Trans ID",
      minWidth: "120px",
      render: (row) => (
        <span className="font-semibold text-gray-800 text-xs">
          {row?.transactionId || "-"}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      minWidth: "120px",
      render: (row) => (
        <>
          <p className="font-medium text-gray-800">
            {row?.customerName || "-"}
          </p>
          <p className="text-xs text-gray-500">
            {row?.customerEmail || "-"}
          </p>
        </>
      ),
    },
    {
      key: "paymentMethod",
      header: "Method",
      minWidth: "110px",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-700">
            {row?.paymentMethod || "-"}
          </p>
          <p className="text-xs text-gray-500">
            {row?.paymentProvider || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "originalAmount",
      header: "Amount",
      render: (row) => (
        <span className="font-medium text-gray-700">
          {formatCurrency(row?.originalAmount ?? 0)}
        </span>
      ),
    },
    {
      key: "refundAmount",
      header: "Refund",
      render: (row) => (
        <span className="font-semibold text-gray-800">
          {formatCurrency(row?.refundAmount ?? 0)}
        </span>
      ),
    },
    {
      key: "refundStatus",
      header: "Status",
      render: (row) => (
        <Badge
          text={row?.refundStatus || "Unknown"}
          variant={
            {
              Completed: "success",
              Processing: "info",
              Pending: "warning",
              Rejected: "danger",
            }[row?.refundStatus] || "default"
          }
        />
      ),
    },
    {
      key: "refundReason",
      header: "Reason",
      minWidth: "130px",
      render: (row) => (
        <p
          className=" line-clamp-2 text-xs text-gray-600"
          title={row?.refundReason || ""}
        >
          {row?.refundReason || "-"}
        </p>
      ),
    },
    {
      key: "refundDate",
      header: "Refund Date",
      minWidth: "120px",
      render: (row) => <span className="text-xs">{formatDateTime(row?.refundDate)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <TableActionButtons row={row} onView={() => handleView(row)} />
      ),
    },
  ];

  // Search and filter
  const filteredRefunds = useMemo(() => {
    return (refunds || []).filter((refund) => {
      const matchesRefundId = (refund?.refundId || "")
        .toLowerCase()
        .includes(debouncedRefundId.trim().toLowerCase());

      const matchesTransactionId = (refund?.transactionId || "")
        .toLowerCase()
        .includes(debouncedTransactionId.trim().toLowerCase());

      const matchesRefundStatus =
        !filterValues.refundStatus ||
        refund?.refundStatus === filterValues.refundStatus;

      const matchesPaymentMethod =
        !filterValues.paymentMethod ||
        (filterValues.paymentMethod === "Card"
          ? ["Credit Card", "Debit Card"].includes(refund?.paymentMethod)
          : refund?.paymentMethod === filterValues.paymentMethod);

      return (
        matchesRefundId &&
        matchesTransactionId &&
        matchesRefundStatus &&
        matchesPaymentMethod
      );
    });
  }, [
    refunds,
    debouncedRefundId,
    debouncedTransactionId,
    filterValues.refundStatus,
    filterValues.paymentMethod,
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRefunds.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  // Reset button
  const isResetDisabled =
    !searchValues.refundId &&
    !searchValues.transactionId &&
    !filterValues.refundStatus &&
    !filterValues.paymentMethod;

  // Error state
  if (isError) {
    return (
      <EmptyState
        icon={MdCurrencyExchange}
        title="Failed to Load Refunds"
        variant="minimal"
        description="Something went wrong while fetching refunds. Please try again."
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
        titleIcon={MdCurrencyExchange}
        title="Refunds"
        description="Track, monitor, and manage all customer refund requests."

        onRefresh={refetch}
        refreshLoading={isLoading || isFetching}
      />

      <TableToolbar
        searchFields={[
          {
            key: "refundId",
            type: "search",
            label: "Refund ID",
            placeholder: "Search by refund ID...",
          },
          {
            key: "transactionId",
            type: "search",
            label: "Transaction ID",
            placeholder: "Search by transaction ID...",
          },
        ]}
        searchValues={searchValues}
        onSearchChange={handleSearchChange}
        filters={[
          {
            key: "refundStatus",
            label: "Refund Status",
            placeholder: "All Statuses",
            options: [
              { label: "Pending", value: "Pending" },
              { label: "Processing", value: "Processing" },
              { label: "Rejected", value: "Rejected" },
              { label: "Completed", value: "Completed" },
            ],
          },
          {
            key: "paymentMethod",
            label: "Payment Method",
            placeholder: "All Methods",
            options: [
              { label: "UPI", value: "UPI" },
              { label: "Card", value: "Card" },
              { label: "Net Banking", value: "Net Banking" },
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
        data={filteredRefunds}
        loading={isLoading}
        rowKey="id"
        page={safePage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        emptyMessage={
          <EmptyState
            icon={MdCurrencyExchange}
            iconSize={26}
            variant="minimal"
            size="sm"
            title="No refunds found"
            description="No refunds match your search or filter criteria. Try adjusting your filters."
          />
        }
      />
    </div>

  );
};

export default Refunds;