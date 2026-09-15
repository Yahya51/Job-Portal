import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const description = quillRef.current.root.innerHTML
            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, category, level, salary },
                { headers: { token: companyToken } }
            );
            if (data.success) {
                toast.success(data.message || 'Job posted successfully!')
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    const selectClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors bg-white"
    const labelClass = "block text-sm font-semibold text-gray-700 mb-2"

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>Post a New Job</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to attract the right candidates</p>
            </div>

            <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5 max-w-2xl">
                <div>
                    <label className={labelClass}>Job Title</label>
                    <input type="text" placeholder="e.g. Senior React Developer"
                        onChange={(e) => setTitle(e.target.value)} value={title}
                        required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors" />
                </div>

                <div>
                    <label className={labelClass}>Job Description</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div ref={editorRef} className="min-h-[150px]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Category</label>
                        <select className={selectClass} onChange={e => setCategory(e.target.value)}>
                            {JobCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Location</label>
                        <select className={selectClass} onChange={e => setLocation(e.target.value)}>
                            {JobLocations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Level</label>
                        <select className={selectClass} onChange={e => setLevel(e.target.value)}>
                            <option value="Beginner level">Beginner</option>
                            <option value="Intermediate level">Intermediate</option>
                            <option value="Senior level">Senior</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Salary (CTC per year)</label>
                    <input min={0} className="w-40 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
                        onChange={e => setSalary(Number(e.target.value))} type="number" placeholder="500000" />
                </div>

                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                    Post Job
                </button>
            </form>
        </div>
    )
}
export default AddJob
