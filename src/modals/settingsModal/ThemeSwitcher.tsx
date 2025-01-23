import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { toggleTheme } from "../state/slices/appSlice";
import { MoonIcon, SunIcon } from "./icons/Icons";
import TertiaryButton from "./buttons/TertiaryButton";
import PrimaryButton from "./buttons/PrimaryButton";

const ThemeSwitcher = () => {
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useDispatch();

    return (
        <TertiaryButton onClick={() => dispatch(toggleTheme())} className="h-10 aspect-square !p-2 !rounded-full">
            {theme === 'dark' ? (
                <MoonIcon />
            ) : (
                <SunIcon />
            )}
        </TertiaryButton>
    )
}
export default ThemeSwitcher

const ThemeButton = ({ disabled, component }: { disabled: boolean, component: React.ReactNode }) => {

    const handleClick = () => {

    }

    return (
        <>
            {disabled ? (
                <TertiaryButton onClick={handleClick}>
                    {component}
                </TertiaryButton>
            ) : (
                <PrimaryButton onClick={handleClick}>
                    {component}
                </PrimaryButton >
            )}
        </>
    )
}