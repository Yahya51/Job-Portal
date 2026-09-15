import React, { useContext, useEffect, useState } from "react";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";

const ManageJobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState(false)
    const { backendUrl, companyToken } = useContext(AppContext)

    const fetchCompanyJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
                { headers: { token: companyToken } }
            )
            if (data.success) { setJobs(data.jobsData.reverse()) }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    const changeJobVisibility = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-visibility',
                { id },
                { headers: { token: companyToken } }
            )
            if (data.success) { toast.success(data.message); fetchCompanyJobs() }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    useEffect(() => { if (companyToken) fetchCompanyJobs() }, [companyToken])

    return jobs ? jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-4xl mb-3">💼</p>
            <p className="text-gray-500">No jobs posted yet.</p>
            <button onClick={() => navigate('/dashboard/add-job')} className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">
                Post your first job
            </button>
        </div>
    ) : (
        <div>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>Manage Jobs</h2>
                    <p className="text-sm text-gray-500 mt-1">{jobs.length} jobs posted</p>
                </div>
                <button onClick={() => navigate('/dashboard/add-job')} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    + Add New Job
                </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden">#</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden">Date</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden">Location</th>
                                <th className="py-3.5 px-5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="py-3.5 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Visible</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {jobs.map((job, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-5 text-sm text-gray-400 max-sm:hidden">{index + 1}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-gray-900">{job.title}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500 max-sm:hidden">{moment(job.date).format('DD MMM YYYY')}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500 max-sm:hidden">{job.location}</td>
                                    <td className="py-4 px-5 text-center">
                                        <span className="inline-flex items-center justify-center w-7 h-7 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">{job.applicants}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={job.visible} onChange={() => changeJobVisibility(job._id)} />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                                        </label>
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

export default ManageJobs
