import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const statusStyle = {
    Accepted: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border border-red-200',
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
}

const Applications = () => {
    const { user } = useUser()
    const { getToken } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [resume, setResume] = useState(null)
    const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

    const updateResume = async () => {
        try {
            const formData = new FormData()
            formData.append('resume', resume)
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) { toast.success(data.message); await fetchUserData() }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
        setIsEdit(false); setResume(null)
    }

    useEffect(() => { if (user) fetchUserApplications() }, [user])

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-[#f5f2ed] py-10'>
                <div className='container px-4 2xl:px-20 mx-auto'>
                    {/* Resume section */}
                    <div className='bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm'>
                        <h2 className='text-lg font-bold text-gray-900 mb-4' style={{fontFamily:'Syne,sans-serif'}}>Your Resume</h2>
                        <div className='flex items-center gap-3'>
                            {isEdit || (userData && userData.resume === "")
                                ? <>
                                    <label className='flex items-center gap-2 cursor-pointer' htmlFor='resumeUpload'>
                                        <div className='bg-teal-50 border border-teal-200 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors'>
                                            {resume ? resume.name : "Choose PDF file"}
                                        </div>
                                        <img src={assets.profile_upload_icon} className="h-5 opacity-50" alt='' />
                                        <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
                                    </label>
                                    <button onClick={updateResume} className='bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors'>Save</button>
                                </>
                                : <div className='flex gap-2'>
                                    <a target='_blank' href={userData.resume} className='bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2'>
                                        <img src={assets.resume_selected} className="h-4" alt="" />
                                        View Resume
                                    </a>
                                    <button onClick={() => setIsEdit(true)} className='border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'>
                                        Edit
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Applications table */}
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
                        <div className='p-6 border-b border-gray-100'>
                            <h2 className='text-lg font-bold text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>Applied Jobs</h2>
                            <p className='text-sm text-gray-500 mt-1'>{userApplications?.length || 0} applications</p>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='min-w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='py-3 px-6 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Company</th>
                                        <th className='py-3 px-6 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Job Title</th>
                                        <th className='py-3 px-6 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden'>Location</th>
                                        <th className='py-3 px-6 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden'>Date</th>
                                        <th className='py-3 px-6 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-50'>
                                    {userApplications?.map((job, index) => (
                                        <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                            <td className='py-4 px-6 flex items-center gap-3'>
                                                <img className='w-9 h-9 rounded-lg object-contain border border-gray-100 p-1' src={job.companyId.image} alt='' />
                                                <span className='text-sm font-medium text-gray-800'>{job.companyId.name}</span>
                                            </td>
                                            <td className='py-4 px-6 text-sm text-gray-700'>{job.jobId.title}</td>
                                            <td className='py-4 px-6 text-sm text-gray-500 max-sm:hidden'>{job.jobId.location}</td>
                                            <td className='py-4 px-6 text-sm text-gray-500 max-sm:hidden'>{moment(job.date).format('DD MMM YYYY')}</td>
                                            <td className='py-4 px-6'>
                                                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${statusStyle[job.status] || statusStyle.Pending}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(!userApplications || userApplications.length === 0) && (
                                <div className="py-16 text-center text-gray-400">
                                    <p className="text-3xl mb-2">📋</p>
                                    <p>No applications yet. Start applying!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Applications;
