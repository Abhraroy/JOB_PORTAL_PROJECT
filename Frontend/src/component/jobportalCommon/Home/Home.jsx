import axios from 'axios';
import React, { useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"

function Home() {
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const navigate = useNavigate()

const jobSeekerSignIn = async(e)=>{
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  const response = await axios.post("/api/v1/findJob/auth/login",{email,password})
  console.log(response)
  const token = response.data.token
  localStorage.setItem("token",token)
  navigate("/jobmarket")
}

useEffect(()=>{
  const userToken = localStorage.getItem("token")
  if(userToken){
    navigate("/jobmarket")
  }
},[])




                












  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Job Portal
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose your path to get started
          </p>
        </div>

        {/* Forms Container */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          
          {/* Job Seeker Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Seeker</h2>
              <p className="text-sm text-gray-500">Find your perfect job</p>
            </div>

            <form className="space-y-4" method='post' onSubmit={jobSeekerSignIn}>
              <div>
                <label htmlFor="seeker-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="seeker-email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  "
                  placeholder="Enter your email"
    
                />
              </div>

              <div>
                <label htmlFor="seeker-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="seeker-password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign In
                </button>
                
                
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup/jobSeeker" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Job Publisher Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Publisher</h2>
              <p className="text-sm text-gray-500">Post jobs and hire candidates</p>
            </div>

            <div className="space-y-4 flex flex-col gap-4">
              <Link to="/signin/jobPublisher">
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Sign In
                </button>
              </Link>
              
              <Link to="/signup/jobPublisher">
                <button
                  type="button"
                  className="w-full bg-white text-green-600 py-3 px-4 rounded-md font-medium border border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Simple Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Find Jobs</h3>
            <p className="text-xs text-gray-500">Browse opportunities</p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Post Jobs</h3>
            <p className="text-xs text-gray-500">Reach candidates</p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Easy Apply</h3>
            <p className="text-xs text-gray-500">Simple process</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home