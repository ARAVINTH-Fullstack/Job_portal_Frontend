import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Plus, Briefcase, X, Edit2, Trash, Edit } from "lucide-react";
import axiosInstance from "../../../axiosConfig";

export default function Experience() {
  const [isOpen, setIsOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    position_name: "",
    start_year: "",
    end_year: "",
    description: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save or Update experience
  const handleSave = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Editing existing experience
      const exp = experiences[editingIndex];
      try {
        const res = await axiosInstance.put(`add/experience/${exp.id}/`, formData);
        const updated = [...experiences];
        updated[editingIndex] = res.data;
        setExperiences(updated);
      } catch (err) {
        console.log(err);
      }
    } else {
      // Adding new experience
      try {
        const res = await axiosInstance.post("add/experience/", formData);
        setExperiences([res.data, ...experiences]);
      } catch (err) {
        console.log(err);
      }
    }

    setFormData({
      company_name: "",
      position_name: "",
      start_year: "",
      end_year: "",
      description: "",
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  // Delete experience
  const handleDelete = async (index) => {
    const exp = experiences[index];
    try {
      await axiosInstance.delete(`add/experience/${exp.id}/`);
      setExperiences(experiences.filter((_, i) => i !== index));
    } catch (err) {
      console.log(err);
    }
  };

  // Open modal for edit
  const handleEdit = (index) => {
    const exp = experiences[index];
    setFormData({
      company_name: exp.company_name,
      position_name: exp.position_name,
      start_year: exp.start_year,
      end_year: exp.end_year,
      description: exp.description,
    });
    setEditingIndex(index);
    setIsOpen(true);
  };

  // Fetch experiences on mount
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axiosInstance.get("add/experience/");
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExperience();
  }, []);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Briefcase className="w-6 h-6 text-blue-600" /> Experience
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No experiences added yet.</p>
        ) : (
          experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 shadow-lg rounded-2xl border border-gray-300 hover:shadow-xl transition bg-white relative"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">{exp.position_name}</h2>
                <span className="text-sm text-gray-500">
                  {exp.start_year} - {exp.end_year || "Present"}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{exp.company_name}</p>
              <p className="mt-2 text-gray-600">{exp.description}</p>

              {/* Edit / Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialog Box */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />{" "}
                    {editingIndex !== null ? "Edit Experience" : "Add Experience"}
                  </Dialog.Title>

                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <input
                        type="text"
                        name="position_name"
                        value={formData.position_name}
                        onChange={handleChange}
                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="text"
                          name="start_year"
                          value={formData.start_year}
                          onChange={handleChange}
                          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="text"
                          name="end_year"
                          value={formData.end_year}
                          onChange={handleChange}
                          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        {editingIndex !== null ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
