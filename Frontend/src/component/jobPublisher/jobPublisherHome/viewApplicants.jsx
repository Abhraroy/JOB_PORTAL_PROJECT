import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ViewApplicants() {
    const [searchParams] = useSearchParams()
    const jobId = searchParams.get('jobId')
    const [applicants, setApplicants] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApplicants = async () => {
            try{
                console.log("Inside the try block")
                const response = await axios.get(`/api/v1/publishJob/viewApplicants/${jobId}`,{
                  withCredentials:true
                })
                console.log("response",response.data)
                setApplicants(response.data.jobs)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchApplicants()
    }, [])

    console.log("applicants",applicants)

    const handleViewResume = (userId) => {
        console.log(`Viewing resume for user ID: ${userId}`)
        // Here you would typically open a modal or navigate to resume view
        alert(`Opening resume for user ID: ${userId}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-blue-400 opacity-20"></div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium text-lg">Loading applicants...</p>
                    <p className="mt-2 text-gray-500 text-sm">Please wait while we fetch the data</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="w-full">
              

                {/* Fancy Applicants Table */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Applicant List</h2>
                            </div>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                {applicants.length} Applicants
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <table className="w-full table-fixed divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {applicants.map((applicant, index) => (
                                    <tr key={applicant._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 transform hover:scale-[1.01]">
                                        <td className="px-8 py-6 whitespace-normal break-words align-top">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {(applicant.profile?.name || '?')[0]}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {applicant.profile?.name || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">Applicant #{index + 1}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-normal break-words align-top">
                                            <div className="flex items-center">
                                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 break-all">{applicant.profile?.email || 'N/A'}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-normal break-words text-sm text-gray-900 align-top">{applicant.profile?.phone || 'N/A'}</td>
                                        <td className="px-8 py-6 whitespace-normal break-words text-sm text-gray-900 align-top">{applicant.profile?.address || 'N/A'}</td>
                                        <td className="px-8 py-6 whitespace-normal text-sm font-medium align-top">
                                            <button
                                                onClick={() => window.open(`${applicant.resume}`, "_blank")}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View Resume
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {applicants.length === 0 && (
                        <div className="text-center py-16">
                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No applicants yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto">When candidates apply to this job, they will appear here. Share your job posting to attract more applicants!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewApplicants