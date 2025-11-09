import React from 'react'
import DashboardHeader from './components/DashboardHeader'
import Recommented_jobs from './components/Recommented_jobs'
import QuickActions from './components/QuickActions'
import OverView from './components/OverView'


const Dashboard = () => {

    return (
      <>
          <DashboardHeader/>
          <Recommented_jobs/>
          <QuickActions/>
          <OverView/>
      </>
    )
}

export default Dashboard