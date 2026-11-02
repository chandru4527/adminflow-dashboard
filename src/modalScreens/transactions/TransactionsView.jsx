import React from "react";

// Icons
import {
    MdReceiptLong, MdShoppingBag, MdPerson, MdEmail, MdPhone, MdCreditCard, MdAccountBalance,
    MdCalendarToday, MdPayments, MdError, MdInfo, MdCurrencyRupee, MdRefresh, MdDescription,
} from "react-icons/md";

// Components
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

// Utils
import { formatCurrency, formatDateTime } from "../../utils/formatters";

const TransactionsView = ({ Trans = {} }) => {

    if (!Trans) return (
        <EmptyState
            icon={MdReceiptLong}
            variant="minimal"
            title="No Transactions Found"
            description="No Transactions are available right now."
        />
    )

    const statusVariants = {
        Success: "success",
        Pending: "warning",
        Failed: "danger",
        Refunded: "info",
    };

    const InfoItem = ({
        icon: Icon,
        label,
        value,
        iconColor = "text-gray-500",
        iconBg = "bg-gray-100",
        className = "",
    }) => (
        <div className={`flex items-start gap-3 ${className}`}>
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                <Icon size={18} />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <div className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                    {value || "-"}
                </div>
            </div>
        </div>
    );

    const Section = ({ icon: Icon, title, children }) => (
        <section className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <div className="flex items-center gap-2 bg-gray-50/70 px-4 py-3">
                <Icon className="text-[#ac1e44]" size={19} />
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2">
                {children}
            </div>
        </section>
    );

    const transactionAmount = Number(Trans.amount) || 0;
    const transactionFee = Number(Trans.transactionFee) || 0;
    const taxAmount = Number(Trans.taxAmount) || 0;
    const netAmount = Number(Trans.netAmount) || 0;

    return (
        <div className=" space-y-5">

            <div className="rounded-md border border-gray-200 bg-linear-to-r from-gray-50 to-white p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#ac1e44]/10 text-[#ac1e44]">
                            <MdReceiptLong size={25} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Transaction ID
                            </p>
                            <h2 className="mt-1 text-base font-bold text-gray-900">
                                {Trans.transactionId || "-"}
                            </h2>
                        </div>
                    </div>

                    <Badge
                        text={Trans.paymentStatus || "Unknown"}
                        variant={statusVariants[Trans.paymentStatus] || "default"}
                    />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
                    <div>
                        <p className="text-xs text-gray-500">Transaction Amount</p>
                        <p className="mt-1 text-lg font-bold text-gray-900">
                            {formatCurrency(transactionAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Transaction Type</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {Trans.transactionType || "-"}
                        </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-xs text-gray-500">Currency</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {Trans.currency || "INR"}
                        </p>
                    </div>
                </div>
            </div>

            {Trans.paymentStatus === "Failed" && Trans.failureReason && (
                <div className="flex gap-3 rounded-md border border-red-200 bg-red-50 p-4">
                    <MdError className="mt-0.5 shrink-0 text-red-600" size={21} />
                    <div>
                        <h3 className="text-sm font-semibold text-red-700">
                            Payment Failed
                        </h3>
                        <p className="mt-1 text-sm text-red-600">
                            {Trans.failureReason}
                        </p>
                    </div>
                </div>
            )}

            <Section icon={MdReceiptLong} title="Transaction Information">
                <InfoItem
                    icon={MdReceiptLong}
                    label="Transaction ID"
                    value={Trans.transactionId}
                    iconColor="text-[#ac1e44]"
                    iconBg="bg-[#ac1e44]/10"
                />
                <InfoItem
                    icon={MdShoppingBag}
                    label="Order ID"
                    value={Trans.orderId}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                />
                <InfoItem
                    icon={MdPayments}
                    label="Transaction Type"
                    value={Trans.transactionType}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-50"
                />
                <InfoItem
                    icon={MdCalendarToday}
                    label="Transaction Date"
                    value={formatDateTime(Trans.transactionDate)}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-50"
                />
                <InfoItem
                    icon={MdCalendarToday}
                    label="Payment Date"
                    value={Trans.paymentDate ? formatDateTime(Trans.paymentDate) : "Not completed"}
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                />
                <InfoItem
                    icon={MdRefresh}
                    label="Last Updated"
                    value={formatDateTime(Trans.updatedAt)}
                    iconColor="text-cyan-600"
                    iconBg="bg-cyan-50"
                />
            </Section>

            <Section icon={MdPerson} title="Customer Information">
                <InfoItem
                    icon={MdPerson}
                    label="Customer Name"
                    value={Trans.customerName}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                />

                <InfoItem
                    icon={MdEmail}
                    label="Email Address"
                    value={Trans.customerEmail}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-50"
                />

                <InfoItem
                    icon={MdPhone}
                    label="Mobile Number"
                    value={Trans.customerPhone}
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                />

                <InfoItem
                    icon={MdCreditCard}
                    label="Payment Method"
                    value={Trans.paymentMethod}
                    iconColor="text-indigo-600"
                    iconBg="bg-indigo-50"
                />

                <InfoItem
                    icon={MdCalendarToday}
                    label="Transaction Date"
                    value={formatDateTime(Trans.transactionDate)}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-50"
                />

                <InfoItem
                    icon={MdShoppingBag}
                    label="Order ID"
                    value={Trans.orderId}
                    iconColor="text-[#ac1e44]"
                    iconBg="bg-[#ac1e44]/10"
                />
            </Section>

            <Section icon={MdCreditCard} title="Payment Information">
                <InfoItem
                    icon={MdCreditCard}
                    label="Payment Method"
                    value={Trans.paymentMethod}
                    iconColor="text-indigo-600"
                    iconBg="bg-indigo-50"
                />
                <InfoItem
                    icon={MdPayments}
                    label="Payment Provider"
                    value={Trans.paymentProvider}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-50"
                />
                <InfoItem
                    icon={MdAccountBalance}
                    label="Payment Gateway"
                    value={Trans.paymentGateway}
                    iconColor="text-cyan-600"
                    iconBg="bg-cyan-50"
                />
                <InfoItem
                    icon={MdInfo}
                    label="Payment Status"
                    value={
                        <Badge
                            text={Trans.paymentStatus || "Unknown"}
                            variant={statusVariants[Trans.paymentStatus] || "default"}
                        />
                    }
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                />
            </Section>

            <section className="overflow-hidden rounded-md border border-gray-200 bg-white">
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-4 py-3">
                    <MdCurrencyRupee className="text-[#ac1e44]" size={19} />
                    <h3 className="text-sm font-semibold text-gray-800">
                        Amount Breakdown
                    </h3>
                </div>

                <div className="space-y-3 p-4">
                    <div className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-500"> Net Amount</span>
                        <span className="font-medium text-gray-800">
                            {formatCurrency(netAmount)}
                        </span>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-500">Transaction Fee</span>
                        <span className="font-medium text-gray-800">
                            {formatCurrency(transactionFee)}
                        </span>
                    </div>

                    <div className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-500">Tax Amount</span>
                        <span className="font-medium text-gray-800">
                            {formatCurrency(taxAmount)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-dashed border-gray-200 pt-3">
                        <span className="text-sm font-semibold text-gray-700">
                            Transaction Amount
                        </span>
                        <span className="text-lg font-bold text-[#ac1e44]">
                            {formatCurrency(transactionAmount)}
                        </span>
                    </div>
                </div>
            </section>

            {Trans.refundDetails && (
                <Section icon={MdRefresh} title="Refund Information">
                    <InfoItem
                        icon={MdReceiptLong}
                        label="Refund ID"
                        value={Trans.refundDetails.refundId}
                        iconColor="text-[#ac1e44]"
                        iconBg="bg-[#ac1e44]/10"
                    />
                    <InfoItem
                        icon={MdPayments}
                        label="Refund Amount"
                        value={formatCurrency(Trans.refundDetails.refundAmount)}
                        iconColor="text-green-600"
                        iconBg="bg-green-50"
                    />
                    <InfoItem
                        icon={MdInfo}
                        label="Refund Status"
                        value={Trans.refundDetails.refundStatus}
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                    />
                    <InfoItem
                        icon={MdCalendarToday}
                        label="Refund Date"
                        value={formatDateTime(Trans.refundDetails.refundDate)}
                        iconColor="text-orange-600"
                        iconBg="bg-orange-50"
                    />
                    <InfoItem
                        icon={MdDescription}
                        label="Refund Reason"
                        value={Trans.refundDetails.reason}
                        iconColor="text-purple-600"
                        iconBg="bg-purple-50"
                        className="sm:col-span-2"
                    />
                </Section>
            )}

            {Trans.description && (
                <div className="rounded-md border border-gray-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <MdDescription className="text-[#ac1e44]" size={19} />
                        <h3 className="text-sm font-semibold text-gray-800">
                            Description
                        </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                        {Trans.description}
                    </p>
                </div>
            )}

        </div>
    );
};

export default TransactionsView;