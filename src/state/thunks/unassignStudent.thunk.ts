import { createAsyncThunk } from "@reduxjs/toolkit";
import { assignStudent, Coordinates } from "../slices/gridSlice";
import { setIsAssigned } from "../slices/studentSlice";
import { RootState } from "../store";

export const unAssignStudent = createAsyncThunk(
    'students/unAssignStudent',
    async ({ coords }: { coords: Coordinates }, { getState, dispatch }) => {
        const state = getState() as RootState;
        const studentId = state.grid.deskSetup[coords.row][coords.col].studentId;

        if (studentId) {
            dispatch(setIsAssigned({ id: studentId, val: false }));
            dispatch(assignStudent({ row: coords.row, col: coords.col, id: null }))
        }
    }
)

export const unAssignStudentById = createAsyncThunk(
    'students/unAssignStudentById',
    async ({ studentId }: { studentId: string }, { getState, dispatch }) => {
        const state = getState() as RootState;

        // Find the coordinates of the student in the grid
        const { deskSetup } = state.grid;
        for (let row = 0; row < deskSetup.length; row++) {
            for (let col = 0; col < deskSetup[row].length; col++) {
                if (deskSetup[row][col].studentId === studentId) {
                    // Unassign the student from the grid
                    dispatch(assignStudent({ row, col, id: null }));
                    // Update the student's assigned status
                    dispatch(setIsAssigned({ id: studentId, val: false }));
                    return;
                }
            }
        }
    }
);