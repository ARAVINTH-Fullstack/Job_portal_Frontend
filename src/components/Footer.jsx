import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, BookOpen, LifeBuoy } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-100 text-gray-700 px-6 pt-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-200 pb-10 bg-white shadow-sm rounded-xl p-6">
        
        {/* Branding */}
        <div className="md:max-w-xs bg-gray-50 p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">TalentBridge</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Connecting top talent with the best companies. Find your dream job or hire the perfect candidate.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
              <div
                key={idx}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <Icon className="text-gray-700 hover:text-white" size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
          
          {/* Job Seekers */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-5 text-gray-900 text-lg">Job Seekers</h2>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Search Jobs</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Upload Resume</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Career Advice</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Job Alerts</a></li>
            </ul>
          </div>

          {/* Employers */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-5 text-gray-900 text-lg">Employers</h2>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition">Post a Job</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Search Resumes</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Employer Resources</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Pricing</a></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-5 text-gray-900 text-lg">Resources & Support</h2>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li className="flex items-center gap-2 hover:text-blue-500 transition">
                <BookOpen size={16} /> <a href="#">Blog</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition">
                <LifeBuoy size={16} /> <a href="#">Help Center</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition">
                <BookOpen size={16} /> <a href="#">Career Tips</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition">
                <LifeBuoy size={16} /> <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-500">
        &copy; 2024 TalentBridge. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
