import { ArrowLeft, ArrowRight, Award, Briefcase, Calendar, ChevronLeft, ChevronRight, Clock, CloudLightning, DollarSign, Loader2, LocateFixed, Medal, Send, SquareArrowOutUpRight, Star, Trophy, User2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, Legend, Bar, LineChart, Line, CartesianGrid } from "recharts";
import axiosInstance from '../../../axiosConfig';
import CandidateMilestones from './CandidateMilestone';

const Recommented_jobs = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch candidate applications
    const fetchApplications = async () => {
        try {
        setLoading(true);
        const res = await axiosInstance.get("recruiter/applications/"); // Candidate applications endpoint
        setApplications(res.data);
        } catch (err) {
        console.error(err);
        alert("Failed to load applications.");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

  return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-4'>
            
            <CandidateMilestones/>

            <div className="bg-white p-6 rounded-2xl shadow-md mt-8 ">
                <div className="h-auto bg-gray-50 p-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Recent Activity
                        </h2>

                        {loading ? (
                        <div className="flex justify-center items-center py-20 text-gray-600">
                            <Loader2 className="animate-spin w-6 h-6 mr-2 text-blue-600" />
                            Loading applications...
                        </div>
                        ) : applications.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            You have not applied for any jobs yet.
                        </div>
                        ) : (
                        <div className="grid gap-6">
                            {applications.map((app) => (
                            <div
                                key={app.id}
                                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:shadow-lg"
                            >
                                {/* Job & Company */}
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                        {app.job_title}
                                        </h3>
                                        <p className="text-gray-500">{app.company_name}</p>
                                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        {app.employment_type || "Full-time"} • {app.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Application Info */}
                                <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                                {/* Status */}
                                <span
                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    app.status === "applied"
                                        ? "bg-blue-100 text-blue-700"
                                        : app.status === "shortlisted"
                                        ? "bg-green-100 text-green-700"
                                        : app.status === "interviewed"
                                        ? "bg-purple-100 text-purple-700"
                                        : app.status === "offered"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : app.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>

                                {/* Applied Date */}
                                <p className="text-gray-400 text-sm flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Applied on {new Date(app.applied_at).toLocaleDateString()}
                                </p>

                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-6 rounded-2xl text-white mt-8 shadow-md">
            <h2 className="text-lg font-semibold mb-2">AI Career Insight</h2>
            <p className="text-sm opacity-90">
                Based on your skills, <span className="font-semibold">Machine Learning Engineer</span> roles are
                in high demand this month. Increase your salary potential by improving your <b>TensorFlow</b> and
                <b> Cloud Deployment</b> skills.
            </p>
            <button className="mt-3 bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                View Recommended Courses
            </button>
        </div>
    </>
  )
}

export default Recommented_jobs