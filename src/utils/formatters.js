import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// format number
export const formatNumber = (value, options = {}) => {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return new Intl.NumberFormat("en-IN", options).format(Number(value));
};

// format currency
export const formatCurrency = (value, currency = "INR", options = {}) => {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
        ...options,
    }).format(Number(value));
};

// format date
export const formatDate = (date, format = "DD MMM YYYY") => {
    if (!date) {
        return "-";
    }

    const parsedDate = dayjs.utc(date);

    if (!parsedDate.isValid()) {
        return "-";
    }

    return parsedDate.format(format);
};

// format date and time
export const formatDateTime = (date) => {
    if (!date) {
        return "-";
    }

    const parsedDate = dayjs(date);

    if (!parsedDate.isValid()) {
        return "-";
    }

    return parsedDate.format("DD MMM YYYY, hh:mm A");
};

// format mobile number
export const formatPhoneNumber = (phone) => {
    if (!phone) {
        return "-";
    }

    const value = String(phone).replace(/\D/g, "");

    if (value.length === 10) {
        return `${value.slice(0, 5)} ${value.slice(5)}`;
    }

    return phone;
};