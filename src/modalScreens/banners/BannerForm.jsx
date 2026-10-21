import React from "react";
import { useForm } from "react-hook-form";
import { MdCalendarToday, MdEvent, MdMessage } from "react-icons/md";

// Components
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import Switch from "../../components/forms/Switch";
import BannerImageUpload from '../../components/BannerImageUpload';

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const BannerForm = ({ data = null, mode = "add", formId }) => {

    const { closeModal, setActionLoading, actionLoading } = useModalStore();

    const { register, handleSubmit, watch, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            title: mode === "edit" ? data?.title || "" : "",
            description: mode === "edit" ? data?.description || "" : "",
            bannerUrl: mode === "edit" ? data?.bannerUrl || "" : "",
            startDate: mode === "edit" ? new Date(data?.startDate).toISOString().split("T")[0] : "",
            endDate: mode === "edit" ? new Date(data?.endDate).toISOString().split("T")[0] : "",
            isActive: mode === "edit" ? data?.isActive ?? true : true,
        },
    });

    const startDate = watch("startDate");

    const onSubmit = (formData) => {
        setActionLoading(true);
        console.log(formData);

        setTimeout(() => {
            if (mode === "edit") {
                toastify.success("Banner updated successfully!");
            } else {
                toastify.success("Banner added successfully!");
            }

            setActionLoading(false);
            closeModal();
        }, 1000);
    };

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <BannerImageUpload
                loading={actionLoading}
                value={watch("bannerUrl")}
                onChange={(url) => setValue("bannerUrl", url, { shouldValidate: true })}
            />

            <Input
                label="Banner Title"
                placeholder="Enter banner title"
                error={errors.title?.message}
                {...register("title", {
                    required: "Title is required",
                    minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                    },
                    maxLength: {
                        value: 100,
                        message: "Title cannot exceed 100 characters",
                    },
                })}
            />

            <Textarea
                label="Description"
                icon={MdMessage}
                placeholder="Enter banner description"
                rows={3}
                error={errors.description?.message}
                {...register("description", {
                    required: "Description is required",
                })}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                    label="Start Date"
                    type="date"
                    icon={MdCalendarToday}
                    iconClassName="text-blue-600"
                    error={errors.startDate?.message}
                    {...register("startDate", {
                        required: "Start date is required",
                    })}
                />

                <Input
                    label="End Date"
                    type="date"
                    icon={MdEvent}
                    iconClassName="text-green-600"
                    error={errors.endDate?.message}
                    {...register("endDate", {
                        required: "End date is required",
                        validate: (value) =>
                            !startDate ||
                            value >= startDate ||
                            "End date must be on or after the start date",
                    })}
                />
            </div>

            <Switch
                size="sm"
                label="Active Banner"
                description="Enable or disable this banner."
                name="isActive"
                control={control}
                activeColor="bg-blue-600"
                inactiveColor="bg-gray-300"
            />
        </form>
    );
};

export default BannerForm;