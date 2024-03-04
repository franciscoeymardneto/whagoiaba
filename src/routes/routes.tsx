import { createBrowserRouter } from "react-router-dom";
import { NoAuthRoutes } from "./NoAuthRoutes";
import { AuthRoutes } from "./AuthRoutes";


const loggin = false; 
const routes = createBrowserRouter(!loggin ? NoAuthRoutes : AuthRoutes)

export default routes

 