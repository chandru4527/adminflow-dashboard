import React from "react";
import { useDashboardStats } from "../../hooks/apiHooks";
import {
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444"];

const Dashboard = () => {
  const { data: stats, isLoading, isError } = useDashboardStats();
  console.log("Dashboard stats:", stats?.data);

  const cards = [
    {
      title: "Total Users",
      value: stats?.data?.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Chefs",
      value: stats?.data?.chefCount || 0,
      icon: <FaUserTie />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Customers",
      value: stats?.data?.customerCount || 0,
      icon: <FaUserFriends />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Bookings",
      value: stats?.data?.totalBookings || 0,
      icon: <FaClipboardList />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const bookingsSummaryData = [
    { name: "Total", value: stats?.data?.totalBookings || 0 },
    { name: "Today", value: stats?.data?.todayBookings || 0 },
    { name: "Yesterday", value: stats?.data?.yesterdayBookings || 0 },
  ];

  const bookingStatusData =
    stats?.data?.bookingStatusCounts?.map(({ _id, count }) => ({
      name: _id ? _id.charAt(0).toUpperCase() + _id.slice(1) : "",
      count: count ?? 0,
    }));

    console.log("Booking Status Data:", bookingStatusData);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load dashboard.</p>;

  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Status Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bookings Summary
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookingsSummaryData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                fill="#14ae5c"
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Booking Status
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookingStatusData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#14ae5c"
                radius={[8, 8, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;