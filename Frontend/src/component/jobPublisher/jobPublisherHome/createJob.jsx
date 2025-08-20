import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateJob() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lastDate: '',
    address: '',
    jobCategory: '',
    jobType: '',
    jobLocation: '',
    experienceLevel: '',
    skillsRequired: [],
    salaryRange: {
      min: '',
      max: ''
    },
    openings: '',
    status: 'Open'
  })

  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState({})

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract']
  const jobCategories = ['IT','HR','Marketing','Sales','Finance','Engineering','Design','Education','Healthcare','Hospitality','Manufacturing','Retail','Transportation','Other']
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level']
  const jobLocations = ['Remote', 'On-site', 'Hybrid']

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

  const handleSalaryChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      salaryRange: {
        ...prev.salaryRange,
        [name]: value
      }
    }))
  }

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skillsRequired.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    // Basic validation
    // const newErrors = {}
    // if (!formData.title.trim()) newErrors.title = 'Job title is required'
    // if (!formData.description.trim()) newErrors.description = 'Job description is required'
    // if (!formData.lastDate) newErrors.lastDate = 'Application deadline is required'
    // if (!formData.address.trim()) newErrors.address = 'Job location is required'
    // if (!formData.jobCategory) newErrors.jobCategory = 'Job category is required'
    // if (!formData.jobType) newErrors.jobType = 'Job type is required'
    // if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required'
    // if (formData.skillsRequired.length === 0) newErrors.skillsRequired = 'At least one skill is required'
    // if (!formData.salaryRange.min || !formData.salaryRange.max) {
    //   newErrors.salaryRange = 'Salary range is required'
    // } else if (parseInt(formData.salaryRange.min) > parseInt(formData.salaryRange.max)) {
    //   newErrors.salaryRange = 'Minimum salary cannot be greater than maximum salary'
    // }
    // if (!formData.openings || formData.openings < 1) newErrors.openings = 'Number of openings must be at least 1'

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }

    // Submit form data
    console.log('Job data to submit:', formData)
    const response = await axios.post("/api/v1/publishJob/postJob",formData,{
      withCredentials: true,
    })
    const data = await response.data
    console.log(data)
    navigate("/postajob")
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSkillAdd()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Create New Job Posting</h1>
            <p className="text-blue-100 mt-1">Fill in the details below to post a new job opportunity</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., Senior Frontend Developer"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the role, responsibilities, and requirements..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Job Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category *
                </label>
                <select
                  id="jobCategory"
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.jobCategory ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {jobCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.jobCategory && <p className="mt-1 text-sm text-red-600">{errors.jobCategory}</p>}
              </div>

              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.jobType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select job type</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.jobType && <p className="mt-1 text-sm text-red-600">{errors.jobType}</p>}
              </div>
            </div>

            {/* Experience Level and Openings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.experienceLevel ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
              </div>

              <div>
                <label htmlFor="openings" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Openings *
                </label>
                <input
                  type="number"
                  id="openings"
                  name="openings"
                  value={formData.openings}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.openings ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2"
                />
                {errors.openings && <p className="mt-1 text-sm text-red-600">{errors.openings}</p>}
              </div>
            </div>

            {/* Location Type and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Location Type *
                </label>
                <select
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.jobLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select location type</option>
                  {jobLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {errors.jobLocation && <p className="mt-1 text-sm text-red-600">{errors.jobLocation}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Location Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., San Francisco, CA or Remote"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                id="lastDate"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.lastDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.lastDate && <p className="mt-1 text-sm text-red-600">{errors.lastDate}</p>}
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range (USD) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    name="min"
                    value={formData.salaryRange.min}
                    onChange={handleSalaryChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.salaryRange ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Minimum salary"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="max"
                    value={formData.salaryRange.max}
                    onChange={handleSalaryChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.salaryRange ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Maximum salary"
                  />
                </div>
              </div>
              {errors.salaryRange && <p className="mt-1 text-sm text-red-600">{errors.salaryRange}</p>}
            </div>

            {/* Skills Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Required *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., React, JavaScript"
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
              
              {formData.skillsRequired.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.skillsRequired && <p className="mt-1 text-sm text-red-600">{errors.skillsRequired}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Job Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJob
