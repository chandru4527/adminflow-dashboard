import React from "react";

// icons
import {
    MdCurrencyExchange, MdReceiptLong, MdShoppingBag, MdPerson, MdEmail, MdPhone, MdPayment,
    MdAccountBalance, MdCalendarToday, MdCheckCircle, MdInfo, MdDescription,
} from "react-icons/md";

// Components
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

// Utils
import { formatCurrency, formatDateTime } from "../../utils/formatters";

const InfoItem = ({
    icon: Icon,
    label,
    value,
    iconColor = "text-gray-600",
    iconBg = "bg-gray-100",
}) => (
    <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${iconBg}`}>
            <Icon className={`text-lg ${iconColor}`} />
        </div>
        <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                {value || "-"}
            </p>
        </div>
    </div>
);

const RefundsView = ({ refund = {} }) => {

    if (!refund) return (
        <EmptyState
            icon={MdCurrencyExchange}
            variant="minimal"
            title="No Refund Found"
            description="No Refund are available right now."
        />
    )

    const statusVariant = {
        Completed: "success",
        Processing: "info",
        Pending: "warning",
        Rejected: "danger",
    };

    return (
        <div className="space-y-5">

            {/* Refund Summary */}
            <div className="rounded-md border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ac1e44]/10">
                            <MdCurrencyExchange className="text-2xl text-[#ac1e44]" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Refund ID</p>
                            <h3 className="mt-1 font-semibold text-gray-800">
                                {refund.refundId || "-"}
                            </h3>
                        </div>
                    </div>

                    <Badge
                        text={refund.refundStatus || "Unknown"}
                        variant={statusVariant[refund.refundStatus] || "default"}
                    />
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">Refund Amount</p>
                    <h2 className="mt-1 text-3xl font-bold text-gray-900">
                        {formatCurrency(refund.refundAmount ?? 0)}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Original Amount: {formatCurrency(refund.originalAmount ?? 0)}
                    </p>
                </div>
            </div>

            {/* Refund Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <MdReceiptLong className="text-lg text-[#ac1e44]" />
                    <h3 className="font-semibold text-gray-800">
                        Refund Information
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-md border border-gray-200 p-4 sm:grid-cols-2">
                    <InfoItem
                        icon={MdCurrencyExchange}
                        label="Refund ID"
                        value={refund.refundId}
                        iconColor="text-[#ac1e44]"
                        iconBg="bg-[#ac1e44]/10"
                    />
                    <InfoItem
                        icon={MdReceiptLong}
                        label="Transaction ID"
                        value={refund.transactionId}
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                    />
                    <InfoItem
                        icon={MdShoppingBag}
                        label="Order ID"
                        value={refund.orderId}
                        iconColor="text-purple-600"
                        iconBg="bg-purple-50"
                    />
                    <InfoItem
                        icon={MdInfo}
                        label="Refund Reason"
                        value={refund.refundReason}
                        iconColor="text-orange-600"
                        iconBg="bg-orange-50"
                    />
                </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <MdPerson className="text-lg text-[#ac1e44]" />
                    <h3 className="font-semibold text-gray-800">
                        Customer Information
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-md border border-gray-200 p-4 sm:grid-cols-2">
                    <InfoItem
                        icon={MdPerson}
                        label="Customer Name"
                        value={refund.customerName}
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                    />
                    <InfoItem
                        icon={MdEmail}
                        label="Email Address"
                        value={refund.customerEmail}
                        iconColor="text-purple-600"
                        iconBg="bg-purple-50"
                    />
                    <InfoItem
                        icon={MdPhone}
                        label="Phone Number"
                        value={refund.customerPhone}
                        iconColor="text-green-600"
                        iconBg="bg-green-50"
                    />
                </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <MdPayment className="text-lg text-[#ac1e44]" />
                    <h3 className="font-semibold text-gray-800">
                        Payment Information
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-md border border-gray-200 p-4 sm:grid-cols-2">
                    <InfoItem
                        icon={MdPayment}
                        label="Payment Method"
                        value={refund.paymentMethod}
                        iconColor="text-indigo-600"
                        iconBg="bg-indigo-50"
                    />
                    <InfoItem
                        icon={MdAccountBalance}
                        label="Payment Provider"
                        value={refund.paymentProvider}
                        iconColor="text-cyan-600"
                        iconBg="bg-cyan-50"
                    />
                    <InfoItem
                        icon={MdCurrencyExchange}
                        label="Currency"
                        value={refund.currency || "INR"}
                        iconColor="text-green-600"
                        iconBg="bg-green-50"
                    />
                </div>
            </div>

            {/* Refund Timeline */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <MdCalendarToday className="text-lg text-[#ac1e44]" />
                    <h3 className="font-semibold text-gray-800">
                        Refund Timeline
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-md border border-gray-200 p-4 sm:grid-cols-2">
                    <InfoItem
                        icon={MdCalendarToday}
                        label="Refund Date"
                        value={formatDateTime(refund.refundDate)}
                        iconColor="text-orange-600"
                        iconBg="bg-orange-50"
                    />
                    <InfoItem
                        icon={MdCheckCircle}
                        label="Processed Date"
                        value={refund.processedDate ? formatDateTime(refund.processedDate) : "-"}
                        iconColor="text-green-600"
                        iconBg="bg-green-50"
                    />
                    <InfoItem
                        icon={MdCalendarToday}
                        label="Last Updated"
                        value={formatDateTime(refund.updatedAt)}
                        iconColor="text-cyan-600"
                        iconBg="bg-cyan-50"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <MdDescription className="text-lg text-[#ac1e44]" />
                    <h3 className="font-semibold text-gray-800">
                        Description
                    </h3>
                </div>

                <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                        {refund.description || "No description available."}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default RefundsView;