import { RouteObject} from "react-router-dom";
import NoAuthLayout from "../layouts/NoAuth/NoAuthLayout";
import LoginPage from "../pages/login/loginPage";
import AuthLayout from "../layouts/Auth/AuthLayout";

export const LayoutRoutes: RouteObject[] = [
    {
        path: "/",
        element: <NoAuthLayout/>,
        
        children: [
            {
                path: "login",
                element: <LoginPage/>,

            }
        ]
    },
    {
        path: "/home",
        element: <AuthLayout/>,
    }
]