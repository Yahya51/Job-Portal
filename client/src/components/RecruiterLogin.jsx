import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)
    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (state === "Sign Up" && !isTextDataSubmited) return setIsTextDataSubmited(true)
        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })
                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else { toast.error(data.message) }
            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)
                const { data } = await axios.post(backendUrl + '/api/company/register', formData)
                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else { toast.error(data.message) }
            }
        } catch (error) { toast.error(error.message) }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center px-4">
            <form onSubmit={onSubmitHandler} className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-3">
                        <img src={assets.company_icon} className="h-6 opacity-70" alt="" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>Recruiter {state}</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {state === 'Login' ? 'Access your hiring dashboard' : 'Create your company account'}
                    </p>
                </div>

                {state === "Sign Up" && isTextDataSubmited ? (
                    <div className="flex flex-col items-center gap-3 my-6">
                        <label htmlFor="image" className="cursor-pointer group">
                            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-teal-500 flex items-center justify-center overflow-hidden transition-colors">
                                {image
                                    ? <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} alt='' />
                                    : <img className="h-8 opacity-30" src={assets.upload_area} alt='' />
                                }
                            </div>
                            <input onChange={e => setImage(e.target.files[0])} type='file' id='image' hidden />
                        </label>
                        <p className="text-sm text-gray-500">Upload company logo</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {state !== 'Login' && (
                            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-500 transition-colors">
                                <img src={assets.person_icon} className="h-4 opacity-40" alt="" />
                                <input className="outline-none text-sm flex-1 text-gray-800 placeholder-gray-400" onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Company Name' required />
                            </div>
                        )}
                        <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-500 transition-colors">
                            <img src={assets.email_icon} className="h-4 opacity-40" alt="" />
                            <input className="outline-none text-sm flex-1 text-gray-800 placeholder-gray-400" onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email address' required />
                        </div>
                        <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-500 transition-colors">
                            <img src={assets.lock_icon} className="h-4 opacity-40" alt="" />
                            <input className="outline-none text-sm flex-1 text-gray-800 placeholder-gray-400" onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
                        </div>
                    </div>
                )}

                {state === "Login" && <p className="text-xs text-teal-600 cursor-pointer mt-2 mb-1">Forgot password?</p>}

                <button type='submit' className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold text-sm mt-5 transition-colors">
                    {state === 'Login' ? 'Login to Dashboard' : isTextDataSubmited ? 'Create Account' : 'Continue'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    {state === 'Login'
                        ? <>Don't have an account? <span className="text-teal-600 cursor-pointer font-medium" onClick={() => setState("Sign Up")}>Sign Up</span></>
                        : <>Already have an account? <span className="text-teal-600 cursor-pointer font-medium" onClick={() => setState("Login")}>Login</span></>
                    }
                </p>

                <button type="button" onClick={() => setShowRecruiterLogin(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <img src={assets.cross_icon} className="h-3.5" alt='' />
                </button>
            </form>
        </div>
    )
}

export default RecruiterLogin
