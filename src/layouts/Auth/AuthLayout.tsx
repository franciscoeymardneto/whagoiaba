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
            <div className="h-screen w-full flex">
                <Sidebar/>
                <div className="w-full">
                    <TopBar/>
                    <div className="block">
                        Content
                        <Outlet />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AuthLayout