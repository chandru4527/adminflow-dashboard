import React from 'react'
import { useRouteError } from 'react-router-dom'


const Error = () => {
    
    const error = useRouteError()

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold">Oops!</h1>

                <p className="mt-4 text-gray-600">
                    {error?.statusText || error?.message || "Something went wrong"}
                </p>
            </div>
        </div>
    )
}

export default Error