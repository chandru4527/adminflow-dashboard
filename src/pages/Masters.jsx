import { Outlet } from "react-router-dom";
import { MdCategory, } from "react-icons/md";
import Tabs from "../components/Tabs";

const Masters = () => {
    const tabs = [
        { label: "Categories", to: "/admin/masters/categories", icon: MdCategory },
    ];

    return (
        <div className="space-y-5">

            <Tabs
                items={tabs}
                type="navlink"
                variant="underline"
                size="md"
            />

            <Outlet />
        </div>
    );
};

export default Masters;