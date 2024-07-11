import React, { createContext, useEffect, useState } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MenuBar from "../components/MenuBar";
import Dashboard from "../pages/dashboard/Dashboard";
import { UserContext } from "../context/UserContext";



export default function CustomRoutes() {

    const [user, setUser] = useState(null);
   

    function Header() {
        return (<UserContext.Provider value={{user, setUser}}>
            <MenuBar />
            <Outlet />
            </UserContext.Provider>
        );
    }

    const route = createBrowserRouter([
        { path: "/", element: <Header />, children:[
            { path: "/", element: <Login /> },
            { path: "registrar", element: <Register />},
           { path: "dashboard", element: user?.name !== undefined ?<Dashboard />:<Navigate to="/" />},
           { path: '*', element: <Navigate to="/" /> },
        ] },
    ])
    return <RouterProvider router={route} />
} 