import React from "react";

// icons
import {
    MdPersonAdd, MdShoppingCart, MdPayments, MdInventory2, MdLocalShipping, MdHistory, MdArrowForward,
} from "react-icons/md";

// componnets
import Button from "./Button";
import Container from "./Container";

// utils
import { formatDateTime } from "../utils/formatters";

const activityConfig = {
    user: {
        icon: MdPersonAdd,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    order: {
        icon: MdShoppingCart,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    payment: {
        icon: MdPayments,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    product: {
        icon: MdInventory2,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    delivery: {
        icon: MdLocalShipping,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
};

const RecentActivities = ({ activities = [], onViewAll }) => {
    return (
        <Container className="w-full rounded-md border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MdHistory className="text-xl text-[#AC1E44]" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        Recent Activities
                    </h3>
                </div>
                <Button
                    type="button"
                    icon={MdArrowForward}
                    onClick={onViewAll}
                    text="    View All  "
                    className="flex items-center gap-1 text-sm font-medium transition"
                />
            </div>

            <div className="divide-y divide-gray-100">
                {activities.length > 0 ? (
                    activities.map((activity) => {
                        const config = activityConfig[activity.type] || {
                            icon: MdHistory,
                            color: "text-gray-600",
                            bg: "bg-gray-50",
                        };
                        const Icon = config.icon;

                        return (
                            <div
                                key={activity.id}
                                className="flex items-center gap-3 py-4"
                            >
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${config.bg} ${config.color}`}
                                >
                                    <Icon className="text-xl" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        {activity.title}
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {activity.description}
                                    </p>
                                </div>

                                <span className="shrink-0 text-xs text-gray-400">
                                    {formatDateTime(activity.time)}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="py-8 text-center text-sm text-gray-500">
                        No recent activities found.
                    </p>
                )}
            </div>
        </Container>
    );
};

export default RecentActivities;