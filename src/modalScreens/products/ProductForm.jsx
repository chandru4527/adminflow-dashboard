import { useState } from "react";

// forms
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// icons
import { MdAdd, MdClose, MdDelete, MdInventory2, MdLocalOffer, MdImage, MdOutlineCategory, MdMessage, } from "react-icons/md";

// components
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import Textarea from "../../components/forms/Textarea";
import Switch from "../../components/forms/Switch";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ProductImageUpload from "../../components/ProductImageUpload";

// store 
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from '../../utils/toastify';

const productSchema = z.object({
    name: z.string().trim().min(3, "Product name must contain at least 3 characters"),
    brand: z.string().trim().min(1, "Brand is required"),
    category: z.string().min(1, "Please select a category"),
    shortDescription: z.string().trim().min(10, "Enter at least 10 characters"),
    description: z.string().trim().min(20, "Enter at least 20 characters"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    originalPrice: z.coerce.number().positive("Original price must be greater than 0"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    offer: z.object({
        title: z.string(),
        discountPercentage: z.coerce.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
        isActive: z.boolean(),
        startDate: z.string(),
        endDate: z.string(),
    }),
    images: z.array(z.any()).min(1, "Upload at least one product image").max(10, "Maximum 10 images allowed"),
    tags: z.array(z.string()),
    specifications: z.array(
        z.object({
            key: z.string(),
            value: z.string(),
        })
    ),
}).refine((data) => data.originalPrice >= data.price, {
    message: "Original price must be greater than or equal to the selling price",
    path: ["originalPrice"],
});

const formatDateTime = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "";
    const localDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
};

const ProductForm = ({ product = null, formId, categories = [], mode = "add" }) => {

    const { openModal, closeModal, setActionLoading } = useModalStore();

    const [tagInput, setTagInput] = useState("");
    const [specification, setSpecification] = useState({ key: "", value: "" });

    const { register, handleSubmit, control, watch, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name ?? "",
            brand: product?.brand ?? "",
            category: product?.category ?? "",
            shortDescription: product?.shortDescription ?? "",
            description: product?.description ?? "",
            price: product?.price ?? "",
            originalPrice: product?.originalPrice ?? "",
            stock: product?.stock ?? 0,
            isActive: product?.isActive ?? true,
            isFeatured: product?.isFeatured ?? false,
            offer: {
                title: product?.offer?.title ?? "",
                isActive: product?.offer?.isActive ?? false,
                startDate: formatDateTime(product?.offer?.startDate),
                endDate: formatDateTime(product?.offer?.endDate),
            },
            images: (product?.images ?? []).map((image) =>
                typeof image === "string"
                    ? { url: image, preview: image, name: "Product image" }
                    : {
                        ...image,
                        preview: image.preview ?? image.url,
                        name: image.name ?? "Product image",
                    }
            ),
            tags: product?.tags ?? [],
            specifications: Array.isArray(product?.specifications)
                ? product.specifications
                : Object.entries(product?.specifications ?? {}).map(([key, value]) => ({
                    key,
                    value: String(value),
                })),
        },
    });

    const images = watch("images") ?? [];
    const tags = watch("tags") ?? [];
    const specifications = watch("specifications") ?? [];
    const price = Number(watch("price")) || 0;
    const originalPrice = Number(watch("originalPrice")) || 0;
    const discountPercentage = originalPrice > 0 && price > 0
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const addTag = () => {
        const tag = tagInput.trim();

        if (!tag || tags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
            return;
        }

        setValue("tags", [...tags, tag], { shouldDirty: true });
        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setValue("tags", tags.filter((tag) => tag !== tagToRemove), {
            shouldDirty: true,
        });
    };

    const addSpecification = () => {
        const key = specification.key.trim();
        const value = specification.value.trim();

        if (!key || !value) return;

        if (specifications.some((item) => item.key.toLowerCase() === key.toLowerCase())) {
            return;
        }

        setValue("specifications", [...specifications, { key, value }], {
            shouldDirty: true,
        });

        setSpecification({ key: "", value: "" });
    };

    const removeSpecification = (index) => {
        setValue(
            "specifications",
            specifications.filter((_, itemIndex) => itemIndex !== index),
            { shouldDirty: true }
        );
    };

    const onSubmit = (values) => {

        console.log(values);

        setActionLoading(true)

        setTimeout(() => {
            if (mode === "edit") {
                toastify.success("Product updated successfully!");
            } else {
                toastify.success("Product added successfully!");
            }

            setActionLoading(false);
            closeModal();
        }, 1000);
    };

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <Container className="p-0 shadow-none border-none">

                <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                        <ProductImageUpload
                            value={field.value || []}
                            onChange={field.onChange}
                            multiple
                            maxSize={5}
                            accept="image/jpeg,image/png,image/webp"
                            error={errors.images?.message}
                        />
                    )}
                />
            </Container>

            <Container className="space-y-4 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <MdInventory2 className="text-[#AC1E44]" size={20} />
                    Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Input
                        label="Product Name"
                        placeholder="Enter your product name"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Input
                        label="Brand"
                        placeholder="Enter your brand name"
                        error={errors.brand?.message}
                        {...register("brand")}
                    />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Category"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                options={categories.map((item) => ({
                                    label: item.name,
                                    value: item.name,
                                }))}
                                placeholder="Select category"
                                error={errors.category?.message}
                            />
                        )}
                    />

                    <Input
                        label="Stock Quantity"
                        type="number"
                        min="0"
                        error={errors.stock?.message}
                        {...register("stock")}
                    />

                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                label="Active"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                activeColor="bg-green-600"
                            />
                        )}
                    />

                    <Controller
                        name="isFeatured"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                label="Featured Product"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                activeColor="bg-green-600"
                            />
                        )}
                    />
                </div>

                <Textarea
                    label="Short Description"
                    icon={MdMessage}
                    rows={2}
                    placeholder="Enter a short product description"
                    error={errors.shortDescription?.message}
                    {...register("shortDescription")}
                />

                <Textarea
                    label="Full Description"
                    icon={MdMessage}
                    rows={4}
                    placeholder="Enter the complete product description"
                    error={errors.description?.message}
                    {...register("description")}
                />
            </Container>

            <Container className="space-y-4 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <MdLocalOffer className="text-[#AC1E44]" size={20} />
                    Pricing & Offers
                </h3>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Input
                        label="Selling Price (₹)"
                        type="number"
                        min="0"
                        placeholder="Enter selling price"
                        error={errors.price?.message}
                        {...register("price")}
                    />

                    <Input
                        label="Original Price (₹)"
                        type="number"
                        min="0"
                        placeholder="Enter original price"
                        error={errors.originalPrice?.message}
                        {...register("originalPrice")}
                    />

                    <div className="rounded-lg bg-gray-50 p-3 md:col-span-2">
                        <p className="text-sm text-gray-600">Calculated discount</p>
                        <p className="text-xl font-semibold text-[#AC1E44]">
                            {discountPercentage >= 0 ? discountPercentage : 0}%
                        </p>
                    </div>

                    <Input
                        label="Offer Title"
                        placeholder="Example: Launch Offer"
                        error={errors.offer?.title?.message}
                        {...register("offer.title")}
                    />

                    <Input
                        label="Offer Discount (%)"
                        type="number"
                        min="0"
                        max="100"
                        readOnly={true}
                        value={discountPercentage}
                        error={errors.offer?.discountPercentage?.message}
                        {...register("offer.discountPercentage")}
                    />

                    <Input
                        label="Offer Start Date"
                        type="datetime-local"
                        error={errors.offer?.startDate?.message}
                        {...register("offer.startDate")}
                    />

                    <Input
                        label="Offer End Date"
                        type="datetime-local"
                        error={errors.offer?.endDate?.message}
                        {...register("offer.endDate")}
                    />

                    <Controller
                        name="offer.isActive"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                label="Enable Offer"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                activeColor="bg-green-600"
                            />
                        )}
                    />
                </div>
            </Container>

            <Container className="space-y-4 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <MdOutlineCategory className="text-[#AC1E44]" size={20} />
                    Product Tags
                </h3>

                <div className="flex gap-2">
                    <Input
                        value={tagInput}
                        onChange={(event) => setTagInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                addTag();
                            }
                        }}
                        placeholder="Enter a product tag"
                    />

                    <Button
                        type="button"
                        text="Add Tag"
                        icon={MdAdd}
                        onClick={addTag}
                        className="w-40"
                    />
                </div>

                {errors.tags?.message && (
                    <p className="text-xs text-red-500">{errors.tags.message}</p>
                )}

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1 relative rounded-md bg-[#AC1E44] text-white px-3 py-1 text-sm"
                        >
                            {tag}
                            <Button
                                type="button"
                                icon={MdClose}
                                iconSize={10}
                                aria-label={`Remove ${tag}`}
                                onClick={() => removeTag(tag)}
                                className="h-4 w-4 p-1! absolute -top-1 -right-1 bg-red-600 hover:bg-red-700"
                                shape="full"
                            />
                        </span>
                    ))}
                </div>
            </Container>

            <Container className="space-y-4 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <MdOutlineCategory className="text-[#AC1E44]" size={20} />
                    Specifications
                </h3>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <Input
                        value={specification.key}
                        onChange={(event) =>
                            setSpecification({
                                ...specification,
                                key: event.target.value,
                            })
                        }
                        placeholder="Property (e.g. Color)"
                    />

                    <Input
                        value={specification.value}
                        onChange={(event) =>
                            setSpecification({
                                ...specification,
                                value: event.target.value,
                            })
                        }
                        placeholder="Value (e.g. Black)"
                    />

                    <Button
                        type="button"
                        text="Add Specification"
                        icon={MdAdd}
                        variant="theme"
                        onClick={addSpecification}
                    />
                </div>

                <div className="space-y-2">
                    {specifications.map((item, index) => (
                        <div
                            key={`${item.key}-${index}`}
                            className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm"
                        >
                            <div className="min-w-0">
                                <span className="font-medium text-gray-800">
                                    {item.key}:
                                </span>{" "}
                                <span className="wrap-break-word text-gray-600">
                                    {item.value}
                                </span>
                            </div>

                            <Button
                                type="button"
                                variant="danger"
                                icon={MdDelete}
                                iconSize={15}
                                aria-label={`Remove ${item.key}`}
                                onClick={() => removeSpecification(index)}
                                className="p-1"
                            />
                        </div>
                    ))}
                </div>
            </Container>

            {errors.root?.serverError?.message && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {errors.root.serverError.message}
                </p>
            )}

        </form>
    );
};

export default ProductForm;