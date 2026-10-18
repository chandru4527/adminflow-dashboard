import React from "react";

// icons
import {
    MdInfoOutline, MdApps, MdCode, MdPerson, MdCopyright, MdVerified, MdLanguage, MdStorage, MdAccountTree, MdDashboard,
} from "react-icons/md";

// components
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Badge from "../components/Badge";

const About = () => {

    const appInfo = [
        {
            label: "Application Name",
            value: "AdminFlow",
            icon: MdApps,
            iconBg: "bg-[#AC1E44]/10",
            iconColor: "text-[#AC1E44]",
        },
        {
            label: "Version",
            value: "1.0.0",
            icon: MdVerified,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            label: "Environment",
            value: import.meta.env.MODE === "production" ? "Production" : "Development",
            icon: MdStorage,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
        },
        {
            label: "Developer",
            value: "Chandrukumar C",
            icon: MdPerson,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            label: "Technologies",
            value: "React, Tailwind CSS, TanStack Query",
            icon: MdCode,
            iconBg: "bg-sky-100",
            iconColor: "text-sky-600",
        },
        {
            label: "State Management",
            value: "Zustand",
            icon: MdAccountTree,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            label: "Language",
            value: "English",
            icon: MdLanguage,
            iconBg: "bg-teal-100",
            iconColor: "text-teal-700",
        },
        {
            label: "Project Type",
            value: "Frontend Admin Dashboard",
            icon: MdDashboard,
            iconBg: "bg-[#EFEBE9]",
            iconColor: "text-[#5D4037]",
        },
        {
            label: "Copyright",
            value: `© ${new Date().getFullYear()} AdminFlow. All rights reserved.`,
            icon: MdCopyright,
            iconBg: "bg-rose-100",
            iconColor: "text-rose-600",
        },
    ];

    return (
        <div className="space-y-6">

            <PageHeader
                title="About AdminFlow"
                titleIcon={MdInfoOutline}
                description="Learn more about the AdminFlow website, its features, and the technologies used to build it."
            />

            <Container className="p-0 rounded-md!">

                <div className="relative overflow-hidden bg-linear-to-br from-[#AC1E44] via-[#a4193e] to-[#480e20] px-5 py-8 sm:px-8 sm:py-10 rounded-md">

                    <div className="pointer-events-none absolute left-[35%] animate-pulse top-[20%] h-16 w-16 rounded-full bg-white/20 blur-md" />
                    <div className="pointer-events-none absolute right-[25%] animate-pulse top-[25%] h-7 w-7 rounded-full bg-white/35 blur-md" />
                    <div className="pointer-events-none absolute left-[20%] animate-pulse top-[65%] h-5 w-5 rounded-full bg-white/20 blur-md" />
                    <div className="pointer-events-none absolute left-[42%] bottom-[15%] h-6 w-6 rounded-full bg-white/30 blur-md" />
                    <div className="pointer-events-none absolute right-[40%] top-[45%] h-4 w-4 rounded-full bg-white/40 blur-md" />
                    <div className="pointer-events-none absolute left-[12%] top-[40%] h-3 w-3 rounded-full bg-white/35 blur-md" />

                    <div
                        className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left"
                    >
                        <div
                            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm sm:h-24 sm:w-24">
                            <MdApps size={48} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
                                    ADMIN DASHBOARD
                                </span>

                                <Badge
                                    variant="success"
                                    className="rounded-full border border-white/20"
                                >
                                    <span className="inline-flex items-center gap-1">
                                        <MdVerified size={14} />
                                        v1.0.0
                                    </span>
                                </Badge>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                AdminFlow
                            </h2>

                            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/80 sm:mx-0 sm:text-base">
                                A modern, responsive admin dashboard website featuring user,
                                product, and order management with interactive UI and dummy data.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="overflow-hidden rounded-md border border-gray-200 bg-white p-0 shadow-sm">

                <div className="p-5 sm:p-8">
                    <div className="mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Website Information
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Details about the AdminFlow website, its technologies, and features.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {appInfo.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
                            <div
                                key={label}
                                className="flex min-w-0 items-start gap-3 rounded-md border border-gray-200 bg-white p-4 transition hover:border-[#AC1E44]/40 "
                            >
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                                    <Icon size={21} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-gray-500">{label}</p>
                                    <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800 sm:text-base">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                            <MdInfoOutline
                                size={23}
                                className="mt-0.5 shrink-0 text-blue-600"
                            />

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    About This Project
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
                                    AdminFlow is a responsive admin dashboard built with React, Vite, and
                                    Tailwind CSS. It demonstrates user interface design and interactive
                                    functionality using dummy data. The project focuses on dashboard
                                    navigation, data management interfaces, and responsive layouts across
                                    desktop, tablet, and mobile devices.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default About;