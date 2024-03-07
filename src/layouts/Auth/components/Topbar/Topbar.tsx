import { useDispatch } from "react-redux"
import { handleSidebar } from "../../../../store/reducers/sidebarReducer"
import LanguageSelector from "../../../../components/i18n/LanguageSelector"

const TopBar = () => {
    const dispatch = useDispatch()

    return (
        <>
            <div className="bg-white shadow-md p-1 w-full flex justify-between items-center">
                <div className="">
                    <div className="w-10 cursor-pointer" onClick={() => dispatch(handleSidebar())}>
                        <img src="/icons/menu.svg" alt="" />
                    </div>

                </div>
                <div className="">

                    <LanguageSelector />

                </div>
            </div>

        </>
    )
}

export default TopBar