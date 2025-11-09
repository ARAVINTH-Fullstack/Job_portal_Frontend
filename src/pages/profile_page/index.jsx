import React from 'react'
import ProfileHeader from './components/ProfileHeader'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CompanyProfile from '../recruiter_dashboard/components/CompanyProfile'

const index = () => {
    return (
      <>
      <div className='space-y-4'>
          <ProfileHeader/>
          <About/>
          <Education/>
          <Experience/>
          <Skills/>
          <Projects/>
      </div>
      </>
    )
}

export default index