import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setok] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      getAdmin(user.token)
        .then(() => {
          setok(true);
        })
        .catch((err) => {
          toast.error(err.message);
          setok(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
