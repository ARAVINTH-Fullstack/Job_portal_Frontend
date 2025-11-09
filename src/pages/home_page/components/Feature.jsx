import React from "react";
import { Brain, TrendingUp, User, Users } from "lucide-react";

const Feature = () => {
  const features = [
    {
      id: "ai-matching",
      title: "AI-Powered Matching",
      subtitle: "Precision Career Connections",
      icon: <Brain size={28} className="text-blue-700" />,
      color: "from-blue-100 via-blue-50 to-white",
    },
    {
      id: "career-intelligence",
      title: "Career Intelligence Center",
      subtitle: "Data-Driven Career Decisions",
      icon: <TrendingUp size={28} className="text-indigo-700" />,
      color: "from-indigo-100 via-indigo-50 to-white",
    },
    {
      id: "profile-builder",
      title: "Dynamic Profile Builder",
      subtitle: "Showcase Your Professional Story",
      icon: <User size={28} className="text-emerald-700" />,
      color: "from-emerald-100 via-emerald-50 to-white",
    },
    {
      id: "collaboration",
      title: "Collaborative Hiring",
      subtitle: "Streamlined Team Decisions",
      icon: <Users size={28} className="text-amber-700" />,
      color: "from-amber-100 via-amber-50 to-white",
    },
  ];

  return (
    <>
      <div className="mt-24 px-6 sm:px-10 md:px-14 mb-20 relative">
        {/* Decorative Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>
        </div>

        <div className="relative text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Complete Platform Overview
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for career success in one intelligent platform.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Feature Cards */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-8 bg-gradient-to-br ${feature.color} 
              border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 
              hover:-translate-y-2 backdrop-blur-sm`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/40 to-white/10 blur-xl"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feature;
