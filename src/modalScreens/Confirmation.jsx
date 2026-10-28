import React from "react";
import { MdDelete } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Confirmation = ({
    icon: Icon = MdDelete,
    iconClassName = "",
    title,
    message,
    data,
    dataClassName = "",
    variant = "danger",
    children,
    className = "",
}) => {
    const variants = {
        danger: { icon: "bg-red-50 text-red-600" },
        warning: { icon: "bg-yellow-50 text-yellow-600" },
        success: { icon: "bg-green-50 text-green-600" },
        info: { icon: "bg-blue-50 text-blue-600" },
        primary: { icon: "bg-[#AC1E44]/10 text-[#AC1E44]" },
    };

    const currentVariant = variants[variant] || variants.danger;

    return (
        <div className={twMerge("flex flex-col items-center text-center", className)}>
            {Icon && (
                <div
                    className={twMerge(
                        "mb-2 flex h-12 w-12 items-center justify-center rounded-md",
                        currentVariant.icon,
                        iconClassName
                    )}
                >
                    <Icon size={24} />
                </div>
            )}
            {title && (
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            )}
            {message && (
                <p className="mt-2 text-sm leading-5 text-gray-600">{message}</p>
            )}
            {data && (
                <div className={twMerge("mt-3 w-full px-4 py-3 text-sm font-medium text-gray-900", dataClassName)}>
                    {data}
                </div>
            )}
            {children && <div className="mt-3 w-full">{children}</div>}
        </div>
    );
};

export default Confirmation;