import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from "@clerk/clerk-react";

function JobPublisherProfile() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {isLoaded,isSignedIn,user} = useUser()
 
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
    
        const response = await axios.get(
          "/api/v1/publishJob/orgProfile",
          {
            withCredentials: true,

          }
        );
        console.log("response", response.data);
        setProfileData(response.data.org || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
      fetchJobs();
    
  }, [isLoaded,isSignedIn]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Company Profile</h1>
            <p className="text-blue-100 mt-1">Your organization details</p>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-6">
            {/* Company Name */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
              <p className="text-lg font-semibold text-gray-900">{profileData?.companyName}</p>
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Company Email</h3>
                <p className="text-base text-gray-900">{profileData?.companyEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Company Phone</h3>
                <p className="text-base text-gray-900">{profileData?.companyPhone}</p>
              </div>
            </div>

            {/* Website */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company Website</h3>
              <a 
                href={profileData?.companyWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {profileData?.companyWebsite}
              </a>
            </div>

            {/* Address */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company Address</h3>
              <p className="text-base text-gray-900">{profileData?.companyAddress}</p>
            </div>

            {/* City, State, Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">City</h3>
                <p className="text-base text-gray-900">{profileData?.companyCity}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">State/Province</h3>
                <p className="text-base text-gray-900">{profileData?.companyState}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Country</h3>
                <p className="text-base text-gray-900">{profileData?.companyCountry}</p>
              </div>
            </div>

            {/* Company Description */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company Description</h3>
              <p className="text-base text-gray-900 leading-relaxed">{profileData?.companyDescription}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => navigate("/updateProfile")}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPublisherProfile