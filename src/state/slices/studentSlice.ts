import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Student {
    name: string;
    id: string;
    isAssigned: boolean;
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
        removeAll: studentsAdapter.removeAll,
        setIsAssigned: (state, action: PayloadAction<{id: string, val: boolean}>) => {
            state.entities[action.payload.id].isAssigned = action.payload.val;
        },
        forceClearStudentAssignements: (state) => {
            const students = Object.values(state.entities);
            students.forEach((student, _) => {
                state.entities[student.id].isAssigned = false;
            })
        },
    },
})

export const { addStudent, addStudents, removeStudent, removeAll, setIsAssigned, forceClearStudentAssignements } = studentsSlice.actions;
export default studentsSlice.reducer;

export const {
    selectAll: selectAllStudent,
    selectById: selectStudentById,
    selectIds: selectStudentIds,
    selectEntities: selectStudentEntities,
} = studentsAdapter.getSelectors((state: RootState) => state.students);