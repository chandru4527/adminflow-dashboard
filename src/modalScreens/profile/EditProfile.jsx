import React, { memo, useState } from "react";

// icons
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdLocationCity, } from "react-icons/md";

// form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import Input from "../../components/forms/Input";
import ProfileImageUpload from '../../components/ProfileImageUpload';

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const profileSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name cannot exceed 30 characters"),

    email: z.string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    userName: z.string()
        .trim()
        .refine(value => value === "" || value.length >= 3, "Username must be at least 3 characters")
        .refine(value => value.length <= 20, "Username cannot exceed 20 characters")
        .refine(value => value === "" || /^[a-zA-Z0-9_]+$/.test(value), "Username can only contain letters, numbers, and underscores"),

    mobile: z.string()
        .trim()
        .refine(value => value === "" || /^[0-9]{10}$/.test(value), "Enter a valid 10-digit mobile number"),

    dateOfBirth: z.string()
        .refine(value => !value || (
            /^\d{4}-\d{2}-\d{2}$/.test(value) &&
            !Number.isNaN(Date.parse(value)) &&
            new Date(value).toISOString().slice(0, 10) === value &&
            value < new Date().toISOString().slice(0, 10)
        ), "Enter a valid date of birth in the past"),

    address: z.string()
        .trim()
        .max(100, "Address cannot exceed 100 characters"),
});

const EditProfile = memo(({ user, formId }) => {
    console.log(user);

    const { closeModal, setActionLoading } = useModalStore();

    const [selectedImage, setSelectedImage] = useState(null);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            userName: user?.userName || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            dateOfBirth: user?.dateOfBirth
                ? String(user.dateOfBirth).slice(0, 10)
                : "",
            address: user?.address || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setActionLoading(true);

            let profileImage = user?.profileImage || "";

            const payload = {
                ...data,
                profileImage,
            };

            setTimeout(() => {
                closeModal();
                setActionLoading(false);
                toastify.success("Profile Updated successfully!");
            }, 1500)


        } catch (error) {
            setActionLoading(false);
            toastify.error(error?.message || "Image upload failed");
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} id={formId} className="space-y-5">

            {user && (
                <ProfileImageUpload
                    value={user.profileImage}
                    onChange={setSelectedImage}
                    disabled={!setActionLoading}
                    loading={!setActionLoading}
                />
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="Name"
                    placeholder="Enter your full name"
                    icon={MdPerson}
                    error={errors.name?.message}
                    {...register("name")}
                />

                <Input
                    label="Username"
                    placeholder="Enter your username"
                    icon={MdPerson}
                    error={errors.userName?.message}
                    {...register("userName")}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    icon={MdEmail}
                    error={errors.email?.message}
                    {...register("email")}
                />

                <Input
                    label="Mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    icon={MdPhone}
                    error={errors.mobile?.message}
                    {...register("mobile")}
                />
                <Input
                    label="Date of Birth"
                    type="date"
                    icon={MdCalendarToday}
                    error={errors.dateOfBirth?.message}
                    {...register("dateOfBirth")}
                />
                <Input
                    label="Address"
                    placeholder="Enter your city"
                    icon={MdLocationCity}
                    error={errors.address?.message}
                    {...register("address")}
                />
            </div>

        </form>
    );
})

export default EditProfile;