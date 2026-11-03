import React from 'react';
import { useForm } from "react-hook-form";

// icons
import { MdCategory, MdMessage } from 'react-icons/md';

// components
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import Switch from "../../components/forms/Switch";

// Store
import useModalStore from "../../store/modalStore";

// Utils
import { toastify } from "../../utils/toastify";

const CategoryForm = ({ category = null, mode = "add", formId }) => {

    const { closeModal, setActionLoading } = useModalStore();

    const isEdit = mode === "edit";

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            name: category?.name || "",
            description: category?.description || "",
            order: category?.order || 1,
            isActive: category?.isActive ?? true,
        },
    });

    const isActive = watch("isActive");

    const onSubmit = (formData) => {
        setActionLoading(true);

        setTimeout(() => {
            toastify.success(
                isEdit
                    ? "Category updated successfully!"
                    : "Category added successfully!"
            );

            setActionLoading(false);
            closeModal();
        }, 1000);
    };

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <Input
                label="Category Name"
                placeholder="Enter category name"
                icon={MdCategory}
                {...register("name", {
                    required: "Category name is required",
                    minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                    },
                })}
                error={errors.name?.message}
            />

            <Textarea
                label="Description"
                placeholder="Enter category description"
                icon={MdMessage}
                rows={3}
                {...register("description", {
                    required: "Description is required",
                })}
                error={errors.description?.message}
            />

            <Input
                label="Display Order"
                type="number"
                placeholder="Enter display order"
                {...register("order", {
                    required: "Display order is required",
                    min: {
                        value: 1,
                        message: "Order must be at least 1",
                    },
                    valueAsNumber: true,
                })}
                error={errors.order?.message}
            />

            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div>
                    <p className="text-sm font-medium text-gray-800">
                        Category Status
                    </p>
                    <p className="text-xs text-gray-500">
                        Enable or disable this category
                    </p>
                </div>
                <Switch
                    checked={isActive}
                    activeColor='bg-green-600'
                    onChange={value => setValue("isActive", value)}
                />
            </div>

        </form>
    )
}

export default CategoryForm