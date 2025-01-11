import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setIsAssigned } from "../slices/studentSlice";
import { assignStudent } from "../slices/gridSlice";

export const randAssignStudents = createAsyncThunk(
    'students/randAssignStudents',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const students = Object.values(state.students.entities);
        const desks = state.grid.deskSetup

        const availableDesks: { row: number; col: number }[] = [];
        desks.forEach((row, rowIndex) => {
            row.forEach((desk, colIndex) => {
                if (desk.deskState === 1 && !desk.studentId) {
                    availableDesks.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        const availableStudentIds: string[] = [];
        students.forEach((student, _) => {
            if (!student.isAssigned) {
                availableStudentIds.push(student.id);
            }
        })

        const shuffledStudentIds = availableStudentIds.sort(() => Math.random() - 0.5);
        const shuffledDesks = availableDesks.sort(() => Math.random() - 0.5);

        shuffledStudentIds.forEach((studentId, index) => {
            if (shuffledDesks[index]) {
                const { row, col } = shuffledDesks[index];
                dispatch(setIsAssigned({ id: studentId, val: true }));
                dispatch(assignStudent({ row: row, col: col, id: studentId }));
            }
        });
    }
)