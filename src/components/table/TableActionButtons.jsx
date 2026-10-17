import React from "react";
import { MdVisibility, MdEdit, MdDelete, MdCheckCircle, MdCancel, } from "react-icons/md";
import Button from "../Button";

const ReusableTableActions = ({
    row,
    onView,
    onEdit,
    onDelete,
    onApprove,
    onReject,
    showView = true,
    showEdit = true,
    showDelete = true,
    showApprove = true,
    showReject = true,
    iconSize = 18,
    buttonClassName = "p-2!",
}) => {
    return (
        <div className="flex items-center gap-2">
            {showView && onView && (
                <Button
                    type="button"
                    variant="tableView"
                    size="sm"
                    icon={MdVisibility}
                    iconSize={iconSize}
                    className={buttonClassName}
                    onClick={() => onView(row)}
                    aria-label="View"
                    title="View"
                />
            )}

            {showEdit && onEdit && (
                <Button
                    type="button"
                    variant="tableEdit"
                    size="sm"
                    icon={MdEdit}
                    iconSize={iconSize}
                    className={buttonClassName}
                    onClick={() => onEdit(row)}
                    aria-label="Edit"
                    title="Edit"
                />
            )}

            {showDelete && onDelete && (
                <Button
                    type="button"
                    variant="tableDelete"
                    size="sm"
                    icon={MdDelete}
                    iconSize={iconSize}
                    className={buttonClassName}
                    onClick={() => onDelete(row)}
                    aria-label="Delete"
                    title="Delete"
                />
            )}

            {showApprove && onApprove && (
                <Button
                    type="button"
                    variant="success"
                    size="sm"
                    icon={MdCheckCircle}
                    iconSize={iconSize}
                    className={`bg-green-50 p-2! hover:bg-green-100 text-green-600`}
                    onClick={() => onApprove(row)}
                    aria-label="Approve"
                    title="Approve"
                />
            )}

            {showReject && onReject && (
                <Button
                    type="button"
                    variant="tableDelete"
                    size="sm"
                    icon={MdCancel}
                    iconSize={iconSize}
                    className={buttonClassName}
                    onClick={() => onReject(row)}
                    aria-label="Reject"
                    title="Reject"
                />
            )}
        </div>
    );
};

export default ReusableTableActions;