import React from "react";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline, MdArrowBack, MdHome } from "react-icons/md";
import EmptyState from "../../components/EmptyState";
import Button from "../../components/Button";
import theme from "../../theme/theme";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <EmptyState
                icon={MdErrorOutline}
                iconSize={72}
                iconClassName={theme.text_primary}
                variant="minimal"
                size="lg"
                title="404 - Page Not Found"
                description="Oops! The page you're looking for doesn't exist or may have been moved. Please check the URL and try again."
                className="max-w-2xl"

                action={
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            // variant="primary"
                            className={`${theme.bg_primary}  , ${theme.bg_primary_hover}`}
                            onClick={() => navigate("/admin/dashboard")}
                        >
                            <MdHome className="mr-2 text-lg" />
                            Back to Dashboard
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                        >
                            <MdArrowBack className="mr-2 text-lg" />
                            Go Back
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default NotFound;