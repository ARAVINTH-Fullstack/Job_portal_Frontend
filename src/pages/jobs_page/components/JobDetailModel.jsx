import React from "react";
import { Dialog } from "@headlessui/react";
import { MapPin, DollarSign, Briefcase, Wifi, Star } from "lucide-react";

export default function JobDetailModal({ job, isOpen, onClose, onApply }) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40"></div>

        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 z-50 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              {job.company_logo && (
                <img
                  src={job.company_logo}
                  alt={job.company_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.company_name}</p>
              </div>
            </div>
            {job.is_active && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold hidden sm:block">
                ACTIVE
              </span>
            )}
          </div>

          {/* Info Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-100 px-2 py-1 rounded uppercase flex items-center gap-1">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="bg-yellow-100 px-2 py-1 rounded uppercase flex items-center gap-1">
              <DollarSign size={14} /> ₹{parseInt(job.salary_min)} - ₹{parseInt(job.salary_max)}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded uppercase flex items-center gap-1">
              <Briefcase size={14} /> {job.employment_type}
            </span>
            {job.remote_option && (
              <span className="bg-purple-100 px-2 py-1 rounded uppercase flex items-center gap-1">
                <Wifi size={14} /> Remote
              </span>
            )}
            {job.experience_required && (
              <span className="bg-pink-100 px-2 py-1 rounded uppercase flex items-center gap-1">
                <Star size={14} /> {job.experience_required}
              </span>
            )}
          </div>

          {/* Skills */}
          {job.skills_required && (
            <div className="mb-4">
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills_required.split(",").map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full font-semibold uppercase"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {job.description && (
            <div className="mb-4">
              <strong>Description:</strong>
              <div className="mt-2 whitespace-pre-line text-gray-700">{job.description}</div>
            </div>
          )}

          {/* Key Responsibilities */}
          {job.key_responsibilities && (
            <div className="mb-4">
              <strong>Key Responsibilities:</strong>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {job.key_responsibilities.split(".").map((point, idx) =>
                  point.trim() ? <li key={idx}>{point.trim()}</li> : null
                )}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications && (
            <div className="mb-4">
              <strong>Qualifications:</strong>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {job.qualifications.split(".").map((point, idx) =>
                  point.trim() ? <li key={idx}>{point.trim()}</li> : null
                )}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => onApply(job.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
