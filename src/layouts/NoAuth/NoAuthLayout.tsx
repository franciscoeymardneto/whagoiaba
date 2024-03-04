import { useTranslation } from "react-i18next"
import LanguageSelector from "../../components/i18n/LanguageSelector"

const NoAuthLayout = (): JSX.Element => {
    const {t} = useTranslation()
    return(
        <>
        <LanguageSelector/>
        <p>{t('greeting.hello')}</p>
        </>
    )
}

export default NoAuthLayout