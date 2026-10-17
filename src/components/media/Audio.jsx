import { twMerge } from "tailwind-merge";

const Audio = ({
    src,
    className = "",
    wrapperClassName = "",
    controls = true,
    autoPlay = false,
    loop = false,
    muted = false,
    ...props
}) => {
    return (
        <div className={twMerge("w-full", wrapperClassName)}>
            <audio
                src={src}
                controls={controls}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                className={twMerge("w-full", className)}
                {...props}
            />
        </div>
    );
};

export default Audio;