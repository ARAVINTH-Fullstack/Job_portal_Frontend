import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import {
  FileText,
  User,
  Briefcase,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function RecruiterApplications() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // ✅ Fetch all recruiter jobs
  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("recruiter/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch applications for selected job
  const fetchApplications = async (jobId) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`recruiter/applications/?job=${jobId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    setSelectedJob(jobId);
    if (jobId) fetchApplications(jobId);
    else setApplications([]);
  };

  // ✅ Update candidate status instantly
  const handleStatusChange = async (appId, newStatus) => {
    try {
      setUpdatingStatus(appId);
      await axiosInstance.patch(`recruiter/applications/${appId}/`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Candidate Applications
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <select
              className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-auto"
              value={selectedJob || ""}
              onChange={handleJobSelect}
            >
              <option value="">-- Select Job --</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="flex justify-center items-center py-10 text-gray-600">
            <Loader2 className="animate-spin w-6 h-6 text-blue-600 mr-2" />
            Loading applications...
          </div>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-blue-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-700">
                    <User className="inline w-4 h-4 mr-1 text-gray-500" />
                    Candidate
                  </th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-700">
                    <Briefcase className="inline w-4 h-4 mr-1 text-gray-500" />
                    Job Role
                  </th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-700">
                    <FileText className="inline w-4 h-4 mr-1 text-gray-500" />
                    Resume
                  </th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 whitespace-nowrap">
                      {app.candidate_name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">
                      {app.job_title || "—"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <FileText className="w-4 h-4" /> View
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <select
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border focus:outline-none focus:ring-2 transition ${
                            app.status === "applied"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : app.status === "shortlisted"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : app.status === "hired"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : app.status === "rejected"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                          disabled={updatingStatus === app.id}
                        >
                          <option value="applied">Applied</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="offered">Offered</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        {updatingStatus === app.id && (
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
            No applications found for this job.
          </div>
        )}
      </div>
    </div>
  );
}
