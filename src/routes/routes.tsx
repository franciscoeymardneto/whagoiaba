import { createBrowserRouter } from "react-router-dom";
import { NoAuthRoutes } from "./NoAuthRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { store } from "../store/store";
import { useSelector } from "react-redux";




const routes = createBrowserRouter(() => {
    const isLoggedIn = useSelector((session: any) => session.auth.isLoggedIn)
    return !isLoggedIn ? NoAuthRoutes : AuthRoutes
    
})

export default routes

 