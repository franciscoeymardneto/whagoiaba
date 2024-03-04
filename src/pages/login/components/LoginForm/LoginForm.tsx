import { useTranslation } from "react-i18next"
import Button from "../../../../components/button/Button"
import Card from "../../../../components/Card/Card"
import LanguageSelector from "../../../../components/i18n/LanguageSelector"
import MailInput from "../../../../components/Inputs/MailInput"
import PasswordInput from "../../../../components/Inputs/PasswordInput"
import { FormEvent } from "react"

const LoginForm = (): JSX.Element => {
    const { t } = useTranslation()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(e.target)
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
                    <MailInput placeholder={t('user.email')}/>

                    </div>
                    <div className="m-4">
                    <PasswordInput placeholder={t('user.password')}/>

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