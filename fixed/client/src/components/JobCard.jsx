import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import kconvert from 'k-convert'

const JobCard = ({ job }) => {
    const navigate = useNavigate()

    const levelColor = {
        'Beginner level': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Intermediate level': 'bg-blue-50 text-blue-700 border-blue-200',
        'Senior level': 'bg-purple-50 text-purple-700 border-purple-200',
    }

    return (
        <div className="job-card p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <img className="h-10 w-10 object-contain rounded-lg border border-gray-100 p-1" src={job.companyId.image} alt='' />
                <span className={`text-xs border px-2.5 py-1 rounded-full font-medium ${levelColor[job.level] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {job.level}
                </span>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-base leading-snug" style={{fontFamily:'Syne,sans-serif'}}>{job.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{job.companyId.name}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <img src={assets.location_icon} className="h-3.5 opacity-60" alt='' />
                    {job.location}
                </span>
                {job.salary > 0 && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                        <img src={assets.money_icon} className="h-3.5 opacity-60" alt='' />
                        {kconvert.convertTo(job.salary)} CTC
                    </span>
                )}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 120) }}></p>
            <div className="flex gap-2 mt-1">
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs py-2 rounded-lg font-medium transition-colors">
                    Apply Now
                </button>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
                    className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-600 text-xs py-2 rounded-lg font-medium transition-colors">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default JobCard
