import { FC } from "react"

type ButtonProps = {
    label: string
    onClick?: () => void
    type?: "submit" | "button"
}
const Button: FC<ButtonProps> = ({
    label,
    onClick,
    type
}) => {
    return (
        <div>
            <button 
            type={type ? type : "button"}
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={onClick}>
                    {label}
                </button>
        </div>
    )
}

export default Button