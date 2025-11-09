import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Search, Upload, TrendingUp } from "lucide-react"

const QuickActions = () => {
  const navigate = useNavigate()

  const candidateActions = [
    {
      id: 1,
      title: "Update Profile",
      description: "Keep your profile current and attractive to recruiters",
      icon: <User size={24} className="text-blue-500" />,
      onClick: () => navigate("/candidate/profile"),
      iconBg: "bg-blue-100"
    },
    {
      id: 2,
      title: "Browse Jobs",
      description: "Discover new opportunities that match your skills",
      icon: <Search size={24} className="text-green-500" />,
      onClick: () => navigate("/jobs"),
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      title: "Upload Resume",
      description: "Upload your latest resume to improve your chances",
      icon: <Upload size={24} className="text-purple-500" />,
      onClick: () => navigate("/candidate/resume"),
      iconBg: "bg-purple-100"
    },
    {
      id: 4,
      title: "Career Insights",
      description: "Get personalized career intelligence and market data",
      icon: <TrendingUp size={24} className="text-pink-500" />,
      onClick: () => navigate("/career-insights"),
      iconBg: "bg-pink-100"
    }
  ]

  return (
    <div className="my-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidateActions.map(action => (
          <div
            key={action.id}
            className="flex flex-col justify-between p-6 rounded-xl shadow-md bg-white cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={action.onClick}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${action.iconBg}`}>
              {action.icon}
            </div>
            <h3 className="text-gray-800 font-bold text-lg mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
