import React, { useRef, useState } from "react";

// icons
import { MdPerson, MdEdit } from "react-icons/md";

// components
import Image from "../components/media/Image";
import Button from "../components/Button";
import Loader from '../components/Loader';

const ProfileImageUpload = ({
    value,
    onChange,
    size = 120,
    maxSizeMB = 5,
    disabled = false,
    loading = false,
    helperText = `JPG, PNG or WEBP. Max size: ${maxSizeMB}MB.`,
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

        setPreview(URL.createObjectURL(file));
        onChange?.(file);
        e.target.value = "";
    };

    return (
        <div className="self-start">
            <div
                className="relative overflow-hidden rounded-xl border-4 border-white bg-gray-100 shadow-md"
                style={{ width: size, height: size }}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        <MdPerson size={size * 0.6} />
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
                        <Loader variant="dots" text=" Uploading..." color="green" />
                    </div>
                )}

                <Button
                    type="button"
                    icon={MdEdit}
                    iconSize={13}
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled}
                    className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-1 text-white shadow hover:bg-blue-700 disabled:opacity-50"
                    aria-label="Change profile image"
                />
            </div>


            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
            />

            {helperText && (
                <p className="mt-2 text-xs text-gray-500">
                    {helperText}
                </p>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ProfileImageUpload;