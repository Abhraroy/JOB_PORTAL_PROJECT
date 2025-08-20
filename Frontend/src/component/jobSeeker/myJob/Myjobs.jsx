import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Myjobs() {
  // Single job application data - replace with actual data from API
  // const appliedJob = {
  //   id: 1,
  //   jobTitle: "Frontend Developer",
  //   company: "Tech Solutions Inc.",
  //   appliedDate: "2024-01-15",
  //   status: "pending",
  //   location: "San Francisco, CA",
  //   jobType: "Full-time",
  //   salary: "$80,000 - $120,000",
  //   applicationStatus: "Under Review"
  // }
  const [appliedJob, setAppliedJob] = useState([])
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/")
    }
    const fetchMyJobs = async()=>{
      const res = await axios.get("/api/v1/findJob/myJobs",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setAppliedJob(res.data.myJobs)
      console.log("res",res)
    }
    fetchMyJobs()
  },[])



  return (
    <div className="min-h-screen bg-gray-50 w-[100%]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">My Applied Jobs</h2>
          <p className="text-sm text-gray-600">Jobs you have applied for</p>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6">
        {/* Applied Job Card */}
        {appliedJob.map((job,index)=>(
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{job.company.companyName}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mb-3 space-y-1 sm:space-y-0">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{job.address}</span>
                  </div>
                  <div className="hidden sm:block mx-2">•</div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{job.jobType}</span>
                  </div>
                  <div className="hidden sm:block mx-2">•</div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>{job.salaryRange.min} - {job.salaryRange.max}</span>
                  </div>
                </div>
                
              </div>
              
              <div className="sm:ml-6 mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                {job.status === "pending" && (
                  <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                    Withdraw
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State - when no jobs are applied */}
        {/* <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Browse Jobs
          </button>
        </div> */}
      </main>
    </div>
  )
}

export default Myjobs