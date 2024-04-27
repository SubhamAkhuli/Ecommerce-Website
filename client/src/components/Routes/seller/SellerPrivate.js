import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../../Layout/Spinner";
export default function UserPrivateRoute() {
  const [ok, setOk] = useState(false);
  const [user]  = useAuth();
  const type =  user?.user?.type;
  useEffect(() => {
    if (type === "seller"&& user?.token)
    {
    const authcheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sellerauth/seller-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (user?.token) authcheck();
  }
  else{
    setOk(false);
  }

}, [user?.token , type]);
  return ok ? <Outlet /> : <Spinner  path=""/>;
}
