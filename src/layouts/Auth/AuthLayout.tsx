import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import TopBar from "./components/Topbar/Topbar"

const AuthLayout = () => {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((session: any) => session.auth.isLoggedIn)


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn])

    return (
        <>
            <div className=" w-full h-full flex overflow-x-hidden">
                <Sidebar/>
                <div className="w-full">
                    <TopBar/>
                    <div className="py-10 h-full">
                        <Outlet />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AuthLayout