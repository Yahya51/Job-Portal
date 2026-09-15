import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => (
    <div className="container px-4 2xl:px-20 mx-auto my-16">
        <div className="relative bg-gradient-to-br from-gray-900 to-teal-900 rounded-3xl p-12 sm:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-sm">
                <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">Mobile App</span>
                <h2 className="text-white font-bold text-3xl mb-4 leading-tight" style={{fontFamily:'Syne,sans-serif'}}>Apply on the Go</h2>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Get instant job alerts, apply faster, and track your applications — all from your phone.</p>
                <div className="flex gap-3">
                    <a href="#" className="inline-block hover:scale-105 transition-transform">
                        <img className="h-11" src={assets.play_store} alt='Google Play' />
                    </a>
                    <a href="#" className="inline-block hover:scale-105 transition-transform">
                        <img className="h-11" src={assets.app_store} alt='App Store' />
                    </a>
                </div>
            </div>
            <img className="absolute right-8 bottom-0 w-64 max-lg:hidden" src={assets.app_main_img} alt='' />
        </div>
    </div>
)

export default AppDownload
