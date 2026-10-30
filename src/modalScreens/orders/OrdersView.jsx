import React from "react";

// icons
import { MdShoppingBag, MdPerson, MdLocationOn, MdPayment, MdLocalShipping, MdCalendarToday } from "react-icons/md";

// components
import Badge from "../../components/Badge";
import Image from '../../components/media/Image';
import Container from "../../components/Container";

// utils
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const statusVariants = {
    Pending: "warning",
    Processing: "info",
    Shipped: "primary",
    Delivered: "success",
    Cancelled: "danger",
};

const paymentVariants = {
    Paid: "success",
    Pending: "warning",
    Failed: "danger",
    Refunded: "info",
};

const Section = ({ icon: Icon, title, children }) => (

    <Container className="rounded-md border border-gray-200 bg-white p-4 sm:p-5 shadow">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Icon className="text-lg text-[#AC1E44]" />
            {title}
        </h3>
        {children}
    </Container>
);

const Detail = ({ label, value }) => (
    <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-gray-800">
            {value ?? "-"}
        </p>
    </div>
);

const OrdersView = ({ order }) => {
    if (!order) {
        return (
            <div className="py-10 text-center text-sm text-gray-500">
                No order details available.
            </div>
        );
    }

    const address = order.shippingAddress;
    const items = order.items ?? [];

    return (
        <div className="space-y-5">

            <div className="flex flex-col justify-between gap-3 rounded-md bg-gray-50 p-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs text-gray-500">Order Number</p>
                    <h2 className="mt-1 text-lg font-bold text-gray-900">
                        {order.orderNumber}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Placed on {formatDateTime(order.orderedAt)}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge
                        text={order.orderStatus}
                        variant={statusVariants[order.orderStatus] || "default"}
                    />
                    <Badge
                        text={order.paymentStatus}
                        variant={paymentVariants[order.paymentStatus] || "default"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Section icon={MdPerson} title="Customer Information">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Detail label="Customer Name" value={order.customerName} />
                        <Detail label="Customer ID" value={order.userId} />
                        <Detail label="Email Address" value={order.customerEmail} />
                        <Detail label="Order ID" value={order.orderNumber} />
                    </div>
                </Section>

                <Section icon={MdPayment} title="Payment Information">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Detail label="Payment Method" value={order.paymentMethod} />
                        <Detail label="Payment Status" value={order.paymentStatus} />
                        <Detail label="Subtotal" value={formatCurrency(order.subtotal)} />
                        <Detail label="Discount" value={formatCurrency(order.discount)} />
                    </div>
                </Section>
            </div>

            <Section icon={MdShoppingBag} title={`Ordered Products (${items.length})`}>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={`${item.productId}-${index}`}
                            className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0 sm:items-center"
                        >
                            <Image
                                src={item.image}
                                alt={item.productName}
                                className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-semibold text-gray-800">
                                    {item.productName}
                                </h4>
                                <p className="mt-1 text-xs text-gray-500">
                                    Product ID: {item.productId}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {formatCurrency(item.price)} × {item.quantity}
                                </p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 sm:text-right">
                                {formatCurrency(item.subtotal)}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Section icon={MdLocationOn} title="Shipping Address">
                    {address ? (
                        <div className="space-y-1 text-sm text-gray-600">
                            <p className="font-medium text-gray-800">
                                {order.customerName}
                            </p>
                            <p>{address.street}</p>
                            <p>
                                {address.city}, {address.state}
                            </p>
                            <p>{address.country} - {address.pincode}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No shipping address available.
                        </p>
                    )}
                </Section>

                <Section icon={MdLocalShipping} title="Delivery Information">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Detail
                            label="Tracking Number"
                            value={order.trackingNumber || "Not assigned"}
                        />
                        <Detail
                            label="Order Status"
                            value={order.orderStatus}
                        />
                        <Detail
                            label="Delivered At"
                            value={formatDateTime(order.deliveredAt)}
                        />
                        <Detail
                            label="Total Items"
                            value={order.totalItems}
                        />
                    </div>
                </Section>
            </div>

            <Section icon={MdCalendarToday} title="Order Summary">
                <div className="space-y-3">
                    <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-800">
                            {formatCurrency(order.subtotal)}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="font-medium text-green-600">
                            -{formatCurrency(order.discount)}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-500">Shipping Charge</span>
                        <span className="font-medium text-gray-800">
                            {formatCurrency(order.shippingCharge)}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-gray-200 pt-3">
                        <span className="font-semibold text-gray-900">
                            Total Amount
                        </span>
                        <span className="text-lg font-bold text-[#AC1E44]">
                            {formatCurrency(order.totalAmount)}
                        </span>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default OrdersView;