import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Trophy, Star, Award, Medal, CloudLightning } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axiosInstance from "../../../axiosConfig";

const iconsMap = {
  total_applied: <Trophy size={24} className="text-yellow-500" />,
  profile_views: <Star size={24} className="text-blue-500" />,
  interviewed: <Award size={24} className="text-green-500" />,
  success_rate: <Medal size={24} className="text-purple-500" />,
  profile_completion: <CloudLightning size={24} className="text-indigo-500" />,
};

const milestoneMessages = {
  total_applied: "Keep applying! Each job is a new opportunity.",
  profile_views: "More profile views mean more recruiters noticing you!",
  interviewed: "Ace your interviews to level up!",
  success_rate: "Higher success rate increases your career chances!",
  profile_completion: "Complete your profile to attract top jobs!",
};

const MilestoneCards = () => {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("candidate/badges/"); 
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p className="text-center mt-4">Loading...</p>;

  const milestones = Object.entries(data);
  const [fieldName, current] = milestones[currentIndex];

  const handleNext = () => {
    if (currentIndex < milestones.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Ensure tasks_to_next is not zero to avoid division by zero
  const totalForProgress = current.value + current.tasks_to_next || 1;
  const percentage = Math.round((current.value / totalForProgress) * 100);

  return (
    <div className="relative w-full mx-auto mt-8">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6 h-96 justify-between relative">
        {/* Navigation Arrows */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === milestones.length - 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Field Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 rounded-full">{iconsMap[fieldName]}</div>
          <h2 className="text-2xl font-semibold capitalize">{fieldName.replace("_", " ")}</h2>
        </div>

        {/* Circular Progress + Info */}
        <div className="flex items-center gap-6 flex-1">
          <div className="w-32 h-32">
            <CircularProgressbar
              value={percentage}
              text={`Lvl ${current.level}`}
              strokeWidth={10}
              styles={buildStyles({
                textSize: "18px",
                pathColor: "#4f46e5",
                textColor: "#4f46e5",
                trailColor: "#e5e7eb",
              })}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3">
            <p className="text-gray-600">
              <span className="font-semibold">{current.value}</span> completed
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">{current.tasks_to_next}</span> tasks to next level
            </p>
            <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
              <div
                className="h-3 bg-indigo-500 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <p className="text-gray-700 italic mt-2">{milestoneMessages[fieldName]}</p>
      </div>
    </div>
  );
};

export default MilestoneCards;
