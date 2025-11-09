import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const RecruiterLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://talentbridge-w9yv.onrender.com/api/auth/recruiter/login/",
        data
      );

      const { access, refresh, user } = response.data;

      // Save tokens and user info
      localStorage.setItem("recruiter_access_token", access);
      localStorage.setItem("recruiter_refresh_token", refresh);
      localStorage.setItem("current_user_type", "recruiter");
      localStorage.setItem("recruiter_user", JSON.stringify(user));

      console.log("Login success:", user);
      window.location.href = "/dashboard"; // redirect
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
      reset();
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Button to open login dialog */}
      <button
        className="px-2 py-1.5 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Recruiter Login
      </button>

      {/* Headless UI Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">

            {/* Backdrop with smooth fade */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 z-10" />
            </Transition.Child>

            {/* Centering trick */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg relative z-20">
                <Dialog.Title className="text-lg font-bold mb-4">
                  Recruiter Login
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Password</label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 border rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>

          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default RecruiterLogin;
