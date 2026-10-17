import { twMerge } from "tailwind-merge";

const Image = ({
    src,
    alt = "",
    className = "",
    wrapperClassName = "",
    loading = "lazy",
    ...props
}) => {
    return (
        <div className={twMerge("overflow-hidden", wrapperClassName)}>
            <img
                src={src}
                alt={alt}
                loading={loading}
                className={twMerge("block w-full h-auto object-cover", className)}
                {...props}
            />
        </div>
    );
};

export default Image;