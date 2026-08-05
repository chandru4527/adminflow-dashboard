import React from "react";
import { MdClose } from "react-icons/md";

const BookingModel = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4">

            <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-600">
                        Booking Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded p-1 hover:bg-gray-100"
                    >
                        <MdClose size={22} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-2">
                    <div className="space-y-5">
                        {/* Booking + Customer */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Booking Info */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-black">
                                    Booking Info
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">ID:</span> {data.cookdinId}</p>
                                    <p><span className="font-medium">OTP:</span> {data.bookingOTP || "N/A"}</p>
                                    <p><span className="font-medium">Status:</span> {data.status}</p>
                                    <p>
                                        <span className="font-medium">Booking Date:</span>{" "}
                                        {(() => {
                                            if (!data.bookingDate) return "N/A";
                                            const d = new Date(data.bookingDate);
                                            if (Number.isNaN(d.getTime())) return "N/A";
                                            const day = String(d.getDate()).padStart(2, "0");
                                            const month = String(d.getMonth() + 1).padStart(2, "0");
                                            const year = d.getFullYear();
                                            return `${day}/${month}/${year}`;
                                        })()}
                                    </p>
                                    <p><span className="font-medium">Time Slot:</span> {data.timeSlot}</p>
                                    <p><span className="font-medium">GST:</span> ₹{data.gstAmount}</p>
                                    <p>
                                        <span className="font-medium">Total:</span> ₹
                                        {(data.service?.basePrice || 0) + (data.gstAmount || 0)}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-black">
                                    Customer Info
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Name:</span> {data.customer?.name || "N/A"}</p>
                                    <p><span className="font-medium">Phone:</span> {data.customer?.phone || "N/A"}</p>
                                    <p><span className="font-medium">Email:</span> {data.customer?.email || "N/A"}</p>
                                </div>

                                <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-800">
                                    Location
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">City:</span> {data.location?.city || "N/A"}</p>
                                    <p><span className="font-medium">Address:</span> {data.location?.addressLine || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment + Service */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Payment Details */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-black">
                                    Payment Details
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="font-medium">Status:</span>{" "}
                                        {data.service?.paymentDetails?.isPaid ? "Paid" : "Pending"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Method:</span>{" "}
                                        {data.service?.paymentDetails?.paymentId || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Date:</span>{" "}
                                        {data.service?.paymentDetails?.paymentDate
                                            ? new Date(
                                                data.service.paymentDetails.paymentDate
                                            ).toLocaleString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-black">
                                    Service Info
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="font-medium">Name:</span>{" "}
                                        {data.service?.categories?.[0]?.categoryName || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Cuisines:</span>{" "}
                                        {data.service?.cuisines?.map((c) => c.name).join(", ") || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Meal Preferences:</span>{" "}
                                        {data.service?.mealPreference?.join(", ") || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Base Price:</span> ₹
                                        {data.service?.basePrice || 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Images */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-black">
                                Booking Images
                            </h3>

                            {data.bookingCompletedImages?.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {data.bookingCompletedImages.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Booking ${idx}`}
                                            className="h-24 w-24 rounded-lg border object-cover"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No images uploaded.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModel;