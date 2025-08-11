import { useNavigate } from "react-router-dom";

const useNavigateRole = () => {
  const navigate = useNavigate();
 
  const navigateRole = (role) => {
    console.log("role from navigateRole",role)
    switch (role) {
      case "user":
        navigate("/user/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/"); // Default route (home page or error page)
    }
  };

  return navigateRole;
};

export default useNavigateRole;
