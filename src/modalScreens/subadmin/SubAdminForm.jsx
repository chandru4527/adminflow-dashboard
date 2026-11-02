import React, { useState } from "react";
import { useForm } from "react-hook-form";

// icons
import { MdPerson, MdEmail, MdAlternateEmail, MdPhone, MdImage, MdLock } from "react-icons/md";

// Components
import Input from "../../components/forms/Input";
import Switch from "../../components/forms/Switch";
import ProfileImageUpload from "../../components/ProfileImageUpload";
import Checkbox from "../../components/forms/Checkbox";

// Store
import useModalStore from "../../store/modalStore";

// Utils
import { toastify } from "../../utils/toastify";

const SubAdminForm = ({ subAdmin = null, mode = "add", formId }) => {

    const { closeModal, setActionLoading } = useModalStore();

    const [selectedImage, setSelectedImage] = useState(null);

    const isEdit = mode === "edit";

    const { register, handleSubmit, watch, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: subAdmin?.name || "",
            email: subAdmin?.email || "",
            username: subAdmin?.username || "",
            mobile: subAdmin?.mobile || "",
            password: "",
            confirmPassword: "",
            isActive: subAdmin?.isActive ?? true,
            isVerified: subAdmin?.isVerified ?? true,
            permissions: subAdmin?.permissions || [],
        },
    });

    const onSubmit = (formData) => {
        setActionLoading(true);
        let profileImage = subAdmin?.profilePicture || "";

        const payload = {
            ...formData,
            profileImage,
        };

        setTimeout(() => {
            toastify.success(
                isEdit
                    ? "Sub-admin updated successfully!"
                    : "Sub-admin added successfully!"
            );

            setActionLoading(false);
            closeModal();
        }, 1000);
    };

    const permissionOptions = [
        { label: "Dashboard", value: "dashboard" },
        { label: "Users", value: "users" },
        { label: "Sub Admins", value: "sub-admins" },
        { label: "Products", value: "products" },
        { label: "Categories", value: "categories" },
        { label: "Orders", value: "orders" },
        { label: "Refunds", value: "refunds" },
        { label: "Settings", value: "settings" },
    ];

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <ProfileImageUpload
                value={subAdmin?.profilePicture}
                onChange={setSelectedImage}
                disabled={!setActionLoading}
                loading={!setActionLoading}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    icon={MdPerson}
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                />

                <Input
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    icon={MdEmail}
                    {...register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                />

                <Input
                    label="Username"
                    placeholder="Enter username"
                    icon={MdAlternateEmail}
                    {...register("username", { required: "Username is required" })}
                    error={errors.username?.message}
                />

                <Input
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    type="tel"
                    icon={MdPhone}
                    {...register("mobile", { required: "Mobile number is required" })}
                    error={errors.mobile?.message}
                />

                <Input
                    label={`Password ${isEdit ? "(optional)" : ""}`}
                    placeholder="Enter password"
                    type="password"
                    icon={MdLock}
                    {...register("password", {
                        required: isEdit ? false : "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                    error={errors.password?.message}
                />

                <Input
                    label={`Confirm Password ${isEdit ? "(optional)" : ""}`}
                    placeholder="Enter confirm password"
                    type="password"
                    icon={MdLock}
                    {...register("confirmPassword", {
                        validate: (value) => {
                            const password = watch("password");

                            if (!isEdit && !value) {
                                return "Confirm password is required";
                            }

                            if (password && !value) {
                                return "Confirm password is required";
                            }

                            if (password !== value) {
                                return "Passwords do not match";
                            }

                            return true;
                        },
                    })}
                    error={errors.confirmPassword?.message}
                />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-100 pt-5">
                <Switch
                    label="Active Status"
                    labelPosition="right"
                    checked={watch("isActive")}
                    onCheckedChange={(checked) => setValue("isActive", checked)}
                    activeColor="bg-green-600"
                    size="sm"
                />

                <Switch
                    label="Verified Account"
                    labelPosition="right"
                    checked={watch("isVerified")}
                    onCheckedChange={(checked) => setValue("isVerified", checked)}
                    activeColor="bg-blue-600"
                    size="sm"
                />
            </div>

            <div className="border-t border-slate-100 pt-5">
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-800">
                        Permissions
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Select the modules this sub-admin can access.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {permissionOptions.map((permission) => (
                        <Checkbox
                            key={permission.value}
                            label={permission.label}
                            name="permissions"
                            value={permission.value}
                            register={register}
                            inputClassName="accent-[#AC1E44]"
                            labelTextClassName="font-medium"
                        />
                    ))}
                </div>

                {errors.permissions && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.permissions.message}
                    </p>
                )}
            </div>
        </form>
    );
};

export default SubAdminForm;