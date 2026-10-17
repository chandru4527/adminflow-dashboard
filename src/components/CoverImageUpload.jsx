import React, { useRef, useState } from "react";

// icons
import { MdImage, MdEdit } from "react-icons/md";

// components
import Image from "../components/media/Image";
import Button from "../components/Button";
import Loader from "../components/Loader";

const CoverImageUpload = ({
    value,
    onChange,
    height = 180,
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
            <div className="relative h-32 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:h-40 md:h-48 lg:h-56">
                {preview ? (
                    <Image
                        src={preview}
                        alt="Cover image"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                        <MdImage size={32} className="sm:h-9 sm:w-9 md:h-10 md:w-10" />
                        <span className="text-xs sm:text-sm">No cover image selected</span>
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
                    className="absolute bottom-2 right-2 rounded-lg bg-white p-2 text-green-700 shadow-md hover:bg-gray-100 disabled:opacity-50 sm:bottom-3 sm:right-3"
                    aria-label="Change cover image"
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

export default CoverImageUpload;