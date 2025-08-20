import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useJobSeekerStore from '../../../utility/jobSeeker/zustandStoreJobSeeker'

function UserProfile() {
    const { formData, setFormData, editProfile, setEditProfile, inputFieldDisabled, setInputFieldDisabled } = useJobSeekerStore()
    const navigate = useNavigate()

    useEffect(() => {
        setFormData({
            name:"",
            email:"",
            phone:"",
            address:"",
            city:"",
            state:"",
            country:"",
            Age:"",
            education:"",
            experience:"",
            skills:"",
            social_links:""
        })
        async function getProfile() {
            const token = localStorage.getItem("token")
            console.log(token)
            if (!token) {
                navigate("/")
            }
            const response = await axios.get("http://localhost:5000/api/v1/findJob/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setFormData(response.data.profile)
            console.log("form",formData)
        }
        getProfile()
    }, [])

    const handleSubmit = async(e) => {
        console.log("clicked")
        e.preventDefault()
        console.log(formData)
        const token = localStorage.getItem("token")
        const response = await axios.post("/api/v1/findJob/user/profile",
            {
                name:formData.name,
                email:formData.email,
                phone:formData.phone,
                address:formData.address,
                city:formData.city,
                state:formData.state,
                country:formData.country,
                Age:formData.Age,
                education:formData.education,
                experience:formData.experience,
                skills:formData.skills,
                social_links:formData.social_links
            }
            ,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response)
        // Reset edit state after successful save
        setEditProfile(false)
        setInputFieldDisabled(true)
    }

    return (
        <div className="min-h-screen w-[100%] bg-blue-50 py-4 sm:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        User Profile
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Complete your profile to enhance your job applications
                    </p>
                </div>

                {/* Profile Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Personal Information</h2>
                        <p className="text-sm text-gray-500">Fill in your details to complete your profile</p>
                    </div>

                    <form className="space-y-4 sm:space-y-6" method='post' onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    disabled={inputFieldDisabled}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e)=>setFormData({...formData,name:e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    disabled={inputFieldDisabled}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    disabled={inputFieldDisabled}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="Age"
                                    disabled={inputFieldDisabled}
                                    min="18"
                                    max="100"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your age"
                                    value={formData.Age}
                                    onChange={(e)=>setFormData({...formData,Age:e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="border-t border-gray-200 pt-4 sm:pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        disabled={inputFieldDisabled}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full address"
                                        value={formData.address}
                                        onChange={(e)=>setFormData({...formData,address:e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        disabled={inputFieldDisabled}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your city"
                                        value={formData.city}
                                        onChange={(e)=>setFormData({...formData,city:e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                        State/Province *
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        disabled={inputFieldDisabled}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your state or province"
                                        value={formData.state}
                                        onChange={(e)=>setFormData({...formData,state:e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        disabled={inputFieldDisabled}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your country"
                                        value={formData.country}
                                        onChange={(e)=>setFormData({...formData,country:e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Information Section */}
                        <div className="border-t border-gray-200 pt-4 sm:pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                                        Education
                                    </label>
                                    <textarea
                                        id="education"
                                        name="education"
                                        disabled={inputFieldDisabled}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your educational background"
                                        value={formData.education}
                                        onChange={(e)=>setFormData({...formData,education:e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience
                                    </label>
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        disabled={inputFieldDisabled}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your work experience"
                                        value={formData.experience}
                                        onChange={(e)=>setFormData({...formData,experience:e.target.value})}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                                        Skills
                                    </label>
                                    <textarea
                                        id="skills"
                                        name="skills"
                                        disabled={inputFieldDisabled}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your skills (e.g., JavaScript, React, Python, etc.)"
                                        value={formData.skills}
                                        onChange={(e)=>setFormData({...formData,skills:e.target.value})}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="social_links" className="block text-sm font-medium text-gray-700 mb-2">
                                        Social Links
                                    </label>
                                    <textarea
                                        id="social_links"
                                        name="social_links"
                                        disabled={inputFieldDisabled}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your social media links (LinkedIn, GitHub, etc.)"
                                        value={formData.social_links}
                                        onChange={(e)=>setFormData({...formData,social_links:e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t border-gray-200 pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            {editProfile && (
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Save Profile
                                </button>
                            )}
                            {editProfile && (
                                <button
                                    type="button"
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    onClick={(e) => { setEditProfile(false); setInputFieldDisabled(true);e.preventDefault() }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Edit Profile Button - At Bottom */}
                    {!editProfile && (
                        <div className="mt-6">
                            <button
                                type="button"
                                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                onClick={() => { setEditProfile(true); setInputFieldDisabled(false) }}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Tips */}
                <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Profile Tips</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Complete all required fields marked with *
                        </li>
                        <li className="flex items-start">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Add detailed skills to improve job matching
                        </li>
                        <li className="flex items-start">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Include social links to showcase your work
                        </li>
                        <li className="flex items-start">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Keep your information up to date
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
