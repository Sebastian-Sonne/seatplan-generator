import { ThemeSettingType } from "../../state/slices/themeSlice"

export const PreviewIcon = ({ theme }: { theme: ThemeSettingType }) => {

    return (
        <div className="w-full">
            <img className="rounded-t-lg" src={`/theme/${theme}_preview.svg`} alt="Dark UI Preview" />
        </div>
    )
}
