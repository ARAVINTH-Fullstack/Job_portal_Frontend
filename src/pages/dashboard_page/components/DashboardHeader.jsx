import { Bell, Calendar, CircleGauge, Eye, NotebookIcon, Rocket, TrendingUp, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ProfileHeader from '../../profile_page/components/ProfileHeader';
import axiosInstance from '../../../axiosConfig';

const DashboardHeader = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosInstance.get("candidate/apply_count/")
        .then(res => setStats(res.data))
        .catch(err => console.error("Failed to load dashboard", err));
    }, []);
  return (
    <>
        <div className='mb-4'> 
            <ProfileHeader/>
        </div>
        <div className='w-full h-auto px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
                <div className='border p-6 border-cyan-200 rounded-2xl shadow-md bg-white'>
                    <div className='text-emerald-600 flex pb-6'>
                        <Rocket className='w-6 h-6'/>
                    </div>
                    <div className='text-cyan-600 '>
                        <h1 className='font-bold text-black text-xl'>{stats?.total_applied ?? 0}</h1>
                        <p className='font-bold'>Application Sent</p>
                        <p>this month</p>
                    </div>
                </div>
                <div className='border p-6 border-cyan-200 rounded-2xl shadow-md bg-white'>
                    <div className='text-emerald-600 flex pb-6'>
                        <Eye className='w-6 h-6'/>
                    </div>
                    <div className='text-cyan-600 '>
                        <h1 className='font-bold text-black text-xl'>{stats?.profile_views ?? 0}</h1>
                        <p className='font-bold'>Profile Views</p>
                        <p>last 30 days</p>
                    </div>
                </div>
                <div className='border p-6 border-cyan-200 rounded-2xl shadow-md bg-white'>
                    <div className='text-emerald-600 flex pb-6'>
                        <Calendar className='w-6 h-6'/>
                    </div>
                    <div className='text-cyan-600 '>
                        <h1 className='font-bold text-black text-xl'>{stats?.interviewed_count ?? 0}</h1>
                        <p className='font-bold'>Interviews Invite</p>
                        <p>this week</p>
                    </div>
                </div>
                <div className='border p-6 border-cyan-200 rounded-2xl shadow-md bg-white'>
                    <div className='text-emerald-600 flex pb-6'>
                        <CircleGauge className='w-6 h-6'/>
                    </div>
                    <div className='text-cyan-600 '>
                        <h1 className='font-bold text-black text-xl'>{stats?.success_rate ?? 0}</h1>
                        <p className='font-bold'>Success Rate</p>
                        <p>average compatibility</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DashboardHeader