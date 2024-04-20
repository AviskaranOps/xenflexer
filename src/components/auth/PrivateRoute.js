// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if user is authenticated

    if(isAuthenticated) {
        return <Outlet/>
    }
    else{
        return <Navigate replace to={`login`} />;
    }
};

export default PrivateRoute;
