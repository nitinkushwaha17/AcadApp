import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function PrivateRoute(){
    const user = useContext(UserContext);
    console.log(user);

    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}