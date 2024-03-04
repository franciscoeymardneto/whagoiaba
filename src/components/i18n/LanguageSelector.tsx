import gbflag from "/icons/flags/gb.svg"
import esflag from "/icons/flags/es.svg"
import brflag from "/icons/flags/br.svg"
import { useTranslation } from "react-i18next"
import "./styles.css"

// Flags font: https://flagicons.lipis.dev/

const LanguageSelector = (): JSX.Element => {
    const { i18n } = useTranslation()
    const languages = [
        { key: 'pt', name: 'Português', flag: brflag },
        { key: 'en', name: 'English', flag: gbflag },
        { key: 'es', name: 'Español', flag: esflag },
    ]
    return (
        <div className="languages-container">
            {
                languages.map((lan, i) => {
                    return (
                        <div className="language" key={i} onClick={() => i18n.changeLanguage(lan.key)}>
                            <img src={lan.flag} alt={lan.name} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LanguageSelector