import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinates, setDeskGrid } from "../slices/gridSlice";
import { RootState } from "../store";

export const swapStudents = createAsyncThunk(
    'students/swapStudents',
    async ({ fromCoords, toCoords }: {fromCoords: Coordinates, toCoords: Coordinates}, { getState, dispatch }) => {
        const state = getState() as RootState;
        const deskSetup = state.grid.deskSetup.map(row => row.map(desk => ({ ...desk })));

        const fromStudentId = deskSetup[fromCoords.row][fromCoords.col].studentId;
        const toStudentId = deskSetup[toCoords.row][toCoords.col].studentId;

        deskSetup[fromCoords.row][fromCoords.col].studentId = toStudentId;
        deskSetup[toCoords.row][toCoords.col].studentId = fromStudentId;

        dispatch(setDeskGrid(deskSetup));
    }
);