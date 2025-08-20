import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function UpdateProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyCountry: '',
    companyDescription: ''
  })
  const [errors, setErrors] = useState({})
  const {getToken} = useAuth()
  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/publishJob/orgProfile", {
          withCredentials: true,
        })
        const data = await response.data
        
        if (data.org) {
          setFormData({
            companyName: data.org.companyName || '',
            companyEmail: data.org.companyEmail || '',
            companyPhone: data.org.companyPhone || '',
            companyWebsite: data.org.companyWebsite || '',
            companyAddress: data.org.companyAddress || '',
            companyCity: data.org.companyCity || '',
            companyState: data.org.companyState || '',
            companyCountry: data.org.companyCountry || '',
            companyDescription: data.org.companyDescription || ''
          })
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address'
    }
    
    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = 'Company phone is required'
    }
    
    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = 'Company website is required'
    } else if (!/^https?:\/\/.+/.test(formData.companyWebsite)) {
      newErrors.companyWebsite = 'Please enter a valid website URL (include http:// or https://)'
    }
    
    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = 'Company address is required'
    }
    
    if (!formData.companyCity.trim()) {
      newErrors.companyCity = 'Company city is required'
    }
    
    if (!formData.companyState.trim()) {
      newErrors.companyState = 'Company state is required'
    }
    
    if (!formData.companyCountry.trim()) {
      newErrors.companyCountry = 'Company country is required'
    }
    
    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = 'Company description is required'
    } else if (formData.companyDescription.length < 50) {
      newErrors.companyDescription = 'Company description must be at least 50 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSaving(true)
    try {
      // You'll handle the backend - this is just the frontend structure
      console.log('Profile data to update:', formData)
      const token = await getToken(); // 🔹 Get Clerk JWT
      const response = await axios.put("http://localhost:5000/api/v1/publishJob/updateOrgProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 🔹 Send token
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      console.log("response", response.data);
      alert('Profile updated successfully!')
      navigate("/postajob")
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

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
            <h1 className="text-2xl font-bold text-white">Update Company Profile</h1>
            <p className="text-blue-100 mt-1">Update your company information and details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your company name"
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
            </div>

            {/* Company Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email *
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyEmail ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="contact@company.com"
                />
                {errors.companyEmail && <p className="mt-1 text-sm text-red-600">{errors.companyEmail}</p>}
              </div>

              <div>
                <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Phone *
                </label>
                <input
                  type="tel"
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.companyPhone && <p className="mt-1 text-sm text-red-600">{errors.companyPhone}</p>}
              </div>
            </div>

            {/* Company Website */}
            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-2">
                Company Website *
              </label>
              <input
                type="url"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyWebsite ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://www.company.com"
              />
              {errors.companyWebsite && <p className="mt-1 text-sm text-red-600">{errors.companyWebsite}</p>}
            </div>

            {/* Company Address */}
            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Company Address *
              </label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyAddress ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123 Business Street, Suite 100"
              />
              {errors.companyAddress && <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>}
            </div>

            {/* City, State, Country */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="companyCity" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="companyCity"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyCity ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="San Francisco"
                />
                {errors.companyCity && <p className="mt-1 text-sm text-red-600">{errors.companyCity}</p>}
              </div>

              <div>
                <label htmlFor="companyState" className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province *
                </label>
                <input
                  type="text"
                  id="companyState"
                  name="companyState"
                  value={formData.companyState}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyState ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="California"
                />
                {errors.companyState && <p className="mt-1 text-sm text-red-600">{errors.companyState}</p>}
              </div>

              <div>
                <label htmlFor="companyCountry" className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="companyCountry"
                  name="companyCountry"
                  value={formData.companyCountry}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyCountry ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="United States"
                />
                {errors.companyCountry && <p className="mt-1 text-sm text-red-600">{errors.companyCountry}</p>}
              </div>
            </div>

            {/* Company Description */}
            <div>
              <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Company Description *
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyDescription ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe your company, its mission, values, and what makes it unique..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.companyDescription && <p className="text-sm text-red-600">{errors.companyDescription}</p>}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.companyDescription.length}/1000 characters
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/postajob")}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
