import {
    BarChart as RechartsBarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const defaultColors = [
    "#AC1E44",
    "#2563EB",
    "#16A34A",
    "#D97706",
    "#7C3AED",
    "#0891B2",
    "#DB2777",
    "#4F46E5",
];

const BarChart = ({
    data = [],
    xAxisKey,
    dataKey,
    barName = "Total",
    colors = defaultColors,
    height = 300,
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                />
                <XAxis
                    dataKey={xAxisKey}
                    tick={{ fontSize: 12, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: "#F9E8EE" }}
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        fontSize: "12px",
                    }}
                />
                <Bar
                    dataKey={dataKey}
                    name={barName}
                    radius={[5, 5, 0, 0]}
                    maxBarSize={45}
                >
                    {data.map((item, index) => (
                        <Cell
                            key={`${item[xAxisKey]}-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Bar>
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart;