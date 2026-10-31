import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, } from "recharts";

const DEFAULT_COLORS = ["#16A34A", "#F59E0B", "#EF4444"];

const PieChartCard = ({
    title,
    description,
    totalValue,
    data = [],
    nameKey = "name",
    dataKey = "value",
    colors = DEFAULT_COLORS,
    innerRadius = 65,
    height = 300,
}) => {
    
    const total = totalValue ?? data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
                <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500">Total Payments</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {total.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            <div className="w-full min-w-0" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKey}
                            nameKey={nameKey}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={95}
                            paddingAngle={3}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`${entry[nameKey]}-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChartCard;