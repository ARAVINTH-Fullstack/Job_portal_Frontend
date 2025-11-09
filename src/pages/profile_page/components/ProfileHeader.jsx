import React, { useEffect, useState, Fragment } from "react";
import { Bell, Mail, Pen } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../../axiosConfig";
import profileImage from "../../../assets/profile.jpg";

const ProfileHeader = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_picture: null,
    job_role: "",
  });

  async function ProfileData() {
    try {
      const res = await axiosInstance.get("currentuser/");
      setUserData(res.data);
      setFormData({
        user_name: res.data.user_name || "",
        user_picture: null,
        job_role: res.data.job_role || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-48"><h1>Loading user data...</h1></div>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "user_picture") {
      setFormData((prev) => ({ ...prev, user_picture: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_name", formData.user_name);
    data.append("job_role", formData.job_role);
    if (formData.user_picture) data.append("user_picture", formData.user_picture);

    try {
      const res = await axiosInstance.put("update-profile/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData(res.data);
      setIsOpen(false);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <>
      {/* Profile Header */}
      <div className="w-full h-52 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white relative shadow-lg transition-all hover:shadow-2xl">
        <div className="flex gap-6 px-6 md:px-12 items-center w-full h-full">
          <div className="relative group">
            <img
              src={userData.user_picture_url || userData.picture || profileImage}
              alt="Profile"
              className="w-28 h-28 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Edit Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-gray-100 transition-transform hover:scale-110"
            >
              <Pen className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 md:space-y-4">
            <h1 className="text-xl md:text-4xl font-bold drop-shadow-md">{userData.user_name || userData.name}</h1>
            <h2 className="text-sm md:text-2xl font-semibold text-gray-100 drop-shadow-sm">{userData.job_role || "FULL STACK DEVELOPER"}</h2>
            <div className="flex gap-2 items-center text-sm md:text-base text-gray-100">
              <Mail className="h-5 w-5" />
              <p className="break-all">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                    Edit Profile
                  </Dialog.Title>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder=" "
                        required
                      />
                      <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                        Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="job_role"
                        value={formData.job_role}
                        onChange={handleChange}
                        className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder=" "
                      />
                      <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                        Job Role
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        name="user_picture"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileHeader;
