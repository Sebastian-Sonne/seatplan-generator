import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setIsAssigned } from "../slices/studentSlice";
import { assignStudent, clearDeskAssignments } from "../slices/gridSlice";

export const shuffleAssignedStudents = createAsyncThunk(
    'students/shuffleAssignedStudents',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const desks = state.grid.deskSetup

        const availableStudentIds = desks.flat()
            .filter(desk => desk.deskState === 1 && desk.isLocked === false)
            .map(desk => desk.studentId);

        dispatch(clearDeskAssignments());

        const availableDesks = [];
        for (let rowIndex = 0; rowIndex < desks.length; rowIndex++) {
            const row = desks[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const desk = row[colIndex];
                if (desk.deskState === 1 && desk.isLocked === false) {
                    availableDesks.push({ row: rowIndex, col: colIndex });
                }
            }
        }

        const shuffledStudentIds = availableStudentIds.sort(() => Math.random() - 0.5);
        const shuffledDesks = availableDesks.sort(() => Math.random() - 0.5);

        shuffledStudentIds.forEach((studentId, index) => {
            if (shuffledDesks[index]) {
                const { row, col } = shuffledDesks[index];
                if (studentId) {
                    dispatch(setIsAssigned({ id: studentId, val: true }));
                    dispatch(assignStudent({ row: row, col: col, id: studentId }));
                }
            }
        });
    }
)