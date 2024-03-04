import { FC } from "react"
import { useTranslation } from "react-i18next"

type MailInputProps = {
    placeholder?: string
    value?: string
    onChange?: (value: string)=> void
}
const MailInput: FC<MailInputProps> = ({
    placeholder,
    onChange,
    value
}) => {
    const { t } = useTranslation()
    return (
        <div>
            <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                placeholder={placeholder}
                lang="en"
                onInvalid={(e) => e.currentTarget.setCustomValidity(t('errors.invalidEmail'))}
                value={value}
                onChange={(e) => onChange? onChange(e.target.value) : undefined}
            />
        </div>
    )
}

export default MailInput