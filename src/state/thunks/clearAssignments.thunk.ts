import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearDeskAssignments } from "../slices/gridSlice";
import { RootState } from "../store";
import { setIsAssigned } from "../slices/studentSlice";

export const clearAssignments = createAsyncThunk(
    'students/clearAssignments',
    async (_, { dispatch }) => {
        dispatch(clearStudentAssignements())
        dispatch(clearDeskAssignments())
    }
)

export const clearStudentAssignements = createAsyncThunk(
    'students/clearStudentAssignements',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;

        const unlockedDeskIds = state.grid.deskSetup
            .flat()
            .filter(desk => !desk.isLocked)
            .map(desk => desk.studentId);

        unlockedDeskIds.forEach(id => {
            if (id) dispatch(setIsAssigned({ id, val: false }));
        });
    }
)