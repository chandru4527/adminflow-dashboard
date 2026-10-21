import React from "react";
import { MdNotifications, MdPeople, MdSchedule, MdEmail, MdCheckCircle, MdError } from "react-icons/md";

// components
import Badge from "../../components/Badge";

const NotificationView = ({ data }) => {
    const isSent = data?.isSent;

    const details = [
        {
            label: "Recipients",
            value: data?.recipients,
            icon: MdPeople,
            iconStyle: "bg-blue-50 text-blue-600",
        },
        {
            label: "Delivery Channel",
            value: data?.channel,
            icon: MdEmail,
            iconStyle: "bg-purple-50 text-purple-600",
        },
        {
            label: "Sent Date",
            value: data?.sentAt,
            icon: MdSchedule,
            iconStyle: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="space-y-5">

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MdNotifications className="text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {data?.title}
                    </h3>
                    <div className="mt-2">
                        <Badge
                            text={isSent ? "Sent" : "Failed"}
                            variant={isSent ? "success" : "danger"}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-700">
                    Notification Message
                </p>
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                    {data?.message || "No message available."}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {details.map(({ label, value, icon: Icon, iconStyle }) => (
                    <div
                        key={label}
                        className="rounded-md border border-gray-200 bg-white p-2"
                    >
                        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${iconStyle}`}>
                            <Icon className="text-xl" />
                        </div>
                        <p className="text-xs font-medium text-gray-500">
                            {label}
                        </p>
                        <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                            {value || "—"}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                {isSent ? (
                    <MdCheckCircle className="text-lg text-green-600" />
                ) : (
                    <MdError className="text-lg text-red-600" />
                )}
                <span>
                    {isSent
                        ? "This notification was sent successfully."
                        : "This notification failed to send."}
                </span>
            </div>

        </div>
    );
};

export default NotificationView;