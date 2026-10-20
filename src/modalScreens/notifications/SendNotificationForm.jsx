import React from "react";

// form
import { useForm, Controller } from "react-hook-form";

// icons
import { MdMessage } from "react-icons/md";

// components
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import Textarea from "../../components/forms/Textarea";

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const SendNotificationForm = ({ formId }) => {
    const { closeModal, setActionLoading } = useModalStore();

    const { register, control, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            title: "",
            message: "",
            recipients: "",
            channel: "In-App",
        },
    });

    const onSubmit = async (data) => {
        try {
            setActionLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Notification submitted:", data);
            toastify.success("Notification sent successfully!");
            closeModal();
        } catch (error) {
            toastify.error("Failed to send notification. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <Input
                label="Notification Title"
                placeholder="Enter notification title"
                error={errors.title?.message}
                {...register("title", {
                    required: "Notification title is required",
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
                icon={MdMessage}
                label="Message"
                placeholder="Write your notification message..."
                rows={3}
                error={errors.message?.message}
                {...register("message", {
                    required: "Notification message is required",
                    minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                        value: 500,
                        message: "Message cannot exceed 500 characters",
                    },
                })}
            />

            <Controller
                name="recipients"
                control={control}
                rules={{ required: "Please select recipients" }}
                render={({ field }) => (
                    <Select
                        label="Recipients"
                        placeholder="Select recipients"
                        options={[
                            { label: "All Users", value: "All Users" },
                            { label: "All Vendors", value: "All Vendors" },
                        ]}
                        error={errors.recipients?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="channel"
                control={control}
                rules={{ required: "Please select a delivery channel" }}
                render={({ field }) => (
                    <Select
                        label="Delivery Channel"
                        placeholder="Select delivery channel"
                        options={[
                            { label: "In-App", value: "In-App" },
                            { label: "Email", value: "Email" },
                            { label: "Both", value: "Both" },
                        ]}
                        error={errors.channel?.message}
                        {...field}
                    />
                )}
            />

        </form>
    );
};

export default SendNotificationForm;