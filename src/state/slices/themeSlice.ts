import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Storage from "../../service/storage.service";

export type ThemeSettingType = "dark" | "light" | "system";
export type ThemeType = "dark" | "light";

export const getUserPreferredTheme = (): ThemeType => 
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getInitialTheme = (): ThemeType => {
    const setting = Storage.getThemeSetting();
    return setting === "system" ? getUserPreferredTheme() : setting;
};

interface ThemeState {
    setting: ThemeSettingType;
    theme: ThemeType;
}

const initialState: ThemeState = {
    setting: Storage.getThemeSetting(),
    theme: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeSetting: (state, action: PayloadAction<ThemeSettingType>) => {
            state.setting = action.payload;
            state.theme = action.payload === "system" ? getUserPreferredTheme() : action.payload;
            
            Storage.setTheme(action.payload);
        },
        updateSystemTheme: (state) => {
            if (state.setting === "system") {
                state.theme = getUserPreferredTheme();
            }
        },
    },
});

export const { setThemeSetting, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
