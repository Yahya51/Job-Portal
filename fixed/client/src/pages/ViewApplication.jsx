import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplication = () => {
    const { backendUrl, companyToken } = useContext(AppContext)
    const [applicants, setApplicants] = useState(false)

    const fetchCompanyJobApplications = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/applicants',
                { headers: { token: companyToken } }
            )
            if (data.success) { setApplicants(data.applications.reverse()) }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    const changeJobApplicationStatus = async (id, status) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-status',
                { id, status },
                { headers: { token: companyToken } }
            )
            if (data.success) { toast.success(`Application ${status}`); fetchCompanyJobApplications() }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    useEffect(() => { if (companyToken) fetchCompanyJobApplications() }, [companyToken])

    const statusStyle = {
        Accepted: 'text-emerald-600 bg-emerald-50',
        Rejected: 'text-red-600 bg-red-50',
        Pending: 'text-amber-600 bg-amber-50',
    }

    return applicants ? applicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-4xl mb-3">📨</p>
            <p className="text-gray-500">No applications received yet.</p>
        </div>
    ) : (
        <div>
            <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>Applications</h2>
                <p className="text-sm text-gray-500 mt-1">{applicants.length} total applications</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden">Job Title</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden">Location</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-5 text-sm text-gray-400">{index + 1}</td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <img className="w-9 h-9 rounded-full object-cover border border-gray-100" src={applicant.userId.image} alt="" />
                                            <span className="text-sm font-medium text-gray-800">{applicant.userId.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-sm text-gray-600 max-sm:hidden">{applicant.jobId.title}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500 max-sm:hidden">{applicant.jobId.location}</td>
                                    <td className="py-4 px-5">
                                        <a href={applicant.userId.resume} target="_blank"
                                            className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                            <img src={assets.resume_download_icon} className="h-3.5" alt="" />
                                            View
                                        </a>
                                    </td>
                                    <td className="py-4 px-5">
                                        {applicant.status === "Pending"
                                            ? <div className="relative inline-block group">
                                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                                    Review ▾
                                                </button>
                                                <div className="absolute hidden group-hover:block left-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden min-w-[120px]">
                                                    <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                                                        className="block w-full text-left px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">
                                                        ✓ Accept
                                                    </button>
                                                    <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                                                        className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                                                        ✗ Reject
                                                    </button>
                                                </div>
                                            </div>
                                            : <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-medium ${statusStyle[applicant.status] || ''}`}>
                                                {applicant.status}
                                            </span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : <Loading />
}

export default ViewApplication
