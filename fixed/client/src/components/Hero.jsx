import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext)
    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    const handleKeyDown = (e) => { if (e.key === 'Enter') onSearch() }

    return (
        <div className="hero-bg relative -mt-[68px] pt-32 pb-28 px-4">
            <div className="container 2xl:px-20 mx-auto relative z-10">
                {/* Tag */}
                <div className="anim-1 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span className="text-white/80 text-sm font-medium">10,000+ live opportunities</span>
                </div>

                {/* Headline */}
                <h1 className="anim-2 text-white font-bold leading-tight mb-4" style={{fontFamily:'Syne,sans-serif', fontSize:'clamp(2.5rem,6vw,4.5rem)'}}>
                    Find Work That<br />
                    <span className="text-amber-400">Moves You Forward</span>
                </h1>
                <p className="anim-3 text-white/60 max-w-lg mb-10 text-lg leading-relaxed">
                    Connect with top companies. Land your next big role. Your career story starts here.
                </p>

                {/* Search bar */}
                <div className="anim-4 flex flex-col sm:flex-row gap-3 max-w-2xl">
                    <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg">
                        <img className="h-4 opacity-40" src={assets.search_icon} alt='' />
                        <input type="text" placeholder="Job title, keyword..." className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent" ref={titleRef} onKeyDown={handleKeyDown} />
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg">
                        <img className="h-4 opacity-40" src={assets.location_icon} alt='' />
                        <input type="text" placeholder="City or location..." className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent" ref={locationRef} onKeyDown={handleKeyDown} />
                    </div>
                    <button onClick={onSearch} className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap shadow-lg">
                        Search Jobs
                    </button>
                </div>

                {/* Stats */}
                <div className="anim-4 flex flex-wrap gap-8 mt-12">
                    {[['50K+', 'Job Seekers'], ['10K+', 'Open Roles'], ['5K+', 'Companies']].map(([num, label]) => (
                        <div key={label}>
                            <div className="text-white font-bold text-2xl" style={{fontFamily:'Syne,sans-serif'}}>{num}</div>
                            <div className="text-white/50 text-xs mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero
