import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, FolderKanban, X, Edit, Trash2 } from "lucide-react";
import axiosInstance from "../../../axiosConfig";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      projects: [{ project_name: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = async (data) => {
    const validProjects = data.projects.filter(
      (p) => p.project_name.trim() !== "" && p.description.trim() !== ""
    );

    if (validProjects.length === 0) return;

    try {
      if (editingIndex !== null) {
        // Editing single project
        const project = projects[editingIndex];
        const res = await axiosInstance.put(`add/project/${project.id}/`, validProjects[0]);
        setProjects((prev) =>
          prev.map((p, idx) => (idx === editingIndex ? res.data : p))
        );
      } else {
        // Adding new projects
        const res = await axiosInstance.post("add/project/", validProjects);
        const newProjects = Array.isArray(res.data) ? res.data : [res.data];
        setProjects((prev) => [...prev, ...newProjects]);
      }
    } catch (error) {
      console.error("Error saving projects:", error.response || error.message);
    }

    reset({ projects: [{ project_name: "", description: "" }] });
    setIsOpen(false);
    setEditingIndex(null);
  };

   // Delete project
  const handleDelete = async (index) => {
    const project = projects[index];
    try {
      await axiosInstance.delete(`add/project/${project.id}/`);
      setProjects((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting project:", error.response || error.message);
    }
  };

  // Open edit dialog
  const handleEdit = (index) => {
    const project = projects[index];
    reset({ projects: [{ project_name: project.project_name, description: project.description }] });
    setEditingIndex(index);
    setIsOpen(true);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

   // Load projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("add/project/");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-2xl border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-purple-600" /> Projects
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects added yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-4 bg-white border border-gray-100 shadow rounded-2xl relative flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold text-purple-700">
                  {project.project_name}
                </h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    {editingIndex !== null ? "Edit Project" : "Add Projects"}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border border-gray-200 rounded-lg p-3 relative"
                      >
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}

                        <label className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <input
                          type="text"
                          {...register(`projects.${index}.project_name`, { required: true })}
                          placeholder="Enter project name"
                          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-3">
                          Description
                        </label>
                        <textarea
                          {...register(`projects.${index}.description`, { required: true })}
                          rows="3"
                          placeholder="Describe your project"
                          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                      </div>
                    ))}

                    {!editingIndex && (
                      <button
                        type="button"
                        onClick={() => append({ project_name: "", description: "" })}
                        className="flex items-center gap-2 text-purple-600 font-medium hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Add another project
                      </button>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setEditingIndex(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                      >
                        {editingIndex !== null ? "Update Project" : "Save Projects"}
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