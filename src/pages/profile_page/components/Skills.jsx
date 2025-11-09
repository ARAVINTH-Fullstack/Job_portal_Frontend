import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Wrench } from "lucide-react";
import axiosInstance from "../../../axiosConfig";

export default function Skills() {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      skills: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Load skills on mount
  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await axiosInstance.get("add/skill/");
        if (Array.isArray(res.data)) {
          setSkills(res.data.map((s) => ({ id: s.id, name: s.skill_name })));
        }
      } catch (err) {
        console.error("Error loading skills:", err);
      }
    }
    loadSkills();
  }, []);

  // Add skills
  const onSubmit = async (data) => {
    const validSkills = data.skills
      .map((s) => s.name.trim())
      .filter((name) => name !== "");

    if (validSkills.length === 0) {
      alert("Please add at least one valid skill.");
      return;
    }

    try {
      const res = await axiosInstance.post("add/skill/", validSkills);
      setSkills((prev) => [
        ...prev,
        ...validSkills
          .filter(
            (name) => !prev.some((s) => s.name.toLowerCase() === name.toLowerCase())
          )
          .map((name) => ({ name })),
      ]);
      reset({ skills: [{ name: "" }] });
      setIsOpen(false);
    } catch (err) {
      console.error("Error saving skills:", err.response?.data || err.message);
    }
  };

  // Delete skill
  const handleRemoveSkill = async (index) => {
    try {
      const skillToDelete = skills[index];
      if (skillToDelete.id) {
        await axiosInstance.delete(`add/skill/${skillToDelete.id}/`);
      }
      setSkills(skills.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="w-6 h-6 text-green-600" /> Skills
        </h1>
        <button
          onClick={() => {
            reset({ skills: [{ name: "" }] });
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-3">
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet.</p>
        ) : (
          skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full shadow-sm"
            >
              <span>{skill.name}</span>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Skills Dialog */}
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Add Skills
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          {...register(`skills.${index}.name`, { required: true })}
                          placeholder="Enter skill name"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => append({ name: "" })}
                      className="flex items-center gap-2 text-green-600 font-medium hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Add another skill
                    </button>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                      >
                        Save Skills
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
