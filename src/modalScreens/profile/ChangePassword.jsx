import React, { memo } from "react";
import { MdLock } from "react-icons/md";

// form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import Input from "../../components/forms/Input";

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
  confirmPassword: z.string()
    .min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must differ from your current password",
  path: ["newPassword"],
});

const ChangePassword = memo(({ formId }) => {

  const { closeModal, setActionLoading } = useModalStore();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    setActionLoading(true);

    setTimeout(() => {
      closeModal();
      setActionLoading(false);
      toastify.success("Password changed successfully!");
    }, 1500)
    console.log(data);
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} id={formId} className="space-y-5" >
      <Input
        label="Current Password"
        type="password"
        placeholder="Enter current password"
        icon={MdLock}
        error={errors.currentPassword?.message}
        {...register("currentPassword")}
      />

      <Input
        label="New Password"
        type="password"
        placeholder="Enter new password"
        icon={MdLock}
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />

      <Input
        label="Confirm New Password"
        type="password"
        placeholder="Confirm new password"
        icon={MdLock}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
    </form>
    
  );
});

export default ChangePassword;