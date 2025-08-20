import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './component/jobportalCommon/Home/Home'
import JobSeekerSignup from './component/jobportalCommon/Signup/jobSeekerSignup'
import JobPublisherSignup from './component/jobPublisher/Auth/jobPublisherSignup'
import JobPublisherSignin from './component/jobPublisher/Auth/jobPublisherSignin'
import UserProfile from './component/jobSeeker/userProfile/userProfile'
import JobMarket from './component/jobSeeker/jobmarket/jobmarket'
import CandidateLayout from './component/jobportalCommon/mainLayout/CandidateLayout'
import Myjobs from './component/jobSeeker/myJob/Myjobs'
import JobPublisherProfile from './component/jobPublisher/jobPublisherHome/JobPublisherProfile'
import JobPublisherProfileCreate from './component/jobPublisher/jobPublisherHome/JobPublisherProfileCreate'
import OrgLayout from './component/jobportalCommon/mainLayout/OrgLayout'
import PostaJob from './component/jobPublisher/jobPublisherHome/PostaJob'
import CreateJob from './component/jobPublisher/jobPublisherHome/createJob'
import ViewApplicants from './component/jobPublisher/jobPublisherHome/viewApplicants'
import EditJob from './component/jobPublisher/jobPublisherHome/EditJob'
import UpdateProfile from './component/jobPublisher/jobPublisherHome/UpdateProfile'
import JobDetailPage from './component/jobSeeker/jobmarket/jobDetailPage'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup/jobSeeker" element={<JobSeekerSignup/>}/>
      <Route path="/signup/jobPublisher" element={<JobPublisherSignup/>}/>
      <Route path="/signin/jobPublisher" element={<JobPublisherSignin/>}/>
      <Route path="/jobPublisher/profile/create" element={<JobPublisherProfileCreate/>}/> 



      <Route element={<OrgLayout/>}>
        <Route path="/postajob" element={<PostaJob/>}/>
        <Route path="/jobPublisher/profile" element={<JobPublisherProfile/>}/>
        <Route path="/createjob" element={<CreateJob/>}/>
        <Route path="/editJob" element={<EditJob/>}/>
        <Route path="/viewApplicants" element={<ViewApplicants/>}/>
        <Route path="/updateProfile" element={<UpdateProfile/>}/>
      </Route>










      <Route element={<CandidateLayout/>}>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/jobmarket" element={<JobMarket/>}/>
        <Route path="/myjobs" element={<Myjobs/>}/>
        <Route path="/jobDetailPage" element={<JobDetailPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App