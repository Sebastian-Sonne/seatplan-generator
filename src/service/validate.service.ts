import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

/**
 * validates seatplan data
 * @param layout desk layout
 * @param students student data
 * @returns true if data is valid
 * @throws error if data is invalid
 */
const validate = (layout: Desk[][], students: Student[]): boolean => {
    try {
        const isLayoutValid = validateLayout(layout);
        const isStudentsValid = validateStudents(students);
        return isLayoutValid && isStudentsValid;
    } catch (error) {
        throw error;
    }
}
export default validate;

export const validateLayout = (layout: Desk[][]): boolean => {
    if (!Array.isArray(layout)) {
        throw new Error("Invalid layout: not an array");
    }

    for (const row of layout) {
        if (!Array.isArray(row)) {
            throw new Error("Invalid layout: row is not an array");
        }

        for (const desk of row) {
            if (typeof desk.deskState !== 'number' || (typeof desk.studentId !== 'string' && desk.studentId !== null)) {
                throw new Error("Invalid layout: desk structure is incorrect");
            }
        }
    }
    return true;
}

export const validateStudents = (students: Student[]): boolean => {
    if (!Array.isArray(students)) {
        throw new Error("Invalid students: not an array");
    }

    for (const student of students) {
        if (typeof student.name !== 'string' || typeof student.id !== 'string') {
            throw new Error("Invalid students: student structure is incorrect");
        }
    }
    return true;
}
