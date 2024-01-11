import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Header/header";
import Login from "./login";
import RegisterPage from "./register";


const AuthRoute = ()=> {
    const loc = useLocation();

    const [isInLogin, setIsInLogin] = useState(false)
    if (loc.pathname === '/login') {
        setIsInLogin(true)
    }

    return (
        <div>
            <Header />
            {
                isInLogin ? <Login /> : <RegisterPage />
            }
        </div>
    )
}
export default AuthRoute