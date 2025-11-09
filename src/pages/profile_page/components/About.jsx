import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User, Copy, Check } from "lucide-react";
import axiosInstance from "../../../axiosConfig";

export default function AboutFeature() {
  const [isOpen, setIsOpen] = useState(false);
  const [about, setAbout] = useState("");
  const [formValue, setFormValue] = useState("");
  const [expanded, setExpanded] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setAbout(formValue);
    setIsOpen(false);

    try {
      const res = axiosInstance.patch("about/",{
        "description": toString.about
      })

    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axiosInstance.get("about/"); // await the promise
        setAbout(res.data.description); // now res.data is the object from backend
      } catch (error) {
        console.error("Error fetching About:", error);
      }
    };

    fetchAbout();
  }, []);


  const MAX_LENGTH = 150;
  const isLong = about.length > MAX_LENGTH;

  const displayText = expanded || !isLong ? about : about.slice(0, MAX_LENGTH) + "...";

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-2xl shadow-sm border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-600" /> About
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      <div className="p-4">
        {about ? (
          <>
            <p className="text-gray-700 whitespace-pre-wrap">{displayText}</p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-indigo-600 mt-2 text-sm hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-400">No about information added yet.</p>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Edit About Information
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      value={formValue}
                      onChange={(e) => setFormValue(e.target.value)}
                      rows="5"
                      placeholder="Write something about yourself..."
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
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
    </div>
  );
}
