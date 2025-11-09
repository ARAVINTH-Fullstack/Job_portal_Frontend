import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, Building2, Mail, Users, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../axiosConfig";
import { motion } from "framer-motion";

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [logoFile, setLogoFile] = useState(null);


  // Fetch company profile
  useEffect(() => {
    axiosInstance
      .get("recruiter/company/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get("recruiter/job_count/");
        setData(response.data);
      } catch (err) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const onSubmit = async (formInput) => {
  const formData = new FormData();
  Object.entries(formInput).forEach(([key, value]) => {
    if (key !== "logo" && value) {
      formData.append(key, value);
    }
  });

  // Append logo if selected
  if (logoFile) {
    formData.append("logo", logoFile);
  }

  try {
    let res;
    if (isCreate || !profile?.id) {
      res = await axiosInstance.post("recruiter/company/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      res = await axiosInstance.put(`recruiter/company/${profile.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    setProfile(res.data);
    setOpen(false);
    reset();
    setLogoFile(null); // clear file state after submit
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

  const handleEditProfile = () => {
    setIsCreate(!profile);
    setOpen(true);
    reset({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      location: profile?.location || "",
      founded_year: profile?.founded_year || "",
      number_of_employees: profile?.number_of_employees || "",
      about: profile?.about || "",
    });
  };

  if (loading) return <div className="text-center py-8">Loading Profile...</div>;

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Cover */}
        <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-blue-600">
          <div className="absolute bottom-6 left-4 sm:left-8 flex items-end gap-4 sm:gap-6">
            {profile?.logo ? (
              <img
                src={profile.logo}
                alt="Company Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl font-bold text-gray-500">
                <Building2 size={48} />
              </div>
            )}
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl font-bold">{profile?.name || "No Company Name"}</h1>
              <p className="text-sm sm:text-lg text-indigo-100">{profile?.location || "No Location Provided"}</p>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white text-indigo-600 hover:bg-indigo-50 px-4 sm:px-5 py-2 rounded-full font-semibold shadow-md flex items-center gap-2 transition-all"
          >
            <Pencil size={16} /> {profile ? "Edit Profile" : "Add Profile"}
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column */}
          <motion.div
            className="col-span-1 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-4 flex items-center gap-2">
                <Mail size={18} /> Contact Info
              </h2>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Email:</strong> {profile?.email || "N/A"}</p>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Phone:</strong> {profile?.phone || "N/A"}</p>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Address:</strong> {profile?.location || "N/A"}</p>
            </div>

            <div className="bg-white shadow-lg p-4 sm:p-6 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-4 flex items-center gap-2">
                <Calendar size={18} /> Company Details
              </h2>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Founded:</strong> {profile?.founded_year || "N/A"}</p>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Employees:</strong> {profile?.number_of_employees || "N/A"}</p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="col-span-1 md:col-span-2 bg-white shadow-lg p-4 sm:p-8 rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-4 flex items-center gap-2">
              <Users size={18} /> About Company
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {profile?.about || "Your company description will appear here. Highlight your mission, culture, and why candidates should join your team."}
            </p>

            <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white shadow-md rounded-xl p-4 sm:p-5 text-center">
                <h3 className="text-gray-500 text-sm sm:text-base">Active Job Posts</h3>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{data?.jobs_posted || 0}</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-4 sm:p-5 text-center">
                <h3 className="text-gray-500 text-sm sm:text-base">Candidates Applied</h3>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{data?.total_applicants || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl mx-auto">
            <Dialog.Title className="text-2xl font-bold text-gray-800 mb-6">
              {isCreate ? "Add Company Profile" : "Edit Company Profile"}
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setLogoFile(e.target.files[0]); // store selected file in state
                    } else {
                      setLogoFile(null);
                    }
                  }}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />

              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. OpenAI Pvt. Ltd."
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="company@example.com"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="+91 9876543210"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  {...register("location")}
                  placeholder="City, State, Country"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Founded Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Founded Year</label>
                <input
                  type="number"
                  {...register("founded_year")}
                  placeholder="e.g. 2015"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Number of Employees */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Employees</label>
                <select
                  {...register("number_of_employees")}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-500">201–500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">About Company</label>
                <textarea
                  {...register("about")}
                  placeholder="Write a short description about your company, mission, and culture..."
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {isCreate ? "Add Profile" : "Save Changes"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
