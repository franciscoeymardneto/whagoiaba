import { useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import kanbanIcon from '/icons/sidebar/kanban.svg'

const Sidebar = () => {
    const sidebarOpen = useSelector((session: any) => session.sidebar.isOpen)
    const navigate = useNavigate()

    const pathname = useLocation().pathname

    console.log(location)

    const menus = [
        {
            label: 'Kanban',
            icon: kanbanIcon,
            route: '/home/kanban'
        }
    ]


    return (
        <>
            <aside className={`${sidebarOpen ? 'w-14' : 'w-0'}  hover:w-40 duration-300 bg-green-800 relative h-screen`}>
                <div className="flex items-center justify-center h-16 w-full p-2 mb-3">
                    <img src="/logos/logo.png" alt="" className="filter brightness-0 invert grayscale w-9" />
                </div>

                <div className="overflow-hidden">

                    <ul>
                        {
                            menus.map((menu, i) => (
                                <li key={i} className={`
                                    ${pathname === menu.route ? 'border-l-4 border-gray-100' : 'cursor-pointer hover:opacity-55'}
                                     
                                    flex h-10 items-center text-white
                                `}
                                onClick={() => navigate(menu.route)}
                                >
                                    <img src={menu.icon} alt="" className="filter brightness-0 invert grayscale w-9 ml-2 mr-2" />
                                    <span>{menu.label}</span>
                                </li>
                            ))
                        }
                    </ul>

                </div>

            </aside>

        </>
    )
}

export default Sidebar