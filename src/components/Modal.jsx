import { useEffect } from "react";

// icons
import { MdClose } from "react-icons/md";

// components
import Button from "./Button";

// store
import useModalStore from "../store/modalStore.js";

const sizes = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
    full: "max-w-[95vw]",
};

const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
};

const Modal = () => {
    const {
        isOpen, title, icon: Icon, content, size, rounded, action,
        closeModal, showFooter, formId,
    } = useModalStore();

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && !action.loading) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, action.loading, closeModal]);

    if (!isOpen) return null;

    const handleClose = () => {
        if (action.loading) return;
        closeModal();
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget && !action.loading) {
            closeModal();
        }
    };

    const handleAction = () => {
        if (action.loading) return;

        if (action.onClick) {
            action.onClick();
            return;
        }

        closeModal();
    };

    return (
        <div
            onMouseDown={handleOverlayClick}
            className="fixed inset-0 z-1000 flex animate-fade-in items-center justify-center bg-black/50 p-4"
        >
            <div
                className={`flex max-h-[90vh] w-full animate-modal-drop flex-col overflow-hidden bg-white shadow-xl ${sizes[size] || sizes.md} ${roundedStyles[rounded] || roundedStyles.lg}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex shrink-0 items-center justify-between px-5 py-3">
                    <div className="flex min-w-0 items-center gap-1">
                        {Icon && (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-green-600">
                                <Icon size={20} />
                            </div>
                        )}

                        <h2
                            id="modal-title"
                            className="text-lg font-bold text-gray-900"
                        >
                            {title}
                        </h2>
                    </div>

                    <Button
                        type="button"
                        variant="normal"
                        icon={MdClose}
                        iconSize={21}
                        shape="square"
                        size="sm"
                        onClick={handleClose}
                        disabled={action.loading}
                        aria-label="Close modal"
                        className="h-8! w-8! rounded-md p-0!"
                    />
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-5">
                    {content}
                </div>

                {showFooter && (
                    <div className="flex shrink-0 justify-end gap-3 px-5 py-3">
                        <Button
                            type="button"
                            text="Cancel"
                            variant="secondary"
                            size="md"
                            onClick={handleClose}
                            disabled={action.loading}
                        />

                        <Button
                            type={formId ? "submit" : "button"}
                            form={formId || undefined}
                            text={action.label}
                            variant={action.variant || "primary"}
                            size="md"
                            loading={action.loading}
                            loadingText={action.loadingText || "Loading..."}
                            disabled={action.disabled || action.loading}
                            onClick={!formId ? handleAction : undefined}
                            className={action.className}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;