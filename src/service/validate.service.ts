import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

const validate = (layout: Desk[][], students: Student[]): boolean => {
    const isLayoutValid = validateLayout(layout);
    const isStudentsValid = validateStudents(students)

    return isLayoutValid && isStudentsValid;
}
export default validate;

export const validateLayout = (layout: Desk[][]) => {
    if (!Array.isArray(layout)) {
        console.error("Invalid layout: not an array");
        return false;
    }

    for (const row of layout) {
        if (!Array.isArray(row)) {
            console.error("Invalid layout: row is not an array");
            return false;
        }

        for (const desk of row) {
            if (typeof desk.deskState !== 'number' || (typeof desk.studentId !== 'string' && desk.studentId !== null)) {
                console.error("Invalid layout: desk structure is incorrect");
                return false;
            }
        }
    }
    return true;
}

export const validateStudents = (students: Student[]) => {
    if (!Array.isArray(students)) {
        console.error("Invalid students: not an array");
        return false;
    }

    for (const student of students) {
        if (typeof student.name !== 'string' || typeof student.id !== 'string') {
            console.error("Invalid students: student structure is incorrect");
            return false;
        }
    }
    return true
}