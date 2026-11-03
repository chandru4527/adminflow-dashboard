import { useState } from "react";
import { NavLink } from "react-router-dom";

const Tabs = ({
    items = [],
    type = "button",
    defaultTab,
    activeTab,
    onChange,
    variant = "underline",
    size = "md",
    fullWidth = false,
    className = "",
}) => {
    const [internalTab, setInternalTab] = useState(defaultTab ?? items[0]?.value);
    const selectedTab = activeTab !== undefined ? activeTab : internalTab;

    const handleChange = (value) => {
        if (activeTab === undefined) setInternalTab(value);
        onChange?.(value);
    };

    const sizes = {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-3.5 text-base",
    };

    const getClasses = (isActive) => {
        const styles = {
            underline: isActive
                ? "text-[#AC1E44] border-[#AC1E44]"
                : "text-gray-500 border-transparent hover:text-[#AC1E44]",
            pill: isActive
                ? "bg-[#AC1E44] text-white rounded-lg shadow-sm"
                : "text-gray-500 hover:bg-gray-100 rounded-lg",
            soft: isActive
                ? "bg-[#AC1E44]/10 text-[#AC1E44] rounded-lg"
                : "text-gray-500 hover:bg-gray-100 rounded-lg",
        };

        return `
      inline-flex items-center justify-center gap-2 whitespace-nowrap
      font-medium transition-all duration-200
      ${sizes[size]}
      ${styles[variant] || styles.underline}
      ${variant === "underline" ? "border-b-4 -mb-px" : ""}
    `;
    };

    const renderLabel = (item) => (
        <>
            {item.icon && <item.icon size={17} />}
            <span>{item.label}</span>
            {item.count !== undefined && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {item.count}
                </span>
            )}
        </>
    );

    const containerClass = `
    flex items-center gap-1 overflow-x-auto bg-white scrollbar-none rounded-md
    ${variant === "underline" ? "border-b border-gray-200" : ""}
    ${className}
  `;

    if (type === "navlink") {
        return (
            <div className={containerClass}>
                {items.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => `
              ${getClasses(isActive)}
              ${fullWidth ? "flex-1" : ""}
            `}
                    >
                        {renderLabel(item)}
                    </NavLink>
                ))}
            </div>
        );
    }

    return (
        <div className={containerClass}>
            {items.map(item => {
                const isActive = selectedTab === item.value;

                return (
                    <button
                        key={item.value}
                        type="button"
                        disabled={item.disabled}
                        onClick={() => handleChange(item.value)}
                        className={`
              ${getClasses(isActive)}
              ${fullWidth ? "flex-1" : ""}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
                    >
                        {renderLabel(item)}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;