import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { PreviewIcon } from "../../components/icons/ThemePreview";
import H3 from "../../components/headings/H3";
import { setThemeSetting, ThemeSettingType } from "../../state/slices/themeSlice";

const ThemeSettings = () => {
    return (
        <div className="mb-6">
            <H3 value="Theme Preferences" />
            <p className="text-text-muted-extra -mt-3 mb-2">Choose your prefered color theme or use your system default.</p>

            <div className="flex flex-row gap-4">
                <ThemeSettingsCard theme="light" />
                <ThemeSettingsCard theme="dark" />
                <ThemeSettingsCard theme="system" />
            </div>
        </div>
    )
}
export default ThemeSettings

const ThemeSettingsCard = ({ theme }: { theme: ThemeSettingType }) => {
    const themeSetting = useSelector((state: RootState) => state.theme.setting);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (theme !== themeSetting) {
            dispatch(setThemeSetting(theme));
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col rounded-lg w-32 border-2 border-border cursor-pointer ${theme === themeSetting && "border-default"}`}>

            <PreviewIcon theme={theme} />

            <div className="flex justify-start items-center bg-card h-8 p-2 rounded-lg">
                <span className="text-text">{theme === "dark" ? "Dark Theme" : theme === "light" ? "Light Theme" : "System Default"}</span>
            </div>
        </div>
    )
}