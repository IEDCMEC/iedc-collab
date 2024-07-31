import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";
import { AuthContext } from "../Firebase/Auth/Auth";

const ProtectedRoute = ({ role }) => {
  const { profile } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile !== null) {
      setLoading(false);
    }
  }, [profile]);

  console.log("ProtectedRoute:", { currentUser, profile, role });

  if (loading) {
    return <div>Loading...</div>; // Show loading while profile is being fetched
  }

  if (!currentUser) {
    console.log("User not logged in, redirecting to landing page");
    return <Navigate to="/" />;
  }

  if (role && profile?.role !== role) {
    console.log(
      `User role (${profile?.role}) does not match required role (${role}), redirecting to profile page`
    );
    return <Navigate to="/profile" />;
  }

  console.log("Access granted, rendering component");
  return <Outlet />;
};

export default ProtectedRoute;
