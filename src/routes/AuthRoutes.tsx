import { RouteObject } from "react-router-dom";
import AuthLayout from "../layouts/Auth/AuthLayout";

export const AuthRoutes: RouteObject[] = [
    {
        path: "/",
        element: <AuthLayout/>,
    }
]