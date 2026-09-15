import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])
    }
    const handleLocationChange = (location) => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location])
    }

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
        const newFilteredJobs = jobs.slice().reverse().filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job))
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className="container 2xl:px-20 mx-auto px-4 flex flex-col lg:flex-row gap-8 py-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                    {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <div className="mb-5">
                            <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Active Filters</h3>
                            <div className="flex flex-wrap gap-2">
                                {searchFilter.title && (
                                    <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {searchFilter.title}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} className="cursor-pointer h-3" src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {searchFilter.location}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} className="cursor-pointer h-3" src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <button onClick={() => setShowFilter(prev => !prev)} className="lg:hidden w-full text-sm border border-gray-300 rounded-lg py-2 mb-4 text-gray-600">
                        {showFilter ? "Hide Filters" : "Show Filters"}
                    </button>

                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className="font-semibold text-gray-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Category</h4>
                        <ul className="space-y-2.5">
                            {JobCategories.map((category, index) => (
                                <li className="flex gap-2.5 items-center text-sm text-gray-600" key={index}>
                                    <input type="checkbox" className="rounded" onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-gray-100 my-4"></div>

                        <h4 className="font-semibold text-gray-800 text-sm mb-3" style={{fontFamily:'Syne,sans-serif'}}>Location</h4>
                        <ul className="space-y-2.5">
                            {JobLocations.map((location, index) => (
                                <li className="flex gap-2.5 items-center text-sm text-gray-600" key={index}>
                                    <input type="checkbox" className="rounded" onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)} />
                                    {location}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Job grid */}
            <section className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-bold text-2xl text-gray-900" style={{fontFamily:'Syne,sans-serif'}} id="job-list">Latest Jobs</h3>
                        <p className="text-gray-500 text-sm mt-1">{filteredJobs.length} opportunities found</p>
                    </div>
                </div>

                {filteredJobs.length === 0
                    ? <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-gray-500 text-lg">No jobs match your filters.</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or clearing filters.</p>
                    </div>
                    : <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                                <JobCard key={index} job={job} />
                            ))}
                        </div>

                        {filteredJobs.length > 6 && (
                            <div className="flex items-center justify-center gap-2 mt-10">
                                <a href="#job-list">
                                    <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
                                        <img src={assets.left_arrow_icon} alt="" className="h-3" />
                                    </button>
                                </a>
                                {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                    <a key={index} href="#job-list">
                                        <button onClick={() => setCurrentPage(index + 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-colors
                                            ${currentPage === index + 1 ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                                            {index + 1}
                                        </button>
                                    </a>
                                ))}
                                <a href="#job-list">
                                    <button onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
                                        <img src={assets.right_arrow_icon} alt="" className="h-3" />
                                    </button>
                                </a>
                            </div>
                        )}
                    </>
                }
            </section>
        </div>
    )
}

export default JobListing
