import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { FileText, Calendar, Briefcase, Loader2 } from "lucide-react";
import JobDetailModal from "../jobs_page/components/JobDetailModel";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);


  const handleOpenDetails = (app) => {
  // Map JobApplication fields to JobDetailModal expected fields
  const jobData = {
    id: app.job, // or app.job.id if nested
    title: app.job_title,
    company_name: app.company_name,
    company_logo: app.company_logo,
    location: app.job_details.location,
    salary_min: app.job_details.salary_min || 0,
    salary_max: app.job_details.salary_max || 0,
    employment_type: app.job_details.employment_type || "Full-time",
    remote_option: app.job_details.remote_option || false,
    experience_required: app.job_details.experience_required || "",
    skills_required: app.job_details.skills_required || "",
    description: app.job_details.about_job || "No description available",
    key_responsibilities: app.job_details.key_responsibilities || "",
    qualifications: app.job_details.qualifications || "",
    is_active: app.job_details.is_active || true,
  };

  setSelectedJob(jobData);
  setDetailOpen(true);
};


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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          My Job Applications
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
                onClick={() => handleOpenDetails(app)} // 👈 added this
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:shadow-lg cursor-pointer"
              >
                {/* Job & Company */}
                <div className="flex items-center gap-4">
                  {app.company_logo && (
                    <img
                      src={app.company_logo}
                      alt={app.job_title}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
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

                  {/* Resume */}
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-1"
                    >
                      <FileText className="w-4 h-4" /> View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm mt-1">No Resume</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <JobDetailModal
        job={selectedJob}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onApply={() => {}} // candidate already applied, so leave blank or disable in modal
      />

    </div>
  );
}
