import { MdTrendingUp, MdTrendingDown, MdTrendingFlat } from "react-icons/md";

const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    bg,
    description,
    growth,
    growthType = "up",
    className = "",
}) => {
    const growthStyles = {
        up: {
            icon: MdTrendingUp,
            className: "text-green-600",
            text: "increase",
        },
        down: {
            icon: MdTrendingDown,
            className: "text-red-600",
            text: "decrease",
        },
        neutral: {
            icon: MdTrendingFlat,
            className: "text-gray-500",
            text: "no change",
        },
    };

    const GrowthIcon = growthStyles[growthType].icon;

    return (
        <div className={`rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-800">{value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`text-2xl ${color}`} />
                </div>
            </div>

            {description && (
                <p className="mt-3 text-sm text-gray-500">{description}</p>
            )}

            {growth !== undefined && (
                <div className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${growthStyles[growthType].className}`}>
                    <GrowthIcon className="text-lg" />
                    <span>{growth}% {growthStyles[growthType].text}</span>
                    <span className="font-normal text-gray-400">from last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;