import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../../axiosConfig";
import { Edit, Trash } from "lucide-react";

const Education = () => {
  const [open, setOpen] = useState(false);
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    school_name: "",
    field_name: "",
    start_year: "",
    end_year: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch educations on mount
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const res = await axiosInstance.get("add/education/");
        setEducations(res.data);
      } catch (err) {
        console.error("Error fetching educations:", err.response?.data || err);
      }
    };
    fetchEducations();
  }, []);

  // Add or update education
  const handleAddOrEdit = async () => {
    if (!formData.school_name || !formData.field_name || !formData.start_year) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      if (editingIndex !== null) {
        // Edit existing
        const edu = educations[editingIndex];
        const res = await axiosInstance.put(`add/education/${edu.id}/`, formData);
        const updated = [...educations];
        updated[editingIndex] = res.data;
        setEducations(updated);
      } else {
        // Add new
        const res = await axiosInstance.post("add/education/", formData);
        setEducations([...educations, res.data]);
      }
    } catch (err) {
      console.error("Error saving education:", err.response?.data || err);
    }

    setFormData({ school_name: "", field_name: "", start_year: "", end_year: "" });
    setEditingIndex(null);
    setOpen(false);
  };

  // Delete education
  const handleDelete = async (index) => {
    const edu = educations[index];
    if (!window.confirm(`Delete education "${edu.school_name}"?`)) return;

    try {
      await axiosInstance.delete(`add/education/${edu.id}/`);
      setEducations(educations.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting education:", err.response?.data || err);
    }
  };

  // Open edit modal
  const handleEdit = (index) => {
    const edu = educations[index];
    setFormData({
      school_name: edu.school_name,
      field_name: edu.field_name,
      start_year: edu.start_year,
      end_year: edu.end_year,
    });
    setEditingIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">🎓 Education</h2>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Education Cards */}
        {educations.length === 0 ? (
          <p className="text-gray-500">No education added yet.</p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu, i) => (
              <div
                key={edu.id}
                className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition relative"
              >
                <h3 className="text-lg font-semibold text-gray-800">{edu.school_name}</h3>
                <p className="text-gray-600">{edu.field_name}</p>
                <p className="text-sm text-gray-500">
                  {edu.start_year} – {edu.end_year || "Present"}
                </p>
                {/* Edit/Delete Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-5 h-5"/>
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dialog Box */}
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => {setOpen(false); setEditingIndex(null);}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <div className="fixed inset-0 flex items-center justify-center p-4">
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
                    {editingIndex !== null ? "Edit Education" : "Add Education"}
                  </Dialog.Title>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Institution
                      </label>
                      <input
                        type="text"
                        name="school_name"
                        value={formData.school_name}
                        onChange={(e) =>
                          setFormData({ ...formData, school_name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. University of XYZ"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Degree / Course
                      </label>
                      <input
                        type="text"
                        name="field_name"
                        value={formData.field_name}
                        onChange={(e) =>
                          setFormData({ ...formData, field_name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. B.Sc Computer Science or 12 standard"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          Start Year
                        </label>
                        <input
                          type="text"
                          name="start_year"
                          value={formData.start_year}
                          onChange={(e) =>
                            setFormData({ ...formData, start_year: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                          placeholder="2020"
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          End Year
                        </label>
                        <input
                          type="text"
                          name="end_year"
                          value={formData.end_year}
                          onChange={(e) =>
                            setFormData({ ...formData, end_year: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                          placeholder="2023 or Present"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                      onClick={() => {setOpen(false); setEditingIndex(null);}}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddOrEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {editingIndex !== null ? "Update" : "Add"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Education;
