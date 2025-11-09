import React from 'react'
import Navbar from "../../components/Navbar"
import FilterSidebar from './components/JobCard'
import CandidateJobs from './components/CandidateJobs'

const Jobs = () => {
    
  return (
    <>
        <Navbar/>
        <CandidateJobs/>
    </>
  )
}

export default Jobs