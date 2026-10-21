import React from "react";
import {
    MdImage,
    MdCalendarMonth,
    MdCheckCircle,
    MdCancel,
    MdDescription,
    MdSchedule,
    MdViewCarousel,
} from "react-icons/md";

// Components
import Badge from "../../components/Badge";
import Image from "../../components/media/Image";

const BannerView = ({ data }) => {

    const isActive = data?.isActive;

    const details = [
        {
            label: "Start Date",
            value: data?.startDate,
            icon: MdCalendarMonth,
            iconStyle: "bg-blue-50 text-blue-600",
        },
        {
            label: "End Date",
            value: data?.endDate,
            icon: MdSchedule,
            iconStyle: "bg-purple-50 text-purple-600",
        },
    ];

    return (
        <div className="space-y-5">
            <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                <Image
                    src={data?.bannerUrl}
                    alt={data?.title || "Banner"}
                    className="h-48 w-full object-cover sm:h-56"
                />
                <div className="absolute right-3 top-3">
                    <Badge
                        text={isActive ? "Active" : "Inactive"}
                        variant={isActive ? "success" : "danger"}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MdViewCarousel className="text-2xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="wrap-break-word text-lg font-bold text-gray-900">
                            {data?.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                            Banner Details
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                    <MdDescription className="text-xl text-indigo-600" />
                    <h4 className="text-sm font-semibold text-gray-800">
                        Description
                    </h4>
                </div>
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                    {data?.description || "No description available."}
                </p>
            </div>

            <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-800">
                    Schedule Information
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {details.map(({ label, value, icon: Icon, iconStyle }) => (
                        <div
                            key={label}
                            className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}>
                                <Icon className="text-xl" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500">
                                    {label}
                                </p>
                                <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                                    {value || "—"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`flex items-start gap-3 rounded-md border p-4 ${isActive
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-gray-50"
                }`}>
                {isActive ? (
                    <MdCheckCircle className="mt-0.5 shrink-0 text-xl text-green-600" />
                ) : (
                    <MdCancel className="mt-0.5 shrink-0 text-xl text-gray-500" />
                )}
                <div>
                    <p className={`text-sm font-semibold ${isActive ? "text-green-800" : "text-gray-700"
                        }`}>
                        {isActive ? "Banner is active" : "Banner is inactive"}
                    </p>
                    <p className={`mt-1 text-xs leading-5 ${isActive ? "text-green-700" : "text-gray-500"
                        }`}>
                        {isActive
                            ? "This banner is enabled on the platform."
                            : "This banner is currently disabled on the platform."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BannerView;