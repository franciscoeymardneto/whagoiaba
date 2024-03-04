import { RouteObject } from "react-router-dom";
import NoAuthLayout from "../layouts/NoAuth/NoAuthLayout";

export const NoAuthRoutes: RouteObject[] = [
    {
        path: "/",
        element: <NoAuthLayout/>,
    }
]