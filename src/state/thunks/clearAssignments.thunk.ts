import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearStudentAssignements } from "../slices/studentSlice";
import { clearDeskAssignments } from "../slices/gridSlice";

export const clearAssignments = createAsyncThunk(
    'students/clearAssignments',
    async (_, { dispatch }) => {
        dispatch(clearStudentAssignements())
        dispatch(clearDeskAssignments())
    }
)