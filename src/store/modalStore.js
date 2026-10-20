import { create } from "zustand";

const defaultAction = {
    label: "Close",
    variant: "theme",
    onClick: null,
    loading: false,
    loadingText: "Loading...",
    disabled: false,
    className: "",
};

const useModalStore = create((set) => ({
    isOpen: false,
    title: "",
    icon: null,
    content: null,
    size: "md",
    rounded: "lg",
    showFooter: true,
    formId: "",
    action: { ...defaultAction },

    setAction: (action = {}) =>
        set((state) => ({
            action: { ...state.action, ...action },
        })),

    setActionLoading: (loading) =>
        set((state) => ({
            action: { ...state.action, loading },
        })),

    setActionLoadingText: (loadingText) =>
        set((state) => ({
            action: { ...state.action, loadingText },
        })),

    openModal: ({
        title = "",
        icon = null,
        content = null,
        size = "md",
        rounded = "lg",
        showFooter = true,
        formId = "",
        action = {},
    }) =>
        set({
            isOpen: true,
            title,
            icon,
            content,
            size,
            rounded,
            showFooter,
            formId,
            action: {
                ...defaultAction,
                ...action,
            },
        }),

    closeModal: () =>
        set({
            isOpen: false,
            title: "",
            icon: null,
            content: null,
            size: "md",
            rounded: "lg",
            showFooter: true,
            formId: "",
            action: { ...defaultAction },
        }),
}));

export default useModalStore;