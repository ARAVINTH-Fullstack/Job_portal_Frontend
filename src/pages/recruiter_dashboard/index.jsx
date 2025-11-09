import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  CalendarCheck,
  UserCheck,
  PlusCircle,
  BarChart3,
  Target,
  TrendingUp,
  Building2,
  MapPin,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../../axiosConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const RecruiterDashboard = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [recentJobs, setRecentJobs] = useState([]);
  const [insights, setInsights] = useState({
    avg_applications_per_job: 0,
    response_rate: 0,
    job_views: 0,
  });

  const goals = {
    job_posted: 10,
    interviewed: 20,
    offered: 5,
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get("recruiter/job_count/");
        setData(response.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getProgress = (current, goal) =>
    Math.min((current / goal) * 100, 100).toFixed(1);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const response = await axiosInstance.get("recruiter/jobs/");
        const sortedJobs = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRecentJobs(sortedJobs.slice(0, 4));
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
      }
    };
    fetchRecentJobs();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("recruiter/insights/");
        setInsights(res.data);
      } catch (err) {
        console.error("Failed to load recruiter insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  const chartData = [
    { name: "Avg. Apps / Job", value: insights.avg_applications_per_job },
    { name: "Response Rate", value: insights.response_rate },
    { name: "Job Reach", value: insights.job_views },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Recruiter 👋</h1>
          <p className="text-gray-500 text-sm">
            Here’s an overview of your company’s hiring performance
          </p>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            icon: <Briefcase className="w-6 h-6 text-blue-600" />,
            title: "Active Jobs",
            value: data?.jobs_posted || 0,
          },
          {
            icon: <Users className="w-6 h-6 text-green-600" />,
            title: "Total Applicants",
            value: data?.total_applicants || 0,
          },
          {
            icon: <CalendarCheck className="w-6 h-6 text-yellow-600" />,
            title: "Interviews Scheduled",
            value: data?.interviewed || 0,
          },
          {
            icon: <UserCheck className="w-6 h-6 text-purple-600" />,
            title: "Hires Completed",
            value: data?.offered || 0,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition"
          >
            <div className="p-3 bg-gray-100 rounded-xl">{item.icon}</div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Applications Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" /> Quick Insights
            </h2>

            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>
                📈 Avg. Applications per Job: <strong>{insights.avg_applications_per_job}</strong>
              </li>
              <li>
                💬 Response Rate: <strong>{insights.response_rate}%</strong>
              </li>
              <li>
                👁️ Job Reach: <strong>{insights.job_views}</strong>
              </li>
            </ul>

            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Bar dataKey="value" fill="#4f46e5" barSize={40} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" /> Recently Posted Jobs
            </h2>

            {recentJobs.length > 0 ? (
              <ul className="divide-y divide-gray-100 text-sm text-gray-600">
                {recentJobs.map((job) => (
                  <li key={job.id} className="py-3">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <strong>{job.title}</strong>
                        </span>
                        <span className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                          <Building2 className="w-3 h-3" />
                          {job.company_name || "Unknown Company"}
                          <MapPin className="w-3 h-3 ml-3" />
                          {job.location || "N/A"}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No recent jobs found.</p>
            )}
          </motion.div>
        </div>

        {/* Right Sidebar (1/3 width) */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Quick Insights
            </h2>

            <ul className="text-sm text-gray-600 space-y-4">
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Avg. Applications per Job
                </div>
                <span className="font-semibold text-gray-800">{insights.avg_applications_per_job}</span>
              </li>

              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Response Rate
                </div>
                <span className="font-semibold text-gray-800">{insights.response_rate}%</span>
              </li>

              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Job Views
                </div>
                <span className="font-semibold text-gray-800">{insights.job_views}</span>
              </li>
            </ul>
          </motion.div>

          {/* Monthly Goals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> Monthly Goals
            </h2>

            <div className="space-y-4">
              {/* Job Posted */}
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Post 10 Jobs</p>
                  <p className="text-sm text-gray-500">
                    {data?.jobs_posted || 0}/{goals.job_posted}
                  </p>
                </div>
                <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${getProgress(data?.jobs_posted || 0, goals.job_posted)}%` }}
                  ></div>
                </div>
              </div>

              {/* Interviewed */}
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Interview 20 Candidates</p>
                  <p className="text-sm text-gray-500">
                    {data?.interviewed || 0}/{goals.interviewed}
                  </p>
                </div>
                <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${getProgress(data?.interviewed || 0, goals.interviewed)}%` }}
                  ></div>
                </div>
              </div>

              {/* Offered */}
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Hire 5 People</p>
                  <p className="text-sm text-gray-500">
                    {data?.offered || 0}/{goals.offered}
                  </p>
                </div>
                <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${getProgress(data?.offered || 0, goals.offered)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
