import { FC } from "react"

type MailInputProps = {
    placeholder?: string
}
const MailInput: FC<MailInputProps> = ({
    placeholder
}) => {
    return (
        <div>
            <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                placeholder={placeholder}
                id=""
            />
        </div>
    )
}

export default MailInput