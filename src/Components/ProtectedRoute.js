import React, { useContext, useEffect, useState } from "react"; 
import { Navigate, Outlet } from "react-router-dom"; 
import { ProjectContext } from "../contexts/ProjectContext"; 
import { AuthContext } from "../Firebase/Auth/Auth"; 

const ProtectedRoute = ({ allowedRoles }) => { 
    const { profile } = useContext(ProjectContext); 
    const { currentUser } = useContext(AuthContext); 
    const [loading, setLoading] = useState(true); 
    
    useEffect(() => { 
        if (profile !== null) { 
            setLoading(false); 
        } 
    }, [profile]); 
    
    if (loading) { 
        return <div>Loading...</div>; 
    } 
    
    if (!currentUser || !allowedRoles.includes(profile.role)) {
        return <Navigate to="/login" />; 
    } 
    
    return <Outlet />; 
};

export default ProtectedRoute;