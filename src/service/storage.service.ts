import { Student } from "../state/slices/studentSlice"

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

export const getTheme = (): "dark" | "light" => {
    return localStorage.getItem('theme') === "dark" ? "dark" : 'light';
}