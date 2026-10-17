import { twMerge } from "tailwind-merge";

const Container = ({
    children,
    className = "",
    padding = "md",
    rounded = "md",
    shadow = "sm",
    ...props
}) => {
    const paddings = {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
    };

    const roundedStyles = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
    };

    const shadows = {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
    };

    return (
        <div
            className={twMerge(
                "w-full bg-white",
                paddings[padding] || paddings.md,
                roundedStyles[rounded] || roundedStyles.md,
                shadows[shadow] || shadows.sm,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;