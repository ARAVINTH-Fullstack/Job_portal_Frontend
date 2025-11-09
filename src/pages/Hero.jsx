import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myLogo from "../assets/check_e.png";
import recruit from "../assets/recruit.png";
import {
  Building,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import RecruiterSignUp from "../components/RecruiterSignUp";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroTextRef = useRef(null);
  const heroLogoRef = useRef(null);
  const featuresRef = useRef([]);
  const jobsRef = useRef([]);
  const recruiterRef = useRef(null);

  const features = [
    { icon: <Search className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Find Jobs Fast with Smart Search" },
    { icon: <Building className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Work with Leading Global Employers" },
    { icon: <Smartphone className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Apply Anywhere, Anytime on Mobile" },
    { icon: <ShieldCheck className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Your Data is Safe and Private" },
    { icon: <TrendingUp className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Insights to Boost Your Career Path" },
    { icon: <MessageCircle className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-700" />, description: "Get Instant Help When You Need" },
  ];

  const jobs = [
    "Frontend Developer","Backend Developer","Full Stack Engineer","DevOps Engineer",
    "Cloud Architect","Machine Learning Engineer","Data Scientist","UI/UX Designer",
    "QA Automation Engineer","Cybersecurity Analyst","Mobile App Developer","Product Manager"
  ];

  useEffect(() => {
    // Hero Text Animation
    gsap.from(heroTextRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: "top 80%",
      },
    });

    // Hero Logo Animation
    gsap.from(heroLogoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroLogoRef.current,
        start: "top 80%",
      },
    });

    // Features Stagger Animation
    featuresRef.current.forEach((feature, idx) => {
      gsap.from(feature, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: idx * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: feature,
          start: "top 90%",
        },
      });
    });

    // Jobs Stagger Animation
    jobsRef.current.forEach((job, idx) => {
      gsap.from(job, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: idx * 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: job,
          start: "top 90%",
        },
      });
    });

    // Recruiter Section Animation
    gsap.from(recruiterRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: recruiterRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
          {/* Left Content */}
          <div ref={heroTextRef} className="text-center md:text-left md:flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold max-w-xl text-indigo-800 leading-tight">
              Build Skills That Get You Hired
            </h1>
            <p className="mt-6 text-base md:text-lg max-w-lg text-indigo-600">
              Personalized learning journeys to become a high-performing tech professional — get hired by top product companies worldwide.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6">
              <GoogleLoginButton /> 
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative">
            <img ref={heroLogoRef} src={myLogo} alt="Hero Logo" className="w-full h-auto rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-12">
          Why Our Job Portal is the Best
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={el => featuresRef.current[idx] = el}
              className="flex items-center gap-4 bg-indigo-50 p-6 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-2 hover:bg-indigo-100 cursor-pointer"
            >
              <div className="bg-indigo-200 p-4 rounded-lg flex items-center justify-center">{feature.icon}</div>
              <p className="text-indigo-800 font-semibold">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4 sm:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-12 text-center">Explore Exciting Career Opportunities</h2>
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-5xl w-full">
          {jobs.map((job, idx) => (
            <li
              key={idx}
              ref={el => jobsRef.current[idx] = el}
              className="bg-white p-4 rounded-xl shadow-lg text-center text-indigo-700 font-medium transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {job}
            </li>
          ))}
        </ul>
      </section>

      {/* Recruiters Section */}
      <section className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4">Hire Top Tech Talent</h2>
            <p className="text-indigo-600 text-lg mb-6">
              Connect with top-tier candidates from across the tech industry and hire skilled developers, designers, and data experts.
            </p>
            <ul className="space-y-3 text-indigo-700">
              <li className="flex items-start gap-2">✓ Post unlimited jobs for free</li>
              <li className="flex items-start gap-2">✓ Access to a growing talent pool</li>
              <li className="flex items-start gap-2">✓ Simple and fast onboarding</li>
            </ul>
            <div className="mt-8">
              <RecruiterSignUp />
            </div>
          </div>
          <div ref={recruiterRef}>
            <img src={recruit} alt="Recruiters working" className="w-full h-auto rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
