import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BarChartCard = ({
  title,
  description,
  totalValue,
  data = [],
  dataKey,
  xAxisKey = "month",
  color = "#AC1E44",
  formatter,
  height = 300,
}) => {
  const formatValue = (value) => formatter ? formatter(value) : value;

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        {totalValue !== undefined && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-500">Total Orders</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatValue(totalValue)}
            </p>
          </div>
        )}
      </div>
      <div className="w-full min-w-0" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
              tickMargin={8}
            />
            <YAxis
              width={50}
              allowDecimals={false}
              tick={{ fontSize: 11 }}
              tickFormatter={formatValue}
            />
            <Tooltip formatter={formatValue} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[5, 5, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;