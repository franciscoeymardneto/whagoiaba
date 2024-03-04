import { useTranslation } from "react-i18next"

const NoAuthLayout = (): JSX.Element => {
    const {t} = useTranslation()
    return(
        <p>{t('greeting.hello')}</p>
    )
}

export default NoAuthLayout