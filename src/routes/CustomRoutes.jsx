import React, { createContext, useEffect, useState } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MenuBar from "../components/MenuBar";
import Dashboard from "../pages/dashboard/Dashboard";
import { UserContext } from "../context/UserContext";
import { getCookie, checkCookies } from "../utils/cookies";
import Users from "../pages/users/Users";
import ResetPassword from "../pages/resetPassword/ResetPassword";



export default function CustomRoutes() {

    const [user, setUser] = useState(checkCookies());
  
    function Header() {
        return (<UserContext.Provider value={{user, setUser, checkCookies}}>
            <MenuBar />
            <Outlet />
            </UserContext.Provider>
        );
    }

    const route = createBrowserRouter([
        { path: "/", element: <Header />, children:[
            { path: "/", element: <Login /> },
            { path: "registrar", element: <Register />},
           { path: "dashboard", element: user ?<Dashboard />:<Navigate to="/" />},
           { path: "usuarios", element: user &&  getCookie("rol")?.includes("admin")?<Users />:<Navigate to="/" />},
           { path: "resetearPassword", element: <ResetPassword/>},
           { path: '*', element: <Navigate to="/" /> },
        ] },
    ])
    return <RouterProvider router={route} />
} 