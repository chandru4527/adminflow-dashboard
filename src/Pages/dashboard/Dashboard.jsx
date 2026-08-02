import React from "react";
import { useDashboardStats } from "../../hooks/apiHooks";
import {
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444"];

const Dashboard = () => {
  const { data: stats, isLoading, isError } = useDashboardStats();


  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Chefs",
      value: stats?.totalChefs || 0,
      icon: <FaUserTie />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers || 0,
      icon: <FaUserFriends />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: <FaClipboardList />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const bookingsSummaryData = [
    { name: "Total", value: stats?.totalBookings || 0 },
    { name: "Today", value: stats?.todayBookings || 0 },
    { name: "Yesterday", value: stats?.yesterdayBookings || 0 },
  ];

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
          Booking Status
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bookingsSummaryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >
                {bookingsSummaryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;