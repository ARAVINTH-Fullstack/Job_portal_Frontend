import React, { useEffect, useState } from "react";
import { getJobMarketInsights } from "../../../gemini";

const Insight = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const insights = await getJobMarketInsights();
      setData(insights);
    })();
  }, []);

  if (!data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg animate-pulse">
        Loading live market insights...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-600 px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <span>Live Market Intelligence</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Real-Time Job Market Insights
        </h2>

        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Stay ahead with live data on hiring trends, salary movements, and market demands.
          Make informed career decisions with our AI-powered intelligence platform.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              📊 <span>Live Statistics</span>
            </h3>
            <div className="space-y-5">
              <div>
                <p className="text-3xl font-bold text-gray-900">{data.active_jobs}</p>
                <p className="text-sm text-gray-500">Active Jobs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{data.applications_today}</p>
                <p className="text-sm text-gray-500">Applications Today</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{data.companies_hiring}</p>
                <p className="text-sm text-gray-500">Companies Hiring</p>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${data.average_salary}</p>
                  <p className="text-sm text-gray-500">Avg Salary</p>
                </div>
                <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                  +{data.salary_growth_percent}%
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              🚀 <span>Trending Now</span>
            </h3>
            <p className="text-5xl font-extrabold mb-2 drop-shadow-md">
              {data.trending_change_percent}%
            </p>
            <p className="text-sm font-medium mb-2 opacity-90">Fast Hiring</p>
            <p className="text-sm opacity-90">
              Companies reducing time-to-hire by{" "}
              <strong>{data.trending_change_percent}%</strong> using AI tools.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center gap-2">
              🧠 <span>Skills in Demand</span>
            </h3>
            <div className="space-y-4">
              {data.skills_in_demand.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm bg-gray-50 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <div className="font-medium text-gray-700">{item.skill}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-semibold">
                      {item.growth}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {item.demand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insight;
