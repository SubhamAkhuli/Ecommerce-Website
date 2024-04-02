import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../../Layout/Spinner";
export default function UserPrivateRoute() {
  const [ok, setOk] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const authcheck = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/selllerauth/user-auth "
        );
        if (response.status === 200) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        console.log("User is not authenticated");
        setOk(false);
      }
    };
    if (user?.token) authcheck();
  }, [user?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
