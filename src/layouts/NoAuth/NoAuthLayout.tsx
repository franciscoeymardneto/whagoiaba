import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const NoAuthLayout = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()
    const isLoggedIn = useSelector((session: any) => session.auth.isLoggedIn)

    

    useEffect(()=>{
        if (isLoggedIn) {
            navigate('/home')
        } else if (location.pathname === "/") {
            navigate('/login')
        }
    }, [isLoggedIn])

  

    return(
        <>
        <Outlet/>
        </>
    )
}

export default NoAuthLayout