import React, { useState, useEffect, useRef } from "react";
import RecruiterSignUp from "./RecruiterSignUp";
import RecruiterLogin from "./RecruiterLogin";
import { WandSparkles, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

function Navbar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef();

  const defaultCandidate = "https://via.placeholder.com/40x40?text=User";
  const defaultCompany = "https://via.placeholder.com/40x40?text=Company";

  useEffect(() => {
    const currentUser = localStorage.getItem("current_user_type");
    if (currentUser) {
      setUserType(currentUser);

      axiosInstance.get("profile-info/")
        .then((res) => {
          if (res.data) {
            setUserImage(res.data.imageUrl || (currentUser === "recruiter" ? defaultCompany : defaultCandidate));
            setUserName(res.data.name || "User");
          } else {
            setUserImage(currentUser === "recruiter" ? defaultCompany : defaultCandidate);
            setUserName("User");
          }
        })
        .catch(() => {
          setUserImage(currentUser === "recruiter" ? defaultCompany : defaultCandidate);
          setUserName("User");
        });
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("current_user_type");
    setUserType(null);
    setProfileDropdown(false);
    navigate("/");
  };

  const links = [
    { label: "Home", href: "/home" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Jobs", href: "/jobs" },
    { label: "Career Guide", href: "/career" },
    { label: "Service", href: "/service" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md px-6 md:px-16 lg:px-24 xl:px-32 py-4 sticky w-full top-0 z-50 transition-all">
      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <div
          className="flex items-center gap-x-2 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          <WandSparkles className="w-6 h-6 text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-600">TalentBridge</h1>
        </div>

        <div className="flex gap-10 font-medium text-gray-700">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {!userType ? (
            <div className="flex gap-3">
              <RecruiterSignUp />
              <RecruiterLogin />
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-12 h-12 rounded-full overflow-hidden shadow-md cursor-pointer border-2 border-amber-400 hover:scale-105 transition-transform"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <img
                  src={userImage || (userType === "recruiter" ? defaultCompany : defaultCandidate)}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col animate-slide-down">
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-800 truncate">
                    {userName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left hover:bg-red-100 transition text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex items-center justify-between w-full">
        <div
          className="flex items-center gap-x-2 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/home")}
        >
          <WandSparkles className="w-6 h-6 text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-600">TalentBridge</h1>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none hover:bg-gray-100 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden mt-2 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 absolute w-full left-0 z-50 transition-transform ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block text-gray-800 font-medium px-2 py-2 rounded-lg hover:bg-amber-50 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}

        {!userType ? (
          <div className="flex flex-col gap-2">
            <RecruiterSignUp />
            <RecruiterLogin />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-800 truncate">
              {userName}
            </div>
            <div className="flex items-center gap-2 px-4">
              <img
                src={userImage || (userType === "recruiter" ? defaultCompany : defaultCandidate)}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover"
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-left hover:bg-red-100 transition text-red-500 font-medium rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
