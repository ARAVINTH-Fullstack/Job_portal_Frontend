// CareerGuide.jsx (Light Color Theme)
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { User, Book, Code, Activity, Briefcase } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../../components/Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CareerGuide = () => {
  const [tips, setTips] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsAnalysis, setSkillsAnalysis] = useState({ labels: [], datasets: [] });
  const [jobRoles, setJobRoles] = useState([]);
  const [jobRolesAnalysis, setJobRolesAnalysis] = useState({ labels: [], datasets: [] });
  const [skillGaps, setSkillGaps] = useState([]);

  useEffect(() => {
    const sampleTips = [
      { title: "Optimize your Resume", description: "Highlight achievements concisely.", category: "Resume" },
      { title: "Practice Coding Interviews", description: "Use LeetCode or HackerRank.", category: "Interview" },
      { title: "Learn Trending Skills", description: "Focus on Python, React, AI/ML.", category: "Skill Development" },
      { title: "Build a Portfolio", description: "Showcase your projects on GitHub.", category: "Skill Development" },
      { title: "Network Professionally", description: "Connect with peers on LinkedIn.", category: "Interview" },
    ];
    setTips(sampleTips);

    const trendingSkills = [
      { skill: "Python", demand: 90 },
      { skill: "React", demand: 75 },
      { skill: "Django", demand: 65 },
      { skill: "AI/ML", demand: 80 },
      { skill: "Data Analysis", demand: 70 },
    ];
    setSkills(trendingSkills);
    setSkillsAnalysis({
      labels: trendingSkills.map((s) => s.skill),
      datasets: [
        {
          label: "Demand (%)",
          data: trendingSkills.map((s) => s.demand),
          backgroundColor: [
            "rgba(144, 202, 249, 0.7)",
            "rgba(197, 225, 165, 0.7)",
            "rgba(255, 224, 178, 0.7)",
            "rgba(255, 204, 188, 0.7)",
            "rgba(186, 104, 200, 0.5)",
          ],
          borderRadius: 6,
        },
      ],
    });

    const roles = [
      { role: "Frontend Developer", demand: 80 },
      { role: "Backend Developer", demand: 70 },
      { role: "Data Scientist", demand: 85 },
      { role: "AI/ML Engineer", demand: 75 },
      { role: "Fullstack Developer", demand: 90 },
    ];
    setJobRoles(roles);
    setJobRolesAnalysis({
      labels: roles.map((r) => r.role),
      datasets: [
        {
          label: "Job Demand (%)",
          data: roles.map((r) => r.demand),
          backgroundColor: [
            "rgba(255, 179, 186, 0.7)",
            "rgba(255, 223, 186, 0.7)",
            "rgba(255, 255, 186, 0.7)",
            "rgba(186, 255, 201, 0.7)",
            "rgba(186, 225, 255, 0.7)",
          ],
          borderRadius: 6,
        },
      ],
    });

    const gaps = [
      { skill: "Python", gap: 20 },
      { skill: "React", gap: 35 },
      { skill: "AI/ML", gap: 25 },
      { skill: "Django", gap: 40 },
      { skill: "Data Analysis", gap: 30 },
    ];
    setSkillGaps(gaps);
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Resume":
        return <User size={20} className="inline-block mr-2 text-teal-400" />;
      case "Interview":
        return <Book size={20} className="inline-block mr-2 text-orange-300" />;
      case "Skill Development":
        return <Code size={20} className="inline-block mr-2 text-cyan-300" />;
      default:
        return <Activity size={20} className="inline-block mr-2 text-purple-300" />;
    }
  };

  const cardStyle = {
    padding: "1rem",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };
  const hoverEffect = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
  };
  const leaveEffect = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
  };

  return (
    <>
        <Navbar/>
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", background: "#f5f7fa" }}>
        <h1 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2.5rem", color: "#2563eb" }}>
            Career Guide
        </h1>

        {/* Top Career Tips */}
        <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "#10b981" }}>Top Career Tips</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {tips.map((tip, idx) => (
                <div key={idx} style={cardStyle} onMouseEnter={hoverEffect} onMouseLeave={leaveEffect}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                    {getCategoryIcon(tip.category)}
                    {tip.title}
                </h3>
                <p style={{ color: "#4b5563" }}>{tip.description}</p>
                </div>
            ))}
            </div>
        </section>

        {/* Skill Gap Insights */}
        <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ color: "#f59e0b", marginBottom: "1rem" }}>Skill Gap Insights</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {skillGaps.map((gap, idx) => (
                <div key={idx} style={{ ...cardStyle, flex: "1 1 200px", textAlign: "center", background: "#fef3c7" }} onMouseEnter={hoverEffect} onMouseLeave={leaveEffect}>
                <h4 style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Activity size={20} className="mr-2 text-yellow-500" />
                    {gap.skill}
                </h4>
                <p style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#b45309" }}>{gap.gap}%</p>
                <p>Skill Gap</p>
                </div>
            ))}
            </div>
        </section>

        {/* Skills + Chart */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
            <h2 style={{ marginBottom: "1rem", color: "#3b82f6" }}>Trending Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {skills.map((trend, idx) => (
                <div key={idx} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }} onMouseEnter={hoverEffect} onMouseLeave={leaveEffect}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                    <Code size={18} className="mr-2 text-cyan-300" />
                    {trend.skill}
                    </span>
                    <span style={{ fontWeight: "bold", color: "#2563eb" }}>{trend.demand}%</span>
                </div>
                ))}
            </div>
            </div>

            <div style={{ flex: "2 1 500px", minWidth: "300px" }}>
            <h2 style={{ marginBottom: "1rem", color: "#3b82f6" }}>Skills Demand Analysis</h2>
            {skillsAnalysis.labels.length > 0 && (
                <Bar
                data={skillsAnalysis}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Skills Demand (%)" },
                    },
                }}
                />
            )}
            </div>
        </section>

        {/* Job Roles & Demand */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
            <h2 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Most In-Demand Job Roles</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {jobRoles.map((role, idx) => (
                <li key={idx} style={{ padding: "0.5rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Briefcase size={18} className="text-pink-300" /> {role.role} - {role.demand}%
                </li>
                ))}
            </ul>
            </div>

            <div style={{ flex: "2 1 500px", minWidth: "300px" }}>
            <h2 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Job Roles Demand Analysis</h2>
            {jobRolesAnalysis.labels.length > 0 && (
                <Bar
                data={jobRolesAnalysis}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Job Roles Demand (%)" },
                    },
                }}
                />
            )}
            </div>
        </section>
        </div>
    </>
  );
};

export default CareerGuide;
