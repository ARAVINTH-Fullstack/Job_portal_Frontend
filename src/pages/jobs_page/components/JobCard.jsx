import React from "react";
import { MapPin, DollarSign, Briefcase, Wifi, Star } from "lucide-react";

export default function JobCard({ job, onClick, onApply }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition cursor-pointer relative" onClick={onClick}>
      {/* Job Info */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {job.company_logo && (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.company_name}</p>
          </div>
        </div>

        {job.is_active && (
          <span className="hidden md:block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
            ACTIVE
          </span>
        )}
      </div>

      {/* Info Pills */}
      <div className="flex flex-wrap gap-2 mt-3 text-sm">
        <span className="bg-blue-100 px-2 py-1 rounded flex items-center gap-1">
          <MapPin size={14} /> {job.location}
        </span>
        <span className="bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
          <DollarSign size={14} /> ₹{parseInt(job.salary_min)} - ₹{parseInt(job.salary_max)}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
          <Briefcase size={14} /> {job.employment_type}
        </span>
        {job.remote_option && (
          <span className="bg-purple-100 px-2 py-1 rounded flex items-center gap-1">
            <Wifi size={14} /> Remote
          </span>
        )}
        {job.experience_required && (
          <span className="bg-pink-100 px-2 py-1 rounded flex items-center gap-1">
            <Star size={14} /> {job.experience_required}
          </span>
        )}
      </div>

      {/* Skills */}
      {job.skills_required && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills_required.split(",").map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full font-semibold uppercase"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening detail modal
          onApply(job.id);
        }}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </div>
  );
}
