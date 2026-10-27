import React from 'react'

import { MdAnalytics } from "react-icons/md";
import EmptyState from "../components/EmptyState";

const Analytics = () => {
    return (
        <div className='flex justify-center items-center min-h-[70vh]'>
            <EmptyState
                icon={MdAnalytics}
                title="Analytics Under Development"
                description="We're working on powerful analytics and reporting features. Stay tuned for detailed insights into your platform's performance."
                variant="minimal"
            />
        </div>
    )
}

export default Analytics