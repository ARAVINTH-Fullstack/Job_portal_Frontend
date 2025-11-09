import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../axiosConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MapPin, DollarSign, Clock, Home, Briefcase } from "lucide-react";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);

export default function JobPostings() {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("recruiter/jobs/");
      const jobsData = Array.isArray(res.data) ? res.data : [];
      setJobs(
        jobsData.map(job => ({
          ...job,
          skills: job.skills_required ? job.skills_required.split(",").map(s => s.trim()) : [],
        }))
      );
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Create or Update Job
  const onSubmit = async (data) => {
    try {
      // Convert skills array to comma-separated string
      if (data.skills && Array.isArray(data.skills)) {
        data.skills_required = data.skills.join(",");
        delete data.skills;
      } else if (data.skills && typeof data.skills === "string") {
        data.skills_required = data.skills;
        delete data.skills;
      }

      if (selectedJob && selectedJob.id) {
        // Update job
        await axiosInstance.put(`recruiter/jobs/${selectedJob.id}/`, data);
        toast.success("Job updated successfully!");
      } else {
        // Create job
        await axiosInstance.post("recruiter/jobs/", data);
        toast.success("Job posted successfully!");
      }

      setOpen(false);
      reset();
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("Failed to save job. Please try again.");
      }
    }
  };

  const openDetailDialog = (job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleEditJob = () => {
    if (!selectedJob) return;
    reset({
      ...selectedJob,
      skills: selectedJob.skills.join(", "),
    });
    setOpen(true);
    setDetailOpen(false);
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axiosInstance.delete(`recruiter/jobs/${selectedJob.id}/`);
        toast.success("Job deleted successfully!");
        setDetailOpen(false);
        fetchJobs();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job.");
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Job Postings</h2>
        <button
          onClick={() => { setOpen(true); setSelectedJob(null); reset(); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Job
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => openDetailDialog(job)}
            className="relative bg-white rounded-lg shadow-lg p-5 cursor-pointer hover:shadow-2xl transition transform hover:scale-[1.02]"
          >
            <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white hidden sm:block ${
              job.is_active ? "bg-green-600" : "bg-gray-500"
            }`}>
              {job.is_active ? "Active" : "Draft"}
            </span>

            <div className="flex items-center gap-4 mb-3">
              {job.company_logo ? (
                <img
                  src={job.company_logo}
                  alt={job.company_name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Logo
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company_name}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3 text-xs font-medium">
              {job.location && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
              )}
              {job.employment_type && (
                <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full uppercase">
                  <Clock className="w-4 h-4" /> {job.employment_type}
                </span>
              )}
              {job.salary_min && job.salary_max && (
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <DollarSign className="w-4 h-4" /> ${Math.round(job.salary_min)} - ${Math.round(job.salary_max)}
                </span>
              )}
              {job.experience_required && (
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase">
                  <Briefcase className="w-4 h-4" /> {job.experience_required}
                </span>
              )}
              {job.remote_option && (
                <span className="flex items-center gap-1 bg-teal-100 text-teal-800 px-2 py-1 rounded-full uppercase">
                  <Home className="w-4 h-4" /> Remote
                </span>
              )}
            </div>

            {job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>{dayjs(job.created_at).fromNow()}</span>
              <span>{job.applications_count || 0} Applications</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Job Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30"></div>
          <div className="bg-white rounded max-w-lg w-full p-6 z-20">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {selectedJob ? "Edit Job" : "Create Job"}
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto max-h-[80vh]">

              {/* Job Title */}
              <div>
                <label className="block mb-1">Job Title</label>
                <input
                  {...register("title", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Senior Software Engineer"
                />
                {errors.title && <span className="text-red-600 text-sm">This field is required</span>}
              </div>

              {/* Location & Employment Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Location</label>
                  <input
                    {...register("location", { required: true })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="San Francisco, CA"
                  />
                  {errors.location && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <div>
                  <label className="block mb-1">Employment Type</label>
                  <select {...register("employment_type")} className="w-full border px-3 py-2 rounded">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Salary Min</label>
                  <input
                    type="number"
                    {...register("salary_min")}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="85000"
                  />
                </div>
                <div>
                  <label className="block mb-1">Salary Max</label>
                  <input
                    type="number"
                    {...register("salary_max")}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="110000"
                  />
                </div>
              </div>

              {/* Experience & Education */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Experience Required</label>
                  <input
                    {...register("experience_required")}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="3+ years"
                  />
                </div>
                <div>
                  <label className="block mb-1">Education Required</label>
                  <input
                    {...register("education_required")}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Bachelor's degree"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block mb-1">Skills (comma separated)</label>
                <input
                  {...register("skills")}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="React, Django, AWS"
                />
              </div>

              {/* Job Type & Remote */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Job Type</label>
                  <input
                    {...register("job_type")}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Permanent / Contract"
                  />
                </div>
                <div className="flex items-center mt-6 gap-2">
                  <input type="checkbox" {...register("remote_option")} id="remote_option" />
                  <label htmlFor="remote_option">Remote Option</label>
                </div>
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block mb-1">Application Deadline</label>
                <input
                  type="date"
                  {...register("application_deadline")}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* About Job */}
              <div>
                <label className="block mb-1">About the Job</label>
                <textarea
                  {...register("about_job", { required: true })}
                  className="w-full border px-3 py-2 rounded whitespace-pre-wrap"
                  placeholder="About the job..."
                />
                {errors.about_job && <span className="text-red-600 text-sm">This field is required</span>}
              </div>

              {/* Key Responsibilities */}
              <div>
                <label className="block mb-1">Key Responsibilities</label>
                <textarea
                  {...register("key_responsibilities", { required: true })}
                  className="w-full border px-3 py-2 rounded whitespace-pre-wrap"
                  placeholder="Responsibilities..."
                />
                {errors.key_responsibilities && <span className="text-red-600 text-sm">This field is required</span>}
              </div>

              {/* Qualifications */}
              <div>
                <label className="block mb-1">Qualifications</label>
                <textarea
                  {...register("qualifications", { required: true })}
                  className="w-full border px-3 py-2 rounded whitespace-pre-wrap"
                  placeholder="Qualifications..."
                />
                {errors.qualifications && <span className="text-red-600 text-sm">This field is required</span>}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded border">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  {selectedJob ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Full Detail Dialog */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-40"></div>
          {selectedJob && (
            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 z-30 shadow-xl">
              {/* Badge */}
              <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full text-white ${
                selectedJob.is_active ? "bg-green-600" : "bg-gray-500"
              }`}>
                {selectedJob.is_active ? "Active" : "Draft"}
              </span>

              {/* Top Section */}
              <div className="flex items-center gap-4 mb-4">
                {selectedJob.company_logo && (
                  <img
                    src={selectedJob.company_logo}
                    alt={selectedJob.company_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <Dialog.Title className="text-2xl font-bold">{selectedJob.title}</Dialog.Title>
                  <p className="text-gray-600">{selectedJob.company_name}</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="mb-4">
                <strong className="block mb-2">JOB INFO</strong>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {selectedJob.location && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase">{selectedJob.location}</span>}
                  {selectedJob.employment_type && <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full uppercase">{selectedJob.employment_type}</span>}
                  {selectedJob.salary_min && selectedJob.salary_max && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase">${Math.round(selectedJob.salary_min)} - ${Math.round(selectedJob.salary_max)}</span>}
                  {selectedJob.experience_required && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full uppercase">{selectedJob.experience_required}</span>}
                  {selectedJob.remote_option && <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full uppercase">Remote</span>}
                </div>
              </div>

              {/* Skills */}
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="mb-4">
                  <strong className="block mb-2">SKILLS</strong>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold rounded-full uppercase">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* About Job */}
              <div className="mb-4">
                <strong className="block mb-2">ABOUT THE JOB</strong>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.about_job}</p>
              </div>

              {/* Key Responsibilities */}
              <div className="mb-4">
                <strong className="block mb-2">KEY RESPONSIBILITIES</strong>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                  {selectedJob.key_responsibilities.split(".").map((s, i) => s.trim() && <li key={i}>{s}.</li>)}
                </ul>
              </div>

              {/* Qualifications */}
              <div className="mb-4">
                <strong className="block mb-2">QUALIFICATIONS</strong>
                <ul className="list-disc list-inside text-gray-600 pl-4">
                  {selectedJob.qualifications.split(".").map((s, i) => s.trim() && <li key={i}>{s}.</li>)}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  View Applications
                </button>
                <button onClick={handleEditJob} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit Job
                </button>
                <button onClick={handleDeleteJob} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete Job
                </button>
                <button onClick={() => setDetailOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
