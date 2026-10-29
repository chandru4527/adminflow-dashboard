import { useRef, useState } from "react";
import { MdCloudUpload, MdClose, MdImage } from "react-icons/md";
import EmptyState from "./EmptyState";

const ProductImageUpload = ({
    value = [],
    onChange,
    multiple = true,
    maxFiles = 4,
    maxSize = 5,
    accept = "image/png,image/jpeg,image/webp",
    error,
}) => {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFiles = (files) => {
        const selectedFiles = Array.from(files);
        const remainingSlots = multiple ? maxFiles - value.length : 1;
        const validFiles = [];
        let message = "";

        selectedFiles.forEach((file) => {
            if (!file.type.startsWith("image/") || !accept.split(",").includes(file.type)) {
                message = "Only JPG, PNG, and WEBP images are allowed.";
            } else if (file.size > maxSize * 1024 * 1024) {
                message = `${file.name} exceeds the ${maxSize} MB size limit.`;
            } else if (value.some((item) => item.name === file.name && item.size === file.size)) {
                message = `${file.name} has already been selected.`;
            } else {
                validFiles.push(file);
            }
        });

        const filesToAdd = validFiles.slice(0, Math.max(0, remainingSlots));

        if (validFiles.length > remainingSlots) {
            message = `You can upload a maximum of ${maxFiles} images.`;
        }

        const newFiles = filesToAdd.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
        }));

        onChange?.(multiple ? [...value, ...newFiles] : newFiles.slice(0, 1));
        setErrorMessage(message);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeImage = (index) => {
        const image = value[index];
        if (image?.preview?.startsWith("blob:")) URL.revokeObjectURL(image.preview);
        onChange?.(value.filter((_, i) => i !== index));
        setErrorMessage("");
    };

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                hidden
                onChange={(event) => handleFiles(event.target.files)}
            />

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    handleFiles(event.dataTransfer.files);
                }}
                disabled={value.length >= maxFiles}
                className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${dragging
                    ? "border-[#AC1E44] bg-[#AC1E44]/5"
                    : "border-gray-300 hover:border-[#AC1E44] hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <MdCloudUpload size={38} className="text-[#AC1E44]" />
                <span className="mt-2 text-sm font-semibold text-gray-700">
                    Click to upload or drag and drop
                </span>
                <span className="mt-1 text-xs text-gray-500">
                    JPG, PNG, WEBP · Maximum {maxSize} MB per image
                </span>
                <span className="mt-1 text-xs text-gray-500">
                    {value.length}/{maxFiles} images selected
                </span>
            </button>

            {(errorMessage || error) && (
                <p className="text-xs text-red-500">{errorMessage || error}</p>
            )}

            {value.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {value.map((image, index) => (
                        <div
                            key={`${image.name}-${index}`}
                            className="group relative overflow-hidden rounded-lg border border-gray-200"
                        >
                            <img
                                src={image.preview || image.url}
                                alt={image.name || `Product image ${index + 1}`}
                                className="h-32 w-full object-cover"
                            />
                            {index === 0 && (
                                <span className="absolute bottom-2 left-2 rounded bg-[#AC1E44] px-2 py-1 text-xs text-white">
                                    Primary
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                aria-label={`Remove image ${index + 1}`}
                                className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white shadow cursor-pointer"
                            >
                                <MdClose size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {value.length === 0 && (
               <EmptyState
               icon={MdImage}
               variant="minimal"
               size="sm"
               title="No images"
               description=""
               />
            )}
        </div>
    );
};

export default ProductImageUpload;