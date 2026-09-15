import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
    const navigate = useNavigate()
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) navigate('/dashboard/manage-jobs')
    }, [companyData])

    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
         ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`

    return (
        <div className="min-h-screen bg-[#f5f2ed]">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-100 shadow-sm py-3.5 px-6 flex justify-between items-center sticky top-0 z-40">
                <img onClick={() => navigate('/')} className="h-7 cursor-pointer" src={assets.logo} alt="" />
                {companyData && (
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600 max-sm:hidden">Welcome, <span className="font-semibold text-gray-900">{companyData.name}</span></p>
                        <div className="relative group">
                            <img className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover cursor-pointer" src={companyData?.image} alt="" />
                            <div className="absolute hidden group-hover:block top-full right-0 mt-1 z-50 bg-white rounded-xl border border-gray-100 shadow-lg py-1 min-w-[120px]">
                                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-16 sm:w-56 min-h-[calc(100vh-60px)] bg-white border-r border-gray-100 p-3 sticky top-[60px] shrink-0">
                    <nav className="flex flex-col gap-1 pt-2">
                        <NavLink className={navClass} to="/dashboard/add-job">
                            <img className="h-5 opacity-60" src={assets.add_icon} alt="" />
                            <span className="max-sm:hidden">Add Job</span>
                        </NavLink>
                        <NavLink className={navClass} to="/dashboard/manage-jobs">
                            <img className="h-5 opacity-60" src={assets.home_icon} alt="" />
                            <span className="max-sm:hidden">Manage Jobs</span>
                        </NavLink>
                        <NavLink className={navClass} to="/dashboard/view-application">
                            <img className="h-5 opacity-60" src={assets.person_tick_icon} alt="" />
                            <span className="max-sm:hidden">Applications</span>
                        </NavLink>
                    </nav>
                </aside>

                {/* Main */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Dashboard
