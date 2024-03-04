import { FC, useState } from "react"

import eyeIcon from '/icons/input/eye.svg'
import closedeyeIcon from '/icons/input/closedeye.svg'

type PasswordInputProps = {
    placeholder?: string,
    value?: string
    onChange?: (value: string)=> void
}
const PasswordInput: FC<PasswordInputProps> = ({
    placeholder,
    onChange,
    value
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="relative">
            <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type={showPassword ? "text" :"password"}
                name="password"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange? onChange(e.target.value) : undefined}
            />
            <div
                className="absolute inset-y-0 right-0 px-4 py-2"
                onClick={togglePasswordVisibility}
            >

                {showPassword ? (
                    <img className="max-w-6" src={eyeIcon} />
                    
                ) : (
                    <img className="max-w-6" src={closedeyeIcon} />
                    
                )}
            </div>
        </div>
    )
}

export default PasswordInput