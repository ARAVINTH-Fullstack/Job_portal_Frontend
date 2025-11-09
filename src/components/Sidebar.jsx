import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  MessageSquare,
  LogOut,
  ClipboardList,
  FileText,
} from "lucide-react";

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const navigate = useNavigate();

  const userType = localStorage.getItem("current_user_type");

  const handleLogout = () => {
    if (userType === "recruiter") localStorage.removeItem("recruiter_access_token");
    if (userType === "candidate") localStorage.removeItem("candidate_access_token");
    localStorage.removeItem("current_user_type");
    navigate("/");
  };

  const navItems =
    userType === "recruiter"
      ? [
          { to: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
          { to: "/dashboard/profile", name: "Company Profile", icon: <User size={18} /> },
          { to: "/dashboard/jobs", name: "Create Job", icon: <Briefcase size={18} /> },
          { to: "/dashboard/application", name: "Applications", icon: <ClipboardList size={18} /> },
        ]
      : userType === "candidate"
      ? [
          { to: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
          { to: "/dashboard/profile", name: "Profile", icon: <User size={18} /> },
          { to: "/dashboard/jobs", name: "My Jobs", icon: <Briefcase size={18} /> },
          { to: "/dashboard/application", name: "My Applications", icon: <FileText size={18} /> },
        ]
      : [];

  const renderNavLink = (item) => (
    <NavLink
      key={item.name}
      to={item.to}
      end={item.end} // use exact matching only for main dashboard
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? "bg-blue-100 text-blue-600 border-r-4 border-blue-500 shadow-inner"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {item.icon}
      <span className="truncate">{item.name}</span>
    </NavLink>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-white shadow-lg fixed h-full w-64">
        <div
          className="p-6 border-b cursor-pointer hover:bg-gray-50 transition"
          onClick={() => navigate("/home")}
        >
          <h1 className="text-2xl font-bold text-blue-600">TalentBridge</h1>
        </div>

        <nav className="mt-4 flex-1 flex flex-col gap-1">
          {navItems.map(renderNavLink)}
        </nav>

        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-3 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-white h-full z-30 shadow-lg transition-transform duration-300 md:hidden w-64 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-blue-600 mb-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              TalentBridge
            </h1>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500 shadow-inner"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-3 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
