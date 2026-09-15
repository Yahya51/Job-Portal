import React, { useContext } from "react";
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = ({ dark = false }) => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)

    const bg = dark ? 'bg-transparent' : 'bg-white border-b border-gray-100 shadow-sm'
    const textColor = dark ? 'text-white' : 'text-gray-700'

    return (
        <div className={`${bg} py-4 sticky top-0 z-50 backdrop-blur-md`}>
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img onClick={() => navigate('/')} className="cursor-pointer h-8" src={assets.logo} alt="JobPortal" />
                {user
                    ? <div className="flex items-center gap-4">
                        <Link to={'/applications'} className={`text-sm font-medium ${dark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                            My Applications
                        </Link>
                        <p className={`text-sm ${dark ? 'text-white/60' : 'text-gray-400'}`}>|</p>
                        <p className={`max-sm:hidden text-sm ${dark ? 'text-white/80' : 'text-gray-600'}`}>Hi, {user.firstName}</p>
                        <UserButton />
                    </div>
                    : <div className="flex gap-3 items-center">
                        <button onClick={() => setShowRecruiterLogin(true)} className={`text-sm font-medium ${dark ? 'text-white/80 hover:text-amber-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                            Recruiter Login
                        </button>
                        <button onClick={() => openSignIn()} className="bg-amber-500 hover:bg-amber-400 text-white text-sm px-5 py-2 rounded-full font-medium transition-colors">
                            Sign In
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
export default Navbar;
