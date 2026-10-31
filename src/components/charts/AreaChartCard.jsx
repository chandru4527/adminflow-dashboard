import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const AreaChartCard = ({
    title,
    description,
    totalValue,
    data = [],
    dataKey,
    xAxisKey = "month",
    color = "blue",
    formatter,
    height = 300,
    valuePrefix = "",
    valueSuffix = "",
}) => {
    const gradientId = `area-gradient-${dataKey}`;
    const formatValue = (value) => {
        if (formatter) return formatter(value);
        return `${valuePrefix}${value}${valueSuffix}`;
    };

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
                {totalValue !== undefined && (
                    <div className="mt-3">
                        <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {formatValue(totalValue)}
                        </p>
                    </div>
                )}
            </div>
            <div className="w-full min-w-0" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} interval="preserveStartEnd" tickMargin={8} />
                        <YAxis width={65} tick={{ fontSize: 11 }} tickFormatter={formatValue} />
                        <Tooltip formatter={formatValue} />
                        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} activeDot={{ r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AreaChartCard;