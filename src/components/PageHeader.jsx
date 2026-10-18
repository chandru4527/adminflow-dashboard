import React from "react";
import { twMerge } from "tailwind-merge";
import { MdAdd, MdRefresh } from "react-icons/md";
import Container from "./Container";
import Button from "./Button";

import theme from '../theme/theme';

const PageHeader = ({
    title,
    titleIcon: TitleIcon,
    description,
    actionLabel,
    actionIcon: ActionIcon = MdAdd,
    onClick,
    actionVariant = "primary",
    actionLoading = false,
    actionDisabled = false,
    onRefresh,
    refreshLoading = false,
    refreshDisabled = false,
    refresh_className,
    className = "",

}) => {
    return (
        <Container className={twMerge(className)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    {title && (
                        <div className="flex items-center gap-2">
                            {TitleIcon && (
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${theme.text_primary}`}>
                                    <TitleIcon size={22} />
                                </div>
                            )}

                            <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                {title}
                            </h1>
                        </div>
                    )}

                    {description && (
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

                {(onRefresh || (actionLabel && onClick)) && (
                    <div className="flex shrink-0 items-center gap-2">
                        {onRefresh && (
                            <Button
                                type="button"
                                variant="theme"
                                icon={MdRefresh}
                                iconSize={18}
                                text="Refresh"
                                onClick={onRefresh}
                                loading={refreshLoading}
                                disabled={refreshDisabled}
                                className={refresh_className}
                            />
                        )}

                        {actionLabel && onClick && (
                            <Button
                                type="button"
                                text={actionLabel}
                                variant={actionVariant || "theme"}
                                icon={ActionIcon}
                                iconSize={15}
                                onClick={onClick}
                                loading={actionLoading}
                                disabled={actionDisabled}
                            />
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default PageHeader;