import React from 'react'
import { assets } from '../assets/assets'

const TrustedBy = () => (
    <div className="bg-white border-b border-gray-100">
        <div className="container 2xl:px-20 mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mr-2">Trusted by</p>
                {[assets.microsoft_logo, assets.walmart_logo, assets.accenture_logo, assets.samsung_logo, assets.amazon_logo, assets.adobe_logo].map((logo, i) => (
                    <img key={i} className="h-6 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300" src={logo} alt="" />
                ))}
            </div>
        </div>
    </div>
)

export default TrustedBy
