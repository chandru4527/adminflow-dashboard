import React, { useRef, useState } from "react";

// icons
import { MdImage, MdEdit } from "react-icons/md";

// components
import Image from "../components/media/Image";
import Button from "../components/Button";
import Loader from "../components/Loader";

const BannerImageUpload = ({
    value,
    onChange,
    maxSizeMB = 5,
    helperText = `JPG, PNG or WEBP. Max size: ${maxSizeMB}MB.`,
    disabled = false,
    loading = false,
}) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(value || "");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Please select a JPG, PNG, or WEBP image.");
            e.target.value = "";
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Image size must not exceed ${maxSizeMB}MB.`);
            e.target.value = "";
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setPreview((previous) => {
            if (previous?.startsWith("blob:")) {
                URL.revokeObjectURL(previous);
            }
            return imageUrl;
        });

        onChange?.(file);
        e.target.value = "";
    };

    return (
        <div className="w-full">
            <div className="relative h-40 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm sm:h-48 md:h-56">
                {preview ? (
                    <Image
                        src={preview}
                        alt="Banner preview"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                        <MdImage size={36} />
                        <span className="text-xs sm:text-sm">No banner image selected</span>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
                        <Loader variant="dots" text="Uploading..." color="green" />
                    </div>
                )}

                <Button
                    type="button"
                    icon={MdEdit}
                    iconSize={16}
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled || loading}
                    className="absolute right-3 bottom-3 rounded-lg bg-white p-2 text-green-700 shadow-md hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Change banner image"
                />
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={disabled || loading}
                className="hidden"
            />

            {helperText && (
                <p className="mt-2 text-xs text-gray-500">{helperText}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default BannerImageUpload;