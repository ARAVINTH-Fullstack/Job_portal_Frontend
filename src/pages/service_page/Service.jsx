
import React from "react";
import { Briefcase, Users, Book, TrendingUp, Code, FileText, CalendarCheck, Award } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const features = [
  {
    icon: <Briefcase size={30} className="text-blue-400" />,
    title: "Job Listings",
    description: "Browse thousands of verified job listings across multiple industries and locations. Filter by role, location, salary, and more.",
  },
  {
    icon: <Users size={30} className="text-green-400" />,
    title: "Company Insights",
    description: "Get detailed insights about companies including reviews, work culture, and salary ranges. Make informed career choices.",
  },
  {
    icon: <Book size={30} className="text-yellow-400" />,
    title: "Career Guidance",
    description: "Access career tips, resume guidance, interview preparation, and personalized recommendations to grow professionally.",
  },
  {
    icon: <TrendingUp size={30} className="text-pink-400" />,
    title: "Skill Assessments",
    description: "Test your skills with quizzes and coding challenges. Get insights into strengths and improvement areas.",
  },
  {
    icon: <Code size={30} className="text-purple-400" />,
    title: "Learning Resources",
    description: "Access tutorials, courses, and project-based learning to upgrade your technical and soft skills.",
  },
  {
    icon: <FileText size={30} className="text-indigo-400" />,
    title: "Resume Builder",
    description: "Create professional resumes using our easy builder with customizable templates to impress recruiters.",
  },
  {
    icon: <CalendarCheck size={30} className="text-orange-400" />,
    title: "Interview Scheduler",
    description: "Schedule interviews directly through the portal and manage your upcoming interviews in one place.",
  },
  {
    icon: <Award size={30} className="text-teal-400" />,
    title: "Certifications & Badges",
    description: "Earn badges and certifications for completed skill assessments to showcase on your profile.",
  },
];

const Service = () => {
  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const hoverEffect = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.12)";
  };
  const leaveEffect = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
  };

  return (
    <>
        <Navbar/>
        <div style={{ padding: "3rem 2rem", fontFamily: "Arial, sans-serif", background: "#f5f7fa" }}>
        <h1 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2.5rem", color: "#2563eb" }}>
            Our Features
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {features.map((feature, idx) => (
            <div
                key={idx}
                style={cardStyle}
                onMouseEnter={hoverEffect}
                onMouseLeave={leaveEffect}
            >
                <div style={{ marginBottom: "1rem" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#1e3a8a" }}>{feature.title}</h3>
                <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>{feature.description}</p>
            </div>
            ))}
        </div>
        </div>
        <Footer/>
    </>
  );
};

export default Service;
