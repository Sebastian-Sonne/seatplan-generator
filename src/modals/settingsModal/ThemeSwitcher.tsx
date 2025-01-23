import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import TertiaryButton from "../../components/buttons/TertiaryButton";
import { MoonIcon, SunIcon } from "../../components/icons/Icons";
import { toggleTheme } from "../../state/slices/appSlice";
import { RootState } from "../../state/store";
import H4 from "../../components/headings/H4";

const ThemeSwitcher = () => {
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useDispatch();

    return (
        <>
            <H4 value="Toggle site theme:" />
            {theme === 'dark' ? (
                <ThemeButton disabled={false}>
                    <MoonIcon />
                </ThemeButton>
            ) : (
                <ThemeButton disabled={false}>
                    <SunIcon />
                </ThemeButton>
            )}
        </>
    )
}
export default ThemeSwitcher

const ThemeButton = ({ disabled, children }: { disabled: boolean, children: React.ReactNode }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleTheme())
    }

    return (
        <>
            {disabled ? (
                <TertiaryButton className="w-20" onClick={handleClick}>
                    {children}
                </TertiaryButton>
            ) : (
                <PrimaryButton className="w-20" onClick={handleClick}>
                    {children}
                </PrimaryButton >
            )}
        </>
    )
}