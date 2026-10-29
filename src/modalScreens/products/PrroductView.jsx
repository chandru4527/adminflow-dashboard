import React, { useState } from "react";

// Icons
import {
    MdInventory2, MdCategory, MdLocalOffer, MdStar, MdCheckCircle, MdCancel, MdVerified, MdImage, MdCalendarMonth,
    MdSell, MdOutlineShoppingCart, MdTag, MdColorLens, MdBluetooth, MdBatteryChargingFull, MdSecurity, MdAccessTime,
} from "react-icons/md";

// Components
import Badge from "../../components/Badge";
import Image from "../../components/media/Image";
import EmptyState from "../../components/EmptyState";
import Container from "../../components/Container";

// utils
import { formatCurrency, formatDate } from '../../utils/formatters';

const ProductView = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <EmptyState
                icon={MdInventory2}
                size="md"
                variant="minimal"
                title="Product Not Found"
                description="No product information is available to display."
            />
        );
    }

    const {
        name, description, shortDescription, category, brand, price, originalPrice, offer, images = [], stock, isActive, isFeatured, rating, reviewsCount, tags = [], specifications = {}, createdAt, updatedAt,
    } = product;

    const discountPercentage = originalPrice > 0 && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const specificationIcons = {
        color: MdColorLens,
        connectivity: MdBluetooth,
        batteryLife: MdBatteryChargingFull,
        warranty: MdSecurity,
    };

    const formatLabel = (value) => value.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase());

    const offerIsValid =
        offer?.isActive &&
        (!offer.startDate || new Date(offer.startDate) <= new Date()) &&
        (!offer.endDate || new Date(offer.endDate) >= new Date());

    return (
        <div className="space-y-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex items-start gap-3">

                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-gray-900">
                            {name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 font-semibold">
                            {brand || "Unknown Brand"}
                            {"  "}
                            <span className="text-purple-600">{category || "Uncategorized"}</span>
                        </p>


                    </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">

                    <Badge variant={isActive ? "success" : "danger"} text={isActive ? "Active" : "Inactive"} />

                    {isFeatured && (
                        <Badge variant="primary" text="Featured" />
                    )}
                </div>

            </div>

            {/* Product Images and Price */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                <div className="space-y-3">
                    <Container className="relative flex h-72 items-center overflow-hidden justify-center sm:h-80 p-0! 
                    border border-gray-300 rounded-md">
                        {images.length > 0 ? (
                            <Image
                                src={images[selectedImage] || images[0]}
                                alt={name}
                                wrapperClassName="flex h-full w-full items-center justify-center"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <EmptyState
                                icon={MdImage}
                                variant="minimal"
                                size="sm"
                                title="No Product Image"
                                description="No images are available for this product."
                            />
                        )}

                        {discountPercentage > 0 && (
                            <Badge rounded="md" className="absolute left-4 top-4 bg-red-500 px-3 py-1 text-xs font-bold text-white">
                                {discountPercentage}% OFF
                            </Badge>
                        )}
                    </Container>

                    {images.length > 0 && (
                        <div className="grid grid-cols-4 gap-3">
                            {images.map((image, index) => (
                                <div
                                    key={`${image}-${index}`}
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`View product image ${index + 1}`}
                                    aria-pressed={selectedImage === index}
                                    className={`flex h-20 items-center justify-center overflow-hidden rounded-md border-2 bg-gray-50 transition sm:h-24 ${selectedImage === index
                                        ? "border-[#AC1E44]"
                                        : "border-gray-200 hover:border-[#AC1E44]"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${name} ${index + 1}`}
                                        wrapperClassName="flex h-full w-full items-center justify-center"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-5">
                    <Container className="shadow-none">
                        <p className="text-sm font-bold text-gray-500">
                            Selling Price
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-3xl font-bold text-gray-900">
                                {formatCurrency(price)}
                            </h3>

                            {originalPrice > price && (
                                <span className="text-base text-gray-400 line-through">
                                    {formatCurrency(originalPrice)}
                                </span>
                            )}
                        </div>

                        {discountPercentage > 0 && (
                            <p className="mt-2 text-sm font-medium text-green-600">
                                You save {formatCurrency(originalPrice - price)} (
                                {discountPercentage}% off)
                            </p>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="rounded-md bg-gray-50 p-2.5">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <MdInventory2 className="text-base" />
                                    Stock
                                </div>
                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    {stock ?? 0} {" "}
                                    <span className="text-xs font-normal">
                                        {stock > 0 ? "Units available" : "Out of stock"}
                                    </span>
                                </p>
                            </div>
                            <div className="rounded-md bg-gray-50 p-2.5">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <MdStar className="text-base text-amber-500" />
                                    Rating
                                </div>
                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    {rating ?? 0} / 5 {" "}   <span className="text-xs font-normal">{reviewsCount ?? 0} reviews </span>
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-xs text-gray-400">Category</p>
                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {category || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Brand</p>
                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {brand || "N/A"}
                                </p>
                            </div>
                        </div>

                    </Container>

                    {/* Product Status */}
                    <Container className="shadow-none">
                        <h3 className="mb-3 font-semibold text-gray-900">
                            Product Status
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {isActive ? (
                                        <MdCheckCircle className="text-xl text-green-600" />
                                    ) : (
                                        <MdCancel className="text-xl text-red-500" />
                                    )}

                                    <span className="text-sm text-gray-700">
                                        Availability
                                    </span>
                                </div>

                                <span
                                    className={`text-sm font-semibold 
                                        ${isActive ? "text-green-600" : "text-red-500"}`}
                                >
                                    {isActive ? "Yes" : "No"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <MdVerified className="text-xl text-blue-500" />
                                    <span className="text-sm text-gray-700">
                                        Featured Product
                                    </span>
                                </div>

                                <span className="text-sm font-semibold text-gray-700">
                                    {isFeatured ? "Yes" : "No"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <MdOutlineShoppingCart className="text-xl text-gray-500" />
                                    <span className="text-sm text-gray-700">
                                        Inventory Status
                                    </span>
                                </div>

                                <span
                                    className={`text-sm font-semibold ${stock > 0 ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                        </div>
                    </Container>

                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                <Container className=" border border-transparent p-5 shadow-none">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                        <MdCategory className="text-xl text-[#AC1E44]" />
                        Product Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Short Description
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-700">
                                {shortDescription || "No short description available."}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Full Description
                            </p>

                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-700">
                                {description || "No description available."}
                            </p>
                        </div>

                    </div>
                </Container>

                {/* Specifications */}
                <div className=" p-5">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                        <MdSell className="text-xl text-[#AC1E44]" />
                        Specifications
                    </h3>

                    {Object.keys(specifications).length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {Object.entries(specifications).map(([key, value]) => {
                                const Icon = specificationIcons[key];

                                return (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            {Icon && <Icon className="text-lg" />}
                                            <span>{formatLabel(key)}</span>
                                        </div>

                                        <span className="text-right text-sm font-medium text-gray-800">
                                            {String(value)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No specifications available.
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {offer && (
                    <Container className="rounded-md border border-orange-200 bg-orange-50/60 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                <MdLocalOffer className="text-xl" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                    {offer.title || "Special Offer"}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {offer.discountPercentage ?? discountPercentage}% discount
                                </p>
                            </div>

                            <span
                                className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${offerIsValid
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {offerIsValid ? "Running" : "Not Running"}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">
                                    Start Date
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {formatDate(offer.startDate)}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    End Date
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {formatDate(offer.endDate)}
                                </p>
                            </div>
                        </div>
                    </Container>
                )}


                {/* Tags */}
                <div className=" p-5">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                        <MdTag className="text-xl text-[#AC1E44]" />
                        Product Tags
                    </h3>

                    {tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No tags available.
                        </p>
                    )}
                </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MdCalendarMonth className="text-xl" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Created At</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formatDate(createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <MdAccessTime className="text-xl" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formatDate(updatedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;