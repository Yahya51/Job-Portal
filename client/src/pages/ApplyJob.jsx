import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from "k-convert";
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
    const { id } = useParams();
    const { getToken } = useAuth();
    const navigate = useNavigate()
    const [JobData, setJobData] = useState(null)
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
    const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

    const fetchJob = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
            if (data.success) { setJobData(data.job) }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    const applyHandler = async () => {
        try {
            if (!userData) return toast.error('Login to apply for jobs')
            if (!userData.resume) { navigate('/applications'); return toast.error('Upload resume to apply') }
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/jobs/apply',
                { jobId: JobData._id },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) { toast.success(data.message); fetchUserApplications() }
            else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    const checkAlreadyApplied = () => {
        const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
        setIsAlreadyApplied(hasApplied)
    }

    useEffect(() => { fetchJob() }, [id])
    useEffect(() => { if (userApplications?.length > 0 && JobData) checkAlreadyApplied() }, [JobData, userApplications, id])

    return JobData ? (
        <>
            <Navbar />
            <div className='min-h-screen bg-[#f5f2ed] py-10'>
                <div className='container px-4 2xl:px-20 mx-auto'>
                    {/* Job Header Card */}
                    <div className='bg-white rounded-2xl border border-gray-100 p-8 mb-6 shadow-sm'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
                                <img className='h-16 w-16 object-contain bg-gray-50 rounded-xl p-2 border border-gray-100' src={JobData.companyId.image} alt="" />
                                <div>
                                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>{JobData.title}</h1>
                                    <div className='flex flex-wrap gap-4 items-center text-sm text-gray-500 mt-2'>
                                        <span className='flex items-center gap-1.5'>
                                            <img src={assets.suitcase_icon} className="h-4 opacity-60" alt='' />
                                            {JobData.companyId.name}
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                            <img src={assets.location_icon} className="h-4 opacity-60" alt="" />
                                            {JobData.location}
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                            <img src={assets.person_icon} className="h-4 opacity-60" alt='' />
                                            {JobData.level}
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                            <img src={assets.money_icon} className="h-4 opacity-60" alt='' />
                                            CTC: {kconvert.convertTo(JobData.salary)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-start sm:items-end gap-1'>
                                <button onClick={applyHandler}
                                    className={`px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${isAlreadyApplied ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                                    disabled={isAlreadyApplied}>
                                    {isAlreadyApplied ? '✓ Already Applied' : 'Apply Now'}
                                </button>
                                <p className='text-xs text-gray-400'>Posted {moment(JobData.date).fromNow()}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6'>
                        {/* Description */}
                        <div className='flex-1 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm'>
                            <h2 className='font-bold text-xl mb-5 text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>Job Description</h2>
                            <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
                            <button onClick={applyHandler}
                                className={`mt-8 px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${isAlreadyApplied ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                                disabled={isAlreadyApplied}>
                                {isAlreadyApplied ? '✓ Already Applied' : 'Apply Now'}
                            </button>
                        </div>

                        {/* More jobs sidebar */}
                        <div className='w-full lg:w-72 space-y-4'>
                            <h2 className='font-bold text-base text-gray-800' style={{fontFamily:'Syne,sans-serif'}}>More from {JobData.companyId.name}</h2>
                            {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                                .filter(job => {
                                    const appliedJobIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                                    return !appliedJobIds.has(job._id)
                                }).slice(0, 4)
                                .map((job, index) => <JobCard key={index} job={job} />)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : <Loading />
}

export default ApplyJob;
