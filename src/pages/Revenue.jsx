import React from "react";
import {
    MdAccountBalance, MdCurrencyExchange, MdCurrencyRupee, MdError, MdPayments,
    MdPendingActions, MdReceiptLong, MdTrendingUp
} from "react-icons/md";

// components
import Badge from "../components/Badge";
import PageHeader from "../components/PageHeader";
import Table from '../components/table/Table';

import StatCard from "../components/StatCard";
import AreaChartCard from "../components/charts/AreaChartCard";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartCard from "../components/charts/BarChartCard";

// hooks
import { useRevenue } from "../hooks/useRevenue";

// utils
import { formatCurrency, formatDateTime } from "../utils/formatters";

const Revenue = () => {

    const { data, isLoading, isError, isFetching, refetch } = useRevenue();

    // stats
    const summary = data?.summary || {};
    const stats = [
        {
            title: "Total Revenue",
            value: formatCurrency(summary.totalRevenue || 0),
            icon: MdCurrencyRupee,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            growth: isLoading ? "..." : 18,
            growthType: "up",
        },
        {
            title: "Total Transactions",
            value: summary.totalTransactions || "...",
            icon: MdReceiptLong,
            color: "text-blue-600",
            bg: "bg-blue-50",
            growth: isLoading ? "..." : 10,
            growthType: "up",
        },
        {
            title: "Successful Payments",
            value: summary.successfulPayments || "...",
            icon: MdPayments,
            color: "text-green-600",
            bg: "bg-green-50",
            growth: isLoading ? "..." : 15,
            growthType: "up",
        },
        {
            title: "Pending Payments",
            value: summary.pendingPayments || "...",
            icon: MdPendingActions,
            color: "text-amber-600",
            bg: "bg-amber-50",
            growth: isLoading ? "..." : 5,
            growthType: "down",
        },
        {
            title: "Failed Payments",
            value: summary.failedPayments || "...",
            icon: MdError,
            color: "text-red-600",
            bg: "bg-red-50",
            growth: isLoading ? "..." : 3,
            growthType: "down",
        },
        {
            title: "Refunded Amount",
            value: formatCurrency(summary.refundedAmount || 0),
            icon: MdCurrencyExchange,
            color: "text-purple-600",
            bg: "bg-purple-50",
            growth: isLoading ? "..." : 4,
            growthType: "down",
        },
        {
            title: "Average Transaction",
            value: formatCurrency(summary.averageTransaction || 0),
            icon: MdTrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            growth: isLoading ? "..." : 8,
            growthType: "up",
        },
        {
            title: "Total Tax",
            value: formatCurrency(summary.totalTax || 0),
            icon: MdAccountBalance,
            color: "text-pink-600",
            bg: "bg-pink-50",
            growth: isLoading ? "..." : 6,
            growthType: "up",
        },
    ];

    // breakdown
    const refundedAmount = summary.refundedAmount || 0;
    const totalRevenue = summary.totalRevenue || 0;
    const totalTax = summary.totalTax || 0;
    const breakdown = [
        {
            title: "Gross Revenue",
            value: formatCurrency(totalRevenue + refundedAmount),
            description: "Total revenue before refunds",
            icon: MdTrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            title: "Total Tax",
            value: formatCurrency(totalTax),
            description: "Total tax collected",
            icon: MdAccountBalance,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Refunded Amount",
            value: formatCurrency(refundedAmount),
            description: "Total amount refunded",
            icon: MdCurrencyExchange,
            color: "text-red-600",
            bg: "bg-red-50",
        },
        {
            title: "Net Revenue",
            value: formatCurrency(totalRevenue - refundedAmount),
            description: "Revenue after refunds",
            icon: MdPayments,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    // recent transaction
    const transactions = data?.recentTransactions || [];

    const columns = [
        {
            key: "transactionId",
            header: "Transaction ID",
            render: (row) => <p className="text-xs font-semibold">{row?.transactionId}</p>,
            nowrap: true,
        },
        {
            key: "orderId",
            header: "Order ID",
            render: (row) => <p className="text-xs font-semibold">{row?.orderId}</p>,
            nowrap: true,
        },
        {
            key: "customerName",
            header: "Customer",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-800">{row.customerName}</p>
                    <p className="text-xs text-gray-500">{row.customerEmail}</p>
                </div>
            ),
        },
        {
            key: "paymentMethod",
            header: "Payment",
        },
        {
            key: "paymentProvider",
            header: "Provider",
        },
        {
            key: "amount",
            header: "Amount",
            render: (row) => (
                <span className="font-semibold">{formatCurrency(row.amount)}</span>
            ),
        },
        {
            key: "paymentStatus",
            header: "Status",
            render: (row) => (
                <Badge
                    variant={
                        row.paymentStatus === "Success"
                            ? "success"
                            : row.paymentStatus === "Pending"
                                ? "warning"
                                : "danger"
                    }
                >
                    {row.paymentStatus}
                </Badge>
            ),
        },
        {
            key: "transactionDate",
            header: "Date & Time",
            render: (row) => formatDateTime(row.transactionDate),
            nowrap: true,
        },
    ];

    return (
        <div className="space-y-5">
            <PageHeader
                titleIcon={MdCurrencyRupee}
                title="Revenue Overview"
                description="Monitor revenue, payments, refunds, and your platform's financial performance."

                onRefresh={refetch}
                refreshLoading={isLoading || isFetching}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        {...stat}
                    />
                ))}
            </div>

            <AreaChartCard
                title="Monthly Revenue"
                description="Track your monthly revenue performance throughout the year."
                totalValue={summary?.totalRevenue || 0}
                data={data?.monthlyRevenue || []}
                dataKey="revenue"
                xAxisKey="month"
                formatter={formatCurrency}
                color="blue"
                height={320}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {breakdown.map((item) => (
                    <StatCard key={item.title} {...item} />
                ))}
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">

                <BarChartCard
                    title="Payment Methods"
                    description="Compare transactions across different payment methods."
                    totalValue={summary.totalTransactions || 0}
                    data={data?.paymentMethods || []}
                    dataKey="transactions"
                    xAxisKey="name"
                    color="#AC1E44"
                    height={320}
                />

                <PieChartCard
                    title="Payment Status"
                    innerRadius={true}
                    description="Overview of successful, pending, and failed payments."
                    totalValue={summary.totalTransactions || 0}
                    data={data?.paymentStatus || []}
                    nameKey="name"
                    dataKey="value"
                    colors={["#16A34A", "#F59E0B", "#EF4444"]}
                    height={320}
                />

            </div>


            <Table
                columns={columns}
                data={transactions}
                loading={isLoading}
                rowKey="id"
                pageSize={10}
                pagination={false}
            />

        </div>
    );
};

export default Revenue;