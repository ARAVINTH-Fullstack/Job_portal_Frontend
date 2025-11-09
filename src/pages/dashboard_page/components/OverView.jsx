import { Goal, Lightbulb, PartyPopper, ScanSearch } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosConfig'


const OverView = () => {
  const [stats, setStats] = useState({
    total_applied: 0,
    applied_goal: 25, // max goal
    interviewed: 0,
    interview_goal: 7, // max goal
    profile_completion: 0,
    profile_views: 0
  })

  useEffect(() => {
    // Fetch candidate dashboard metrics
    axiosInstance.get('candidate/apply_count/')
      .then(res => {
        const data = res.data
        setStats(prev => ({
          ...prev,
          total_applied: data.total_applied,
          interviewed: data.interviewed,
          profile_views: data.profile_views,
          profile_completion: data.profile_completion // assuming success_rate is completion
        }))
      })
      .catch(err => console.error(err))
  }, [])

  // Calculate progress percentages
  const appliedPercent = Math.min((stats.total_applied / stats.applied_goal) * 100, 100)
  const interviewPercent = Math.min((stats.interviewed / stats.interview_goal) * 100, 100)

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 px-4 gap-4 my-8'>
        {/* Monthly Goal Card */}
        <div className='flex flex-col gap-4 border border-cyan-200 p-4 rounded-2xl shadow-md'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Monthly Goal</h1>
            <Goal className='h-6 w-6 text-amber-700'/>
          </div>

          {/* Applications */}
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <h1 className='text-cyan-500'>Applications</h1>
              <p>{stats.total_applied}/{stats.applied_goal}</p>
            </div>
            <div className='w-full h-2 bg-cyan-200 rounded-full overflow-hidden flex items-center'>                        
              <div className='bg-blue-400 h-2' style={{ width: `${appliedPercent}%` }}></div>
            </div>
          </div>

          {/* Interviews */}
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <h1 className='text-cyan-500'>Interviews</h1>
              <p>{stats.interviewed}/{stats.interview_goal}</p>
            </div>
            <div className='w-full h-2 bg-cyan-200 rounded-full overflow-hidden flex items-center'>                        
              <div className='bg-emerald-400 h-2' style={{ width: `${interviewPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className='flex flex-col gap-1 border shadow-md border-cyan-200 p-4 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Quick Stats</h1>
            <ScanSearch className='w-6 h-6 text-fuchsia-600'/>
          </div>

          {/* Profile Completion */}
          <div className='flex flex-col items-center'>
            <h1 className='text-blue-500 text-xl'>{stats.profile_completion}%</h1>
            <p className='text-cyan-500'>Profile Completion</p>
          </div>

          {/* Profile Views */}
          <div className='flex flex-col items-center'>
            <h1 className='text-emerald-500 text-xl'>{stats.profile_views}</h1>
            <p className='text-cyan-500'>Profile Views</p>
          </div>
        </div>

        {/* AI Career Coach */}
        <div className="rounded-2xl shadow-md p-4 transition border border-cyan-200">
          <div className='flex justify-between items-center'>
            <h1 className="font-bold">AI Career Coach</h1>
            <Lightbulb className='w-6 h-6 text-indigo-700'/>
          </div>
          <p className="text-gray-500 mt-2">Tip of the Day:</p>
          <p className="mt-3 text-gray-700 font-medium">
            Add “TypeScript” to your profile to improve your match rate by 25%.
          </p>
        </div>
      </div>
    </>
  )
}

export default OverView
