import React from "react";
import { assets } from "../assets/assets";

const Footer = () => (
    <div className="bg-gray-900 text-white mt-0">
        <div className="container px-4 2xl:px-20 mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <img width={140} src={assets.logo} alt="" className="brightness-200 invert" />
            <p className="text-gray-400 text-sm">© 2024 JobPortal. All rights reserved.</p>
            <div className="flex gap-3">
                <img width={32} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" src={assets.facebook_icon} alt="" />
                <img width={32} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" src={assets.twitter_icon} alt="" />
                <img width={32} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" src={assets.instagram_icon} alt="" />
            </div>
        </div>
    </div>
)

export default Footer
