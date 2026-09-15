import React from 'react'

const Loading = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading...</p>
        </div>
    </div>
)

export default Loading
