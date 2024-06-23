import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Protected(props) {
    const nav = useNavigate();
  
    const errtoast = (message) => {
      toast.error(message);
    };
  
    try {
      const token = localStorage.getItem("SecritData");
  
      if (token) {
        const decodedToken = jwtDecode(token);
        
        if (!decodedToken.id && !decodedToken.name && !decodedToken.role) {
          return <Navigate to={'/login'} />;
        } else {
          return props.children;
        }
      } else {
        return <Navigate to={'/login'} />;
      }
    } catch (error) {
      errtoast("You Must Login",{theme:"red"});
  
      return (
        <div className={` `}>
          <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <div className="bg-danger w-50 text-center text-light">
              You Must firstly Login To explore Our Website
            </div>
          </div>
        </div>
      );
    }
  }