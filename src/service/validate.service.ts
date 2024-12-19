import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

/**
 * Validates the 'tab' parameter (should be a number 1, 2, or 3).
 * @param tabParam The tab parameter as a string.
 * @returns A valid tab value (1, 2, or 3).
 */
export const validateTab = (tabParam: string | null): 1 | 2 | 3 => {
    const tab = parseInt(tabParam ?? '1', 10);
    return [1, 2, 3].includes(tab) ? (tab as 1 | 2 | 3) : 1;
};

/**
 * Validates the 'students' parameter (should be an array of Student objects).
 * @param studentParam The students parameter as a string.
 * @returns An array of validated Student objects or an empty array if invalid.
 */
export const validateStudents = (studentParam: string | null): Student[] => {
    let students: Student[] = [];
    try {
        students = JSON.parse(studentParam ?? '[]');
        if (!Array.isArray(students) || !students.every(s => typeof s.id === 'string' && typeof s.name === 'string')) {
            throw new Error('Invalid student data');
        }
    } catch {
        students = [];
    }
    return students;
};

/**
 * Validates the 'layout' parameter (should be a 2D array of Desk objects).
 * @param layoutParam The layout parameter as a string.
 * @returns A 2D array of validated Desk objects or an empty array if invalid.
 */
export const validateLayout = (layoutParam: string | null): Desk[][] => {
    let layout: Desk[][] = [];
    try {
        layout = JSON.parse(layoutParam ?? '[]');
        if (
            !Array.isArray(layout) ||
            !layout.every(row =>
                Array.isArray(row) &&
                row.every(d => (d.deskState === -1 || d.deskState === 1) && (d.studentId === null || typeof d.studentId === 'string'))
            )
        ) {
            throw new Error('Invalid layout data');
        }
    } catch {
        layout = [];
    }
    return layout;
};
