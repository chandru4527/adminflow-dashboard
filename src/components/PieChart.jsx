import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const defaultColors = [
    "#EF4444",
    "#22C55E",
    "#3B82F6",
    "#EAB308",
    "#F97316",
    "#A855F7",
];

const PieChart = ({
    data = [],
    nameKey,
    dataKey,
    colors = defaultColors,
    height = 300,
    innerRadius = 0,
    outerRadius = 100,
    showLegend = true,
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={2}
                    stroke="none"
                >
                    {data.map((item, index) => (
                        <Cell
                            key={`${item[nameKey]}-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        fontSize: "12px",
                    }}
                />
                {showLegend && (
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "12px" }}
                    />
                )}
            </RechartsPieChart>
        </ResponsiveContainer>
    );
};

export default PieChart;