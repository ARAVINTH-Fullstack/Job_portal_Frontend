import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";
import JobCard from "./JobCard";
import { Filter } from "lucide-react";
import JobDetailModal from "./JobDetailModel";
import {toast} from 'react-toastify'

export default function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    employment_type: "",
    remote_option: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Fetch jobs from backend
  const fetchJobs = async (appliedFilters = {}) => {
    try {
      let query = new URLSearchParams(appliedFilters).toString();
      const res = await axiosInstance.get(`recruiter/jobs/?${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const applied = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) applied[key] = filters[key];
    });
    fetchJobs(applied);
  };

  const clearFilters = () => {
    setFilters({ location: "", employment_type: "", remote_option: "" });
    fetchJobs();
  };

  const openDetail = (job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleApply = async (jobId) => {
  try {
    const response = await axiosInstance.post(`recruiter/applications/`, { job: jobId });

    // ✅ Success message
    if (response.data.message) {
      toast.success(response.data.message);
    } else {
      toast.success("Applied successfully!");
    }

    setDetailOpen(false);
  } catch (err) {
    console.error(err);

    // 🔍 Extract backend error message
    const errorMsg =
      err.response?.data?.error ||
      err.response?.data?.detail ||
      "Error applying for the job.";

    // 🎯 Specific toast handling
    if (errorMsg.toLowerCase().includes("resume")) {
      toast.warn("Resume upload required before applying!");
    } else if (errorMsg.toLowerCase().includes("already")) {
      toast.info("You have already applied for this job.");
    } else {
      toast.error(errorMsg);
    }
  }
};

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Filter Sidebar */}
      <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear
          </button>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Employment Type */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Employment Type
          </label>
          <select
            name="employment_type"
            value={filters.employment_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Remote Option */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Remote Option</label>
          <select
            name="remote_option"
            value={filters.remote_option}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="true">Remote</option>
            <option value="false">On-site</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </aside>

      {/* Job Listings */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job) || setDetailOpen(true)} // open modal on card click
                onApply={handleApply} // apply directly from card
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onApply={handleApply} // Apply button inside modal still works
      />

    </div>
  );
}
