import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearStudentAssignemnts } from "../slices/studentSlice";
import { clearDeskAssignments } from "../slices/gridSlice";

export const clearAssignments = createAsyncThunk(
    'students/clearAssignments',
    async (_, { dispatch }) => {
        dispatch(clearStudentAssignemnts())
        dispatch(clearDeskAssignments())
    }
)