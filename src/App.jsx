import { useState } from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import Hero from "./pages/Hero"
import About from "./pages/About"
import HomePage from './pages/home_page'
import Jobs from './pages/jobs_page'
import Dashboard from './pages/dashboard_page'
import Layout from './pages/Layout'
import ProfileBuilder from './pages/profile_page'
import UserJobs from './pages/user_job_page'
import RecruiterApplications from './pages/applicationview_page'
import ResumePage from './pages/resume_page'
import JobPostings from './pages/recruiter_dashboard/components/JobPost'
import CandidateApplications from './pages/user_job_page'
import RecruiterDashboard from './pages/recruiter_dashboard'
import CompanyProfilePage from './pages/recruiter_dashboard/components/CompanyProfile'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import CareerGuide from './pages/ai_career_guide/CareerGuide'
import Service from './pages/service_page/Service'


function App() {
  const user_type = localStorage.getItem("current_user_type")
  return (
    <>
      <Routes>
        
        <Route element={<PrivateRoute/>}>
          <Route path='/hero' element={<Hero />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/jobs' element={<Jobs/>} />
          
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={user_type === "candidate" ? <Dashboard /> : <RecruiterDashboard/> } />
            <Route path="profile" element={user_type === 'candidate' ? <ProfileBuilder /> : <CompanyProfilePage/> } />
            <Route path="jobs" element={user_type === "candidate" ? <CandidateApplications/> : <JobPostings/>} />
            <Route path="application" element={ user_type === "candidate" ? <ResumePage /> : <RecruiterApplications /> } />
          </Route>
          <Route path='/career' element={<CareerGuide/>} />
        </Route>

        <Route path='/service' element={<Service/>} />
        <Route path='/' element={<Home />}/>

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </>
  )
}

export default App
