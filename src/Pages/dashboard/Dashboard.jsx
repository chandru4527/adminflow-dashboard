import React from "react";
import { useDashboardStats } from "../../hooks/apiHooks";
import LodingPage from '../../components/LoadingPage'
import {
  MdGroups, MdRestaurant, MdPerson, MdEventNote, MdVolunteerActivism, MdHistory,
  MdToday, MdChecklist,
} from "react-icons/md";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from "recharts";

const Dashboard = () => {
  const { data: stats, isLoading, isError } = useDashboardStats();
  console.log("Dashboard stats:", stats?.data);

  const cards = [
    {
      title: "Total Users",
      value: stats?.data?.totalUsers || 0,
      icon: <MdGroups />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Chefs",
      value: stats?.data?.chefCount || 0,
      icon: <MdRestaurant />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Customers",
      value: stats?.data?.customerCount || 0,
      icon: <MdPerson />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Bookings",
      value: stats?.data?.totalBookings || 0,
      icon: <MdEventNote />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Donations",
      value: stats?.data?.totalDonations || 0,
      icon: <MdVolunteerActivism />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Yesterday Bookings",
      value: stats?.data?.yesterdayBookings || 0,
      icon: <MdHistory />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Today Bookings",
      value: stats?.data?.todayBookings || 0,
      icon: <MdToday />,
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Total Booking Status Count",
      value: stats?.data?.bookingStatusCounts?.length || 0,
      icon: <MdChecklist />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const bookingsSummaryData = [
    { name: "Total", value: stats?.data?.totalBookings || 0 },
    { name: "Today", value: stats?.data?.todayBookings || 0 },
    { name: "Yesterday", value: stats?.data?.yesterdayBookings || 0 },
  ];

  const bookingStatusData = stats?.data?.bookingStatusCounts?.map(({ _id, count }) => ({
    name: _id ? _id.charAt(0).toUpperCase() + _id.slice(1) : "",
    count: count ?? 0,
  }));

  const userDistributionData = [
    { name: "Chefs", value: stats?.data?.chefCount || 0 },
    { name: "Customers", value: stats?.data?.customerCount || 0 },
  ];

  if (isLoading) return <LodingPage/>
  if (isError) return <p>Failed to load dashboard.</p>;

  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">{card.title}</p>
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">
          Bookings Summary
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookingsSummaryData}
              barCategoryGap="10%"
              barGap={2}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                barSize={60}
                dataKey="value"
                radius={[4, 4, 0, 0]}
                fill="#2563EB"
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Booking Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            Booking Status
          </h2>

          <div className="h-64 md:h-72 lg:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingStatusData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {bookingStatusData.map((entry, index) => {
                    const colorMap = {
                      active: "#2563EB",      // Blue
                      completed: "#16A34A",   // Green
                      upcoming: "#F97316",    // Orange
                      canceled: "#DC2626",    // Red
                      cancelled: "#DC2626",   // Red (British spelling)
                    };

                    return (
                      <Cell
                        key={`status-${index}`}
                        fill={colorMap[entry.name?.toLowerCase()] || "#6366F1"}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold">Users</h5>
          </div>

          {userDistributionData.some((item) => item.value > 0) ? (
            <div className="h-64 md:h-72 lg:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell
                        key={`user-${entry.name}-${index}`}
                        fill={entry.name === "Chefs" ? "#10B981" : "#3B82F6"}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 md:h-72 lg:h-80 text-gray-500">
              No user data
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;