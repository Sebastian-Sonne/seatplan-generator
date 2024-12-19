import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Student {
    name: string;
    id: string;
}

const studentsAdapter = createEntityAdapter<Student>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = studentsAdapter.getInitialState();

const studentsSlice = createSlice({
    name: 'students',
    initialState: initialState,
    reducers: {
        addStudent: studentsAdapter.addOne,
        addStudents: studentsAdapter.addMany,
        removeStudent: studentsAdapter.removeOne,
        removeAll: studentsAdapter.removeAll
    },
})

export const { addStudent, addStudents, removeStudent, removeAll } = studentsSlice.actions;
export default studentsSlice.reducer;

export const {
    selectAll: selectAllStudent,
    selectById: selectStudentById,
    selectIds: selectStudentIds,
    selectEntities: selectStudentEntities,
} = studentsAdapter.getSelectors((state: RootState) => state.students);