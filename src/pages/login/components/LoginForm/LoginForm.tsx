import { useTranslation } from "react-i18next"
import Button from "../../../../components/button/Button"
import Card from "../../../../components/Card/Card"
import LanguageSelector from "../../../../components/i18n/LanguageSelector"
import MailInput from "../../../../components/Inputs/MailInput"
import PasswordInput from "../../../../components/Inputs/PasswordInput"
import { FormEvent, useState } from "react"
import { Login } from "../../../../services/login"
import { Notify } from "../../../../heslpers/notify"

const LoginForm = (): JSX.Element => {
    const { t } = useTranslation()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()


        await Login({
            email,
            password
        })
 
    }
    return (
        <div className="">

            <Card>
                <>
                <div className="mb-10">
                <h2>{t('greeting.hello')}</h2>

                </div>

                <form onSubmit={handleSubmit}>
                    <div className="m-4">
                    <MailInput 
                        placeholder={t('user.email')}
                        value={email}
                        onChange={(value) => setEmail(value)}
                    />

                    </div>
                    <div className="m-4">
                    <PasswordInput 
                        placeholder={t('user.password')}
                        value={password}
                        onChange={(value) => setPassword(value)}
                    />

                    </div>
                    <div className="m-4">
                    <Button
                        label={t('login')}
                        type="submit"
                    />

                    </div>
                </form>

                <div className="">
                <LanguageSelector/>

                </div>

                </>



            </Card>


        </div>
    )
}

export default LoginForm