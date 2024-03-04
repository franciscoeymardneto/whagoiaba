import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const NoAuthLayout = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        if (location.pathname === "/") {
            navigate('/login')
        }
    }, [])

  

    return(
        <>
        <Outlet/>
        </>
    )
}

export default NoAuthLayout