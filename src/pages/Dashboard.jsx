import React, { useMemo } from 'react';

// icons
import {
  MdCurrencyRupee, MdCategory, MdDashboard, MdInventory2, MdPeople, MdShoppingBasket, MdShoppingCart, MdStar, MdTrendingDown, MdTrendingUp, MdWarningAmber

} from 'react-icons/md';

// components
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';

// charts
import BarChart from '../components/BarChart';
import RevenueChart from "../components/RevenueChart";
import PieChart from "../components/PieChart";

import { useAllData } from '../hooks/useHooks';

const Dashboard = () => {

  const { data, isLoading } = useAllData();

  console.log(data);

  const revenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15800 },
    { month: "Mar", revenue: 14200 },
    { month: "Apr", revenue: 18900 },
    { month: "May", revenue: 17500 },
    { month: "Jun", revenue: 22100 },
    { month: "Jul", revenue: 19800 },
    { month: "Aug", revenue: 25600 },
    { month: "Sep", revenue: 23400 },
    { month: "Oct", revenue: 28900 },
    { month: "Nov", revenue: 31200 },
    { month: "Dec", revenue: 35800 },
  ];

  const totalRevenue = revenueData.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      change: "+12.5%",
      trend: "up",
      description: "Total revenue this year",
      icon: MdCurrencyRupee,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Total Orders",
      value: "1,250",
      change: "+8.2%",
      trend: "up",
      description: "Compared to last month",
      icon: MdShoppingCart,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Total Products",
      value: "856",
      change: "+4.6%",
      trend: "up",
      description: "Compared to last month",
      icon: MdInventory2,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },
    {
      title: "Total Customers",
      value: "2,840",
      change: "+10.3%",
      trend: "up",
      description: "Compared to last month",
      icon: MdPeople,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
    {
      title: "Low Stock Products",
      value: "12",
      change: "-3",
      trend: "down",
      description: "Products need restocking",
      icon: MdWarningAmber,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
    },
    {
      title: "Total Categories",
      value: "24",
      change: "+2",
      trend: "up",
      description: "Product categories",
      icon: MdCategory,
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50",
    },
    {
      title: "Top-Rated Products",
      value: "48",
      change: "+6",
      trend: "up",
      description: "Products rated 4.5+",
      icon: MdStar,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50",
    },
    {
      title: "Total Cart Items",
      value: "320",
      change: "+5.4%",
      trend: "up",
      description: "Items across all carts",
      icon: MdShoppingBasket,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-50",
    },
  ];

  // 
  const getCategoryData = (products = [], limit = 6) => {
    const categoryMap = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.entries(categoryMap)
      .map(([category, total]) => ({
        category: category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        total,
      }))
      .sort((a, b) => b.total - a.total);

    const topCategories = categories.slice(0, limit);
    const othersTotal = categories
      .slice(limit)
      .reduce((total, item) => total + item.total, 0);

    if (othersTotal > 0) {
      topCategories.push({ category: "Others", total: othersTotal });
    }

    return topCategories;
  };

  const categoryData = useMemo(
    () => getCategoryData(data?.totalProducts?.products ?? []),
    [data?.totalProducts?.products]
  );

  const ordersOverview = useMemo(() => {
    const carts = data?.totalCarts?.carts ?? [];

    const distribution = carts.reduce(
      (acc, cart) => {
        if (cart.totalProducts <= 2) {
          acc.small += 1;
        } else if (cart.totalProducts <= 5) {
          acc.medium += 1;
        } else {
          acc.large += 1;
        }
        return acc;
      },
      { small: 0, medium: 0, large: 0 }
    );

    return [
      { status: "1–2 Products", total: distribution.small },
      { status: "3–5 Products", total: distribution.medium },
      { status: "6+ Products", total: distribution.large },
    ];
  }, [data?.totalCarts?.carts]);


  return (
    <div className='space-y-5'>

      {/* header */}
      <PageHeader
        titleIcon={MdDashboard}
        title="Welcome back, Admin! 👋"
        description="Get an overview of your products, customers, orders, and store performance."
      />

      {/* stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const TrendIcon =
            item.trend === "up" ? MdTrendingUp : MdTrendingDown;

          return (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>

                  <p className="text-sm font-medium text-slate-600">
                    {item.title}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    {isLoading ? "..." : item.value}
                  </h3>
                </div>
                <div className={`rounded-xl p-3 ${item.iconBg}`}>
                  <Icon className={`text-2xl ${item.iconColor}`} />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${item.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                    }`}
                >
                  <TrendIcon className="text-sm" />
                  {item.change}
                </span>
                <span className="text-xs text-slate-400">
                  {item.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* revenue */}
      <Container >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Revenue Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue from January to December
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
            <MdTrendingUp className="text-xl text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Annual Overview
            </span>
          </div>
        </div>
        <RevenueChart data={revenueData} />
      </Container>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Container>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Products by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Product distribution across the top categories
            </p>
          </div>
          <BarChart
            data={categoryData}
            xAxisKey="category"
            dataKey="total"
            barName="Products"
            height={320}
          />
        </Container>

        <Container>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Orders Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cart distribution by number of products
            </p>
          </div>
          <PieChart
            data={ordersOverview}
            nameKey="status"
            dataKey="total"
            innerRadius={65}
            outerRadius={100}
            height={320}
          />

        </Container>
      </div>

      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
            <p className="mt-1 text-sm text-slate-500">
              Overview of recently created carts
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            onClick={() => window.location.href = "/admin/orders"}
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-semibold">Cart ID</th>
                <th className="px-4 py-3 font-semibold">Customer ID</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold">Quantity</th>
                <th className="px-4 py-3 font-semibold">Total Amount</th>
                <th className="px-4 py-3 font-semibold">Discounted Total</th>
              </tr>
            </thead>
            <tbody>
              {(data?.totalCarts?.carts ?? []).slice(0, 5).map((cart) => (
                <tr
                  key={cart.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    #{cart.id}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    #{cart.userId}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {cart.totalProducts}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {cart.totalQuantity}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    ${Number(cart.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-4 font-medium text-emerald-600">
                    ${Number(cart.discountedTotal).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
              {!isLoading && !(data?.totalCarts?.carts?.length) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No cart data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>

    </div>
  )
}

export default Dashboard;