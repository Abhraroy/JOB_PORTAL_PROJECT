import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditJob() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const jobId = searchParams.get('jobId')
    const [jobData, setJobData] = useState(null)
    const [loading, setLoading] = useState(true)
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
        status: ''
    })

    console.log(jobId)
    useEffect(()=>{
        const fetchJob = async()=>{
            try {
                const response = await axios.get(`/api/v1/publishJob/getJobs/${jobId}`,{
                    withCredentials: true,
                })
                const data = await response.data
                console.log(data)
                setJobData(data.jobs)
                
                // Set form data with fetched job data
                if (data.jobs) {
                    setFormData({
                        title: data.jobs.title || '',
                        description: data.jobs.description || '',
                        lastDate: data.jobs.lastDate ? new Date(data.jobs.lastDate).toISOString().split('T')[0] : '',
                        address: data.jobs.address || '',
                        jobCategory: data.jobs.jobCategory || '',
                        jobType: data.jobs.jobType || '',
                        jobLocation: data.jobs.jobLocation || '',
                        experienceLevel: data.jobs.experienceLevel || '',
                        skillsRequired: data.jobs.skillsRequired || [],
                        salaryRange: {
                            min: data.jobs.salaryRange?.min || '',
                            max: data.jobs.salaryRange?.max || ''
                        },
                        openings: data.jobs.openings || '',
                        status: data.jobs.status || ''
                    })
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching job:', error)
                setLoading(false)
            }
        }
        fetchJob()
    },[])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'salaryMin') {
            setFormData(prev => ({
                ...prev,
                salaryRange: { ...prev.salaryRange, min: value }
            }))
        } else if (name === 'salaryMax') {
            setFormData(prev => ({
                ...prev,
                salaryRange: { ...prev.salaryRange, max: value }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSkillsChange = (e) => {
        const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)
        setFormData(prev => ({
            ...prev,
            skillsRequired: skills
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const submitData = {
                ...formData,
                salaryRange: {
                    min: Number(formData.salaryRange.min),
                    max: Number(formData.salaryRange.max)
                },
                openings: Number(formData.openings)
            }
            console.log('Submitting data:', submitData)
            
            const response = await axios.put(`/api/v1/publishJob/updateJob/${jobId}`, submitData, {
                withCredentials: true,
            })
            
            console.log('Job updated successfully:', response.data)
            // You can add success notification or redirect here
            alert('Job updated successfully!')
            navigate("/postajob")
            
        } catch (error) {
            console.error('Error updating job:', error)
            alert('Error updating job. Please try again.')
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (!jobData) {
        return <div className="flex justify-center items-center h-screen">Job not found</div>
    }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Job</h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Job Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Category *
                        </label>
                        <input
                            type="text"
                            name="jobCategory"
                            value={formData.jobCategory}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type
                        </label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    {/* Job Location Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Location Type
                        </label>
                        <select
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Location Type</option>
                            <option value="Remote">Remote</option>
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Level
                        </label>
                        <input
                            type="text"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            placeholder="e.g., Entry Level, Mid Level, Senior"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Number of Openings */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Openings
                        </label>
                        <input
                            type="number"
                            name="openings"
                            value={formData.openings}
                            onChange={handleInputChange}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status *
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* Last Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Date to Apply *
                        </label>
                        <input
                            type="date"
                            name="lastDate"
                            value={formData.lastDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Salary Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary Range (Min)
                        </label>
                        <input
                            type="number"
                            name="salaryMin"
                            value={formData.salaryRange.min}
                            onChange={handleInputChange}
                            placeholder="Minimum salary"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary Range (Max)
                        </label>
                        <input
                            type="number"
                            name="salaryMax"
                            value={formData.salaryRange.max}
                            onChange={handleInputChange}
                            placeholder="Maximum salary"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Location *
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter job location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Skills Required */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills Required
                    </label>
                    <input
                        type="text"
                        value={formData.skillsRequired.join(', ')}
                        onChange={handleSkillsChange}
                        placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Job Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Enter detailed job description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Update Job
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditJob