import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const currentUserType = localStorage.getItem("current_user_type");
  const token =
    currentUserType === "candidate"
      ? localStorage.getItem("candidate_access_token")
      : localStorage.getItem("recruiter_access_token");

  if (!currentUserType || !token) {
    toast.error("Login required!"); // Show toast
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
