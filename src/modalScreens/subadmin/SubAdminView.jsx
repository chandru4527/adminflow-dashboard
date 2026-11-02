import React from 'react'

// icons
import {
    MdAdminPanelSettings, MdAlternateEmail, MdCalendarMonth, MdEmail, MdPerson,
    MdPersonOff, MdPhone, MdShield, MdUpdate, MdVerifiedUser
} from 'react-icons/md';

// componnets
import Badge from '../../components/Badge';
import Image from "../../components/media/Image";
import EmptyState from '../../components/EmptyState';

// utils
import { formatDate } from '../../utils/formatters';



const SubAdminView = ({ admin = null }) => {

    if (!admin) return (
        <EmptyState />
    )

    const details = [
        {
            label: "Full Name",
            value: admin.name,
            icon: MdPerson,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50",
        },
        {
            label: "Username",
            value: admin.username ? `@${admin.username}` : "",
            icon: MdAlternateEmail,
            iconColor: "text-violet-600",
            iconBg: "bg-violet-50",
        },
        {
            label: "Email Address",
            value: admin.email,
            icon: MdEmail,
            iconColor: "text-rose-600",
            iconBg: "bg-rose-50",
        },
        {
            label: "Mobile Number",
            value: admin.mobile,
            icon: MdPhone,
            iconColor: "text-amber-600",
            iconBg: "bg-amber-50",
        },
        {
            label: "Role",
            value: admin.role,
            icon: MdAdminPanelSettings,
            iconColor: "text-indigo-600",
            iconBg: "bg-indigo-50",
            capitalize: true,
        },
        {
            label: "Verification",
            value: admin.isVerified ? "Verified" : "Not Verified",
            icon: MdShield,
            iconColor: admin.isVerified ? "text-green-600" : "text-red-600",
            iconBg: admin.isVerified ? "bg-green-50" : "bg-red-50",
        },
        {
            label: "Account Created",
            value: formatDate(admin.createdAt),
            icon: MdCalendarMonth,
            iconColor: "text-teal-600",
            iconBg: "bg-teal-50",
        },
        {
            label: "Last Updated",
            value: formatDate(admin.createdAt),
            icon: MdUpdate,
            iconColor: "text-pink-600",
            iconBg: "bg-pink-50",
        },
    ];

    return (
        <div className="mx-auto w-full overflow-hidden">

            <div className="relative border-b border-gray-100 bg-linear-to-r from-blue-50 via-blue-50 to-blue-100 
            px-5 py-7 sm:px-7 rounded-md">
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                    <div className="relative shrink-0">
                        <div className="rounded-lg border-4 border-white shadow-md">
                            <Image
                                src={admin.profilePicture}
                                alt={admin.name || "User"}
                                className="h-24 w-24 object-cover rounded-lg sm:h-28 sm:w-28 "
                            />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="wrap-break-word text-xl font-bold text-gray-900 sm:text-2xl">
                            {admin.name || "Unnamed User"}
                        </h3>
                        <h3 className="wrap-break-word text-sm font-semibold text-gray-600">
                            {admin.email || "Unnamed User"}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <Badge
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${admin.isActive
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {admin.isActive ? (
                                    <MdVerifiedUser className="text-base" />
                                ) : (
                                    <MdPersonOff className="text-base" />
                                )}
                                {admin.isActive ? "Active" : "Inactive"}
                            </Badge>

                            <Badge
                                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700" >
                                <MdAdminPanelSettings className="text-base" />
                                {admin.role || "User"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {details.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className={`group flex min-w-0 items-start gap-2 rounded-md border border-gray-100 bg-gray-50/70 p-3 transition-colors hover:border-gray-200 hover:bg-white 
                                    ${item.fullWidth ? "sm:col-span-2" : ""}`}
                            >
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${item.iconBg}`}
                                >
                                    <Icon className={`text-xl ${item.iconColor}`} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500">
                                        {item.label}
                                    </p>

                                    <p
                                        className={`mt-1 wrap-break-word text-sm font-semibold text-gray-800 ${item.mono ? "font-mono text-xs" : ""
                                            } ${item.capitalize ? "capitalize" : ""
                                            }`}
                                    >
                                        {item.value || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SubAdminView;