import React from "react";
import { MdCurrencyRupee } from "react-icons/md";
import PageHeader from "../components/PageHeader";

const Revenue = () => {
    return (
        <div className="space-y-5">
            <PageHeader
                titleIcon={MdCurrencyRupee}
                title="Revenue Overview"
                description="Monitor revenue, payments, refunds, and your platform's financial performance."
            />
        </div>
    );
};

export default Revenue;