import React from "react";

// icons
import {
  MdPeople, MdPerson, MdInventory2, MdShoppingCart, MdCurrencyRupee, MdReceiptLong, MdPersonOff,
  MdCancel, MdDashboard, MdPersonAdd, MdPayments, MdLocalShipping,
} from "react-icons/md";

// Components
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

import StatCard from "../components/StatCard";
import AreaChartCard from "../components/charts/AreaChartCard";
import BarChartCard from "../components/charts/BarChartCard";
import PieChartCard from "../components/charts/PieChartCard";
import RecentActivities from "../components/RecentActivities";

// Hooks
import { useDashboard } from "../hooks/useDashboard";

// Utils
import { formatCurrency } from "../utils/formatters";

const Dashboard = () => {

  const { data, isLoading, isError, refetch, isFetching } = useDashboard();

  if (isError) {
    return (
      <EmptyState
        icon={MdDashboard}
        title="Failed to Load Dashboard"
        description="Something went wrong while fetching dashboard data."
        variant="minimal"
        action={
          <Button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            text={isFetching ? "Retrying..." : "Try Again"}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >

          </Button>
        }
      />
    );
  }

  const summary = data?.summary || {};
  const monthlyRevenue = data?.monthlyRevenue || [];
  const monthlyOrders = data?.monthlyOrders || [];
  const paymentStatus = data?.paymentStatus || [];

  const stats = [
    {
      title: "Total Users",
      value: summary.totalUsers || "...",
      icon: MdPeople,
      color: "text-blue-600",
      bg: "bg-blue-50",
      growth: isLoading ? "..." : 12,
      growthType: "up",
    },
    {
      title: "Active Users",
      value: summary.activeUsers || "...",
      icon: MdPerson,
      color: "text-green-600",
      bg: "bg-green-50",
      growth: isLoading ? "..." : 8,
      growthType: "up",
    },
    {
      title: "Inactive Users",
      value: summary.inactiveUsers || "...",
      icon: MdPersonOff,
      color: "text-amber-600",
      bg: "bg-amber-50",
      growth: isLoading ? "..." : 3,
      growthType: "down",
    },
    {
      title: "Total Products",
      value: summary.totalProducts || "...",
      icon: MdInventory2,
      color: "text-purple-600",
      bg: "bg-purple-50",
      growth: isLoading ? "..." : 6,
      growthType: "up",
    },
    {
      title: "Total Orders",
      value: summary.totalOrders || "...",
      icon: MdShoppingCart,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      growth: isLoading ? "..." : 15,
      growthType: "up",
    },
    {
      title: "Cancelled Orders",
      value: summary.cancelledOrders || "...",
      icon: MdCancel,
      color: "text-red-600",
      bg: "bg-red-50",
      growth: isLoading ? "..." : 2,
      growthType: "down",
    },
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
      color: "text-pink-600",
      bg: "bg-pink-50",
      growth: isLoading ? "..." : 10,
      growthType: "up",
    },
  ];


  const activityConfig = {
    user: {
      icon: MdPersonAdd,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    order: {
      icon: MdShoppingCart,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    payment: {
      icon: MdPayments,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    product: {
      icon: MdInventory2,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    delivery: {
      icon: MdLocalShipping,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  };

  return (
    <div className="space-y-6">

      <PageHeader
        titleIcon={MdDashboard}
        title="Welcome back, Admin! 👋"
        description="Get an overview of your products, customers, orders, and store performance."
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
        description="Track your store's revenue performance throughout the year."
        totalValue={summary?.totalRevenue || 0}
        data={monthlyRevenue}
        dataKey="revenue"
        formatter={formatCurrency}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">

        <BarChartCard
          title="Monthly Orders"
          description="Track the number of orders received throughout the year."
          totalValue={summary?.totalOrders || 0}
          data={monthlyOrders}
          dataKey="orders"
        />

        <PieChartCard
          title="Payment Status"
          description="Overview of successful, pending, and failed payments."
          data={paymentStatus}
          nameKey="name"
          dataKey="value"
          colors={["#16A34A", "#F59E0B", "#EF4444"]}
          innerRadius={65}
        />

      </div>

      <RecentActivities
        activities={data?.recentActivities || []}
        onViewAll={() => { }}
      />

    </div>
  );
};

export default Dashboard;