import { useDispatch, useSelector } from "react-redux"
import PrimaryButton from "./buttons/PrimaryButton"
import Container from "./Container"
import { RootState } from "../state/store";
import { setLanguage } from "../state/slices/appSlice";

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.app.language);

    const changeLanguage = (lang: "en" | "de") => {
        dispatch(setLanguage(lang));
    }

    return (
        <Container className="" >
            <PrimaryButton onClick={() => changeLanguage("en")} disabled={language === "en"}>
                Englisch
            </PrimaryButton>
            <PrimaryButton onClick={() => changeLanguage("de")} disabled={language === "de"}>
                Deutsch
            </PrimaryButton>
        </Container>
    )
}
export default LanguageSwitcher