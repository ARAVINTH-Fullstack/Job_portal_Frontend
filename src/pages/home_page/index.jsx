import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar';
import { Search, Globe } from 'lucide-react'; 
import Insight from './components/Insight';
import Feature from './components/Feature';
import Trust from './components/Trust';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axiosConfig";
import JobDetailModal from "../jobs_page/components/JobDetailModel";
import Footer from "../../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchJob, setSearchJob] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Fetch latest 4 jobs for trending section
  const fetchTrendingJobs = async () => {
    try {
      const res = await axiosInstance.get("recruiter/jobs/?limit=4&ordering=-created_at");
      setTrendingJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch trending jobs:", err);
    }
  };

  useEffect(() => {
    fetchTrendingJobs();
  }, []);

  // Handle search redirect
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchJob) queryParams.append("title", searchJob);
    if (searchLocation) queryParams.append("location", searchLocation);
    navigate(`/jobs?${queryParams.toString()}`);
  };

  // Apply to a job
  const handleApply = async (jobId) => {
    try {
      const response = await axiosInstance.post(`recruiter/applications/`, { job: jobId });

      if (response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.success("Applied successfully!");
      }

      setDetailOpen(false); // Close modal if open
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Error applying for the job.";

      if (errorMsg.toLowerCase().includes("resume")) {
        toast.warn("Resume upload required before applying!");
      } else if (errorMsg.toLowerCase().includes("already")) {
        toast.info("You have already applied for this job.");
      } else if (errorMsg.toLowerCase().includes("company profile")) {
        toast.warn("Recruiter must fill company profile to post job!");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-gray-50">
        {/* Search Section */}
        <section className="relative bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Your Next <span className="text-indigo-600">Career Move</span>
            </h1>
            <p className="text-gray-500 mb-8">
              Find remote, onsite or hybrid jobs from top companies around the world.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchJob}
                  onChange={(e) => setSearchJob(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Location (city, state, country)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </section>

        {/* Trending Jobs Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">🔥 Trending Jobs</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {trendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer"
                >
                  <div className="flex items-center mb-4" onClick={() => { setSelectedJob(job); setDetailOpen(true); }}>
                    {job.company_logo && (
                      <img
                        src={job.company_logo}
                        alt={`${job.company_name} logo`}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company_name}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p><span className="font-medium">Location:</span> {job.location}</p>
                    <p><span className="font-medium">Type:</span> {job.employment_type}</p>
                    {job.salary_min && job.salary_max && (
                      <p><span className="font-medium">Salary:</span> ₹{job.salary_min} - ₹{job.salary_max}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-400">{new Date(job.created_at).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Insight />
        <Feature />
        <Trust />
        <Footer/>

        {/* Job Detail Modal */}
        <JobDetailModal
          job={selectedJob}
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          onApply={handleApply} // Apply from modal
        />
      </div>
    </>
  );
};

export default HomePage;
