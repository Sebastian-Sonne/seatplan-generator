import { Student } from "../state/slices/studentSlice"
import { ThemeSettingType } from "../state/slices/themeSlice";

export const saveStudents = (students: Student[]) => {
    localStorage.setItem('students', JSON.stringify(students));
}

export const getStudents = (): Student[] => {
    const students = localStorage.getItem('students');
    if (students) {
        return JSON.parse(students);
    } else {
        return []
    }
}

export const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
}

export const getThemeSetting = (): ThemeSettingType => {
    const theme = localStorage.getItem('theme');
    return theme === "dark" ? "dark" : theme === "light" ? 'light' : "system";
}