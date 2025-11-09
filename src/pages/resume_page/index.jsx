// ResumeUpload.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const CircularProgress = ({ value, label, color }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="font-bold text-xl"
        >
          {value}%
        </text>
      </svg>
      <p className="mt-3 text-lg font-semibold text-gray-700">{label}</p>
    </div>
  );
};

const highlightKeywords = (text) => {
  const keywords = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Django",
    "API",
    "Tailwind",
    "CSS",
  ];
  let highlighted = text;
  keywords.forEach((kw) => {
    const regex = new RegExp(`(${kw})`, "gi");
    highlighted = highlighted.replace(regex, "<b>$1</b>");
  });
  return highlighted;
};

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false); // 🟢 Added state

  const fetchResumes = async () => {
    try {
      const res = await axiosInstance.get("resume/");
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a resume file!");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // ⏳ Disable button + show spinner

    try {
      await axiosInstance.post("resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 200000, // Allow AI time to process
      });

      alert("Resume uploaded! Processing...");
      setFile(null);
      await fetchResumes();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false); // ✅ Re-enable button
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Upload Your Resume</h2>

      {/* Upload Card */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8 flex flex-col md:flex-row items-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded px-3 py-2 w-full md:w-auto"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded text-white font-medium flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            "Upload & Analyze"
          )}
        </button>
      </div>

      {/* Resume Results */}
      {resumes.map((r) => (
        <div key={r.id} className="space-y-8 mb-10">
          {r.processed ? (
            <>
              {/* ATS & Hire Chance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CircularProgress
                  value={r.ats_score}
                  label="ATS Score"
                  color="#3b82f6"
                />
                <CircularProgress
                  value={r.hire_chance}
                  label="Hire Chance"
                  color="#f59e0b"
                />
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-md">
                  <h3 className="text-blue-700 font-bold text-lg mb-3 uppercase">
                    Strengths
                  </h3>
                  <div className="flex flex-col gap-3">
                    {r.strengths.split("\n").map((s, i) => (
                      <div
                        key={i}
                        className="bg-blue-100 p-3 rounded text-blue-800 shadow-sm"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(s) }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-md">
                  <h3 className="text-red-700 font-bold text-lg mb-3 uppercase">
                    Weaknesses
                  </h3>
                  <div className="flex flex-col gap-3">
                    {r.weaknesses.split("\n").map((w, i) => (
                      <div
                        key={i}
                        className="bg-red-100 p-3 rounded text-red-800 shadow-sm"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(w) }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips */}
              {r.tips_to_improve && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-md mt-6">
                  <h3 className="text-green-700 font-bold text-lg mb-3 uppercase">
                    Tips to Improve
                  </h3>
                  <div className="flex flex-col gap-3">
                    {r.tips_to_improve.split("\n").map((tip, i) => (
                      <div
                        key={i}
                        className="bg-green-100 p-3 rounded text-green-800 shadow-sm"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(tip) }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-blue-600 font-semibold animate-pulse">
              Processing your resume with AI...
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
