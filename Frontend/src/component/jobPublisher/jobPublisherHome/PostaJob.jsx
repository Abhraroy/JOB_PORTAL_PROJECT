import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

function PostaJob() {
  const {isLoaded,isSignedIn,user} = useUser()
  const [showAddJobForm, setShowAddJobForm] = useState(false)
  const navigate = useNavigate()
  const [postedJobs, setPostedJobs] = useState([])

  useEffect(()=>{
    if(!isSignedIn || !isLoaded){
      return
    }
    const fetchJobs = async()=>{
      console.log("isSignedIn",isSignedIn)
      const response = await axios.get("/api/v1/publishJob/getJobs",{
        withCredentials: true,
      })
      const data = await response.data
      console.log(data)
      setPostedJobs(data.jobs)
    }
    fetchJobs()
  },[isSignedIn,isLoaded])


  const getStatusColor = (status) => {
    return status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getJobTypeColor = (jobType) => {
    const colors = {
      'Full-time': 'bg-blue-100 text-blue-800',
      'Part-time': 'bg-yellow-100 text-yellow-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800',
      'Remote': 'bg-gray-100 text-gray-800'
    }
    return colors[jobType] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
              <p className="text-gray-600 mt-2">Manage your posted jobs and create new opportunities</p>
            </div>
            <Link to="/createjob">
                <button
                  onClick={() => setShowAddJobForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Post New Job</span>
                </button>
            </Link >
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{postedJobs ? postedJobs.length : 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{postedJobs ? postedJobs.filter(job => job.status === 'Open').length : 0}</p>
              </div>
            </div>
          </div>

         

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Response</p>
                <p className="text-2xl font-bold text-gray-900">2.3 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {postedJobs && postedJobs.length > 0 ? postedJobs.map((job,index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getJobTypeColor(job.jobType)}`}>
                        {job.jobType}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium">{job.address}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <p className="font-medium">{job.experienceLevel}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Salary:</span>
                        <p className="font-medium">${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Openings:</span>
                        <p className="font-medium">{job.openings} position(s)</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="text-gray-500 text-sm">Skills: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {job.skillsRequired.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="text-sm text-gray-500 mb-2">
                      <p>Posted: {formatDate(job.createdAt)}</p>
                      <p>Deadline: {formatDate(job.lastDate)}</p>
                    </div>
                    
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-blue-600">{job.applicants.length}</div>
                      <div className="text-xs text-gray-500">Applicants</div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition duration-200"
                      onClick={()=>navigate(`/viewApplicants?jobId=${job._id}`)}
                      >
                        View Applicants
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-4 rounded transition duration-200" onClick={()=>navigate(`/editJob?jobId=${job._id}`)} >
                        
                        Edit Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : null}
          </div>
        </div>

        {/* Empty State */}
        {(!postedJobs || postedJobs.length === 0) && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs posted</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by posting your first job opportunity.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/createjob")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Post Your First Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostaJob