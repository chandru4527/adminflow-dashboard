import React from "react";

// form
import { useForm } from "react-hook-form";

// icons
import {
    MdSettings, MdSave, MdRestartAlt, MdLanguage, MdAccessTime, MdCalendarMonth,
    MdNotifications, MdBuild,
} from "react-icons/md";

// components
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Switch from "../components/forms/Switch";

// modal screens
import Confirmation from "../modalScreens/Confirmation";

//store
import useModalStore from '../store/modalStore';

// utils
import { toastify } from "../utils/toastify";

// theme
import theme from "../theme/theme";

const defaultGeneralSettings = {
    applicationName: "AdminFlow",
    displayName: "Admin",
    language: "en",
    timeZone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    currency: "INR",
};

const defaultNotificationSettings = {
    emailNotifications: true,
    newUserRegistration: true,
    newOrders: true,
    securityAlerts: true,
    orderStatusUpdates: true,
};

const Settings = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();

    const {
        register: registerGeneral,
        handleSubmit: handleGeneralSubmit,
        reset: resetGeneral,
        watch: watchGeneral,
        setValue: setGeneralValue,
        formState: {
            isDirty: isGeneralDirty,
            errors: generalErrors,
        },
    } = useForm({
        defaultValues: defaultGeneralSettings,
    });

    const {
        handleSubmit: handleNotificationSubmit,
        reset: resetNotifications,
        control,
        formState: {
            isDirty: isNotificationDirty,
        },
    } = useForm({
        defaultValues: defaultNotificationSettings,
    });

    // save general
    const onGeneralSubmit = (data) => {
        openModal({
            icon: MdBuild,
            title: "Save General Settings",
            content: (
                <Confirmation
                    icon={MdBuild}
                    variant="success"
                    title="Are you sure you want to save General Settings?"
                />
            ),
            action: {
                label: "Save",
                variant: "theme",
                loadingText: "Saving...",
                onClick: () => {
                    setActionLoading(true);

                    setTimeout(() => {
                        console.log("General Settings:", data);
                        resetGeneral(data);
                        setActionLoading(false);
                        closeModal();
                        toastify.success("General settings saved successfully!");
                    }, 1500);
                },
            },
        });
    };

    // save notification
    const onNotificationSubmit = (data) => {
        openModal({
            icon: MdNotifications,
            title: "Save Notification Settings",
            content: (
                <Confirmation
                    icon={MdNotifications}
                    variant="success"
                    title="Are you sure you want to save Notification Settings?"
                />
            ),
            action: {
                label: "Save",
                variant: "theme",
                loadingText: "Saving...",
                onClick: () => {
                    setActionLoading(true);

                    setTimeout(() => {
                        console.log("Notification Settings:", data);
                        resetNotifications(data);
                        setActionLoading(false);
                        closeModal();
                        toastify.success("Notification settings saved successfully!");
                    }, 1500);
                },
            },
        });
    };

    // reset general
    const handleGeneralReset = () => {
        openModal({
            icon: MdBuild,
            title: "Reset General Settings",
            content: (
                <Confirmation
                    icon={MdBuild}
                    variant="warning"
                    title="Are you sure you want to reset General Settings?"
                />
            ),
            action: {
                label: "Reset",
                variant: "theme",
                loadingText: "Resetting...",
                onClick: () => {
                    setActionLoading(true);

                    setTimeout(() => {
                        resetGeneral(defaultGeneralSettings);
                        setActionLoading(false);
                        closeModal();
                        toastify.success("General settings reset successfully!");
                    }, 1500);
                },
            },
        });
    };

    // reset notification
    const handleNotificationReset = () => {
        openModal({
            icon: MdNotifications,
            title: "Reset Notification Settings",
            content: (
                <Confirmation
                    icon={MdNotifications}
                    variant="warning"
                    title="Confirm reset Notification Settings!"
                />
            ),
            action: {
                label: "Reset",
                variant: "theme",
                loadingText: "Resetting...",
                onClick: () => {
                    setActionLoading(true);

                    setTimeout(() => {
                        resetNotifications(defaultNotificationSettings);
                        setActionLoading(false);
                        closeModal();
                        toastify.success("Notification settings reset successfully!");
                    }, 1500);
                },
            },
        });
    };

    return (
        <div className="space-y-5">

            <PageHeader
                title="Settings"
                titleIcon={MdSettings}
                description="Manage your application preferences and general settings."
            />

            {/* general */}
            <form
                onSubmit={handleGeneralSubmit(onGeneralSubmit)}
                className="space-y-5"
            >
                <Container className="min-w-0 rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <MdBuild size={23} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                General Settings
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Customize your application preferences.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <Input
                            label="Application Name"
                            id="applicationName"
                            {...registerGeneral("applicationName")}
                            readOnly
                            helperText="The application name cannot be changed."
                            inputClassName="cursor-not-allowed bg-gray-50 text-gray-500"
                        />

                        <Input
                            label="Admin Display Name"
                            id="displayName"
                            {...registerGeneral("displayName", {
                                required: "Admin display name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must contain at least 2 characters",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Name cannot exceed 30 characters",
                                },
                            })}
                            placeholder="Enter admin display name"
                            error={generalErrors.displayName?.message}
                        />

                        <Select
                            name="language"
                            label="Language"
                            icon={MdLanguage}
                            iconClassName="text-blue-600"
                            value={watchGeneral("language")}
                            onChange={(e) =>
                                setGeneralValue("language", e.target.value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                            options={[
                                { value: "en", label: "English" },
                                { value: "ta", label: "Tamil" },
                                { value: "hi", label: "Hindi" },
                            ]}
                        />

                        <Select
                            name="timeZone"
                            label="Time Zone"
                            icon={MdAccessTime}
                            iconClassName={theme.text_primary}
                            value={watchGeneral("timeZone")}
                            onChange={(e) =>
                                setGeneralValue("timeZone", e.target.value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                            options={[
                                {
                                    value: "Asia/Kolkata",
                                    label: "India Standard Time (IST)",
                                },
                                { value: "UTC", label: "UTC" },
                                {
                                    value: "America/New_York",
                                    label: "Eastern Time (US)",
                                },
                                {
                                    value: "Europe/London",
                                    label: "London",
                                },
                                {
                                    value: "Asia/Dubai",
                                    label: "Dubai",
                                },
                                {
                                    value: "Asia/Singapore",
                                    label: "Singapore",
                                },
                            ]}
                        />

                        <Select
                            name="dateFormat"
                            label="Date Format"
                            icon={MdCalendarMonth}
                            iconClassName="text-green-600"
                            value={watchGeneral("dateFormat")}
                            onChange={(e) =>
                                setGeneralValue("dateFormat", e.target.value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                            options={[
                                {
                                    value: "DD/MM/YYYY",
                                    label: "DD/MM/YYYY (18/10/2026)",
                                },
                                {
                                    value: "MM/DD/YYYY",
                                    label: "MM/DD/YYYY (10/18/2026)",
                                },
                                {
                                    value: "YYYY-MM-DD",
                                    label: "YYYY-MM-DD (2026-10-18)",
                                },
                            ]}
                        />

                        <Select
                            name="currency"
                            label="Default Currency"
                            value={watchGeneral("currency")}
                            onChange={(e) =>
                                setGeneralValue("currency", e.target.value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                            options={[
                                {
                                    value: "INR",
                                    label: "INR (₹) - Indian Rupee",
                                },
                                {
                                    value: "USD",
                                    label: "USD ($) - US Dollar",
                                },
                                {
                                    value: "EUR",
                                    label: "EUR (€) - Euro",
                                },
                                {
                                    value: "GBP",
                                    label: "GBP (£) - British Pound",
                                },
                            ]}
                        />
                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            icon={MdRestartAlt}
                            // disabled={!isGeneralDirty}
                            onClick={handleGeneralReset}
                            text="Reset Settings"
                        />
                        <Button
                            type="submit"
                            variant="theme"
                            disabled={!isGeneralDirty}
                            icon={MdSave}
                            text="Save Changes"
                        />
                    </div>
                </Container>
            </form>

            {/* notification */}
            <form
                onSubmit={handleNotificationSubmit(onNotificationSubmit)}
                className="space-y-5"
            >
                <Container className="min-w-0 rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <MdNotifications size={23} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Notification Settings
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage the notifications you receive.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                        <div className="rounded-md border border-gray-200 p-4">
                            <Switch
                                name="emailNotifications"
                                control={control}
                                label="Email Notifications"
                                description="Receive important notifications by email."
                                labelPosition="left"
                                className="justify-between"
                                activeColor="bg-green-600"
                                size="md"
                            />
                        </div>

                        <div className="rounded-md border border-gray-200 p-4">
                            <Switch
                                name="newUserRegistration"
                                control={control}
                                label="New User Registration"
                                description="Get notified whenever a new user registers."
                                labelPosition="left"
                                className="justify-between"
                                activeColor="bg-green-600"
                                size="md"
                            />
                        </div>

                        <div className="rounded-md border border-gray-200 p-4">
                            <Switch
                                name="newOrders"
                                control={control}
                                label="New Orders"
                                description="Receive notifications when a new order is placed."
                                labelPosition="left"
                                className="justify-between"
                                activeColor="bg-green-600"
                                size="md"
                            />
                        </div>

                        <div className="rounded-md border border-gray-200 p-4">
                            <Switch
                                name="securityAlerts"
                                control={control}
                                label="Security Alerts"
                                description="Get notified about important security-related events."
                                labelPosition="left"
                                className="justify-between"
                                activeColor="bg-green-600"
                                size="md"
                            />
                        </div>

                        <div className="rounded-md border border-gray-200 p-4">
                            <Switch
                                name="orderStatusUpdates"
                                control={control}
                                label="Order Status Updates"
                                description="Receive notifications when an order status changes."
                                labelPosition="left"
                                className="justify-between"
                                activeColor="bg-green-600"
                                size="md"
                            />
                        </div>

                    </div>

                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            icon={MdRestartAlt}
                            onClick={handleNotificationReset}
                            text="Reset Settings"
                        />
                        <Button
                            type="submit"
                            variant="theme"
                            disabled={!isNotificationDirty}
                            icon={MdSave}
                            text="Save Changes"
                        />
                    </div>


                </Container>
            </form>
        </div>
    );
};

export default Settings;