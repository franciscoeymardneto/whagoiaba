import { RouteObject, redirect } from "react-router-dom";
import NoAuthLayout from "../layouts/NoAuth/NoAuthLayout";
import LoginPage from "../pages/login/loginPage";

export const NoAuthRoutes: RouteObject[] = [
    {
        path: "/",
        element: <NoAuthLayout/>,
        
        children: [
            {
                path: "login",
                element: <LoginPage/>,

            }
        ]
    }
]