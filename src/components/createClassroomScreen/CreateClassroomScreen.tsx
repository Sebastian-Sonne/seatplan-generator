import { useDispatch, useSelector } from "react-redux";
import { addCol, addRow, removeCol, removeRow } from "../../state/slices/gridSlice";
import ClassroomGrid from "./ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { RootState } from "../../state/store";
import { selectStudentIds } from "../../state/slices/studentSlice";
import CreateButton from "./buttons/CreateButton";
import GoBackButton from "./buttons/GoBackButton";
import H2 from "../headings/H2";
import H4 from "../headings/H4";
import Container from "../Container";

const CreateClassroomScreen = () => {
  const numberOfDesks = useSelector((state: RootState) => state.grid.numberOfDesks);
  const numberOfStudents = useSelector(selectStudentIds).length;
  const dispatch = useDispatch();

  const handlePrevStep = () => {
    dispatch(setProcessStep(1));
  }

  const handleCreateClassroom = () => {
    dispatch(setProcessStep(3));
  }

  return (
    <div>
      <H2 value="Create Classroom Layout" />

      <Container layout="">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-end items-end gap-2">
            <H4 value="Columns" />
            <RemoveButton onClick={() => dispatch(removeCol())} />
            <AddButton onClick={() => dispatch(addCol())} />
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-end gap-2 w-36">
              <H4 value="Rows:" />
              <RemoveButton onClick={() => dispatch(removeRow())} />
              <AddButton onClick={() => dispatch(addRow())} />
            </div>

            <div className="w-full">
              <ClassroomGrid />
            </div>
          </div>
          <div className="flex flex-col">
            <H4 value={`Number of Tables: ${numberOfDesks}`} />
            <H4 value={`Number of Students: ${numberOfStudents}`} />
          </div>
        </div>
      </Container>

      <Container layout="flex flex-row justify-between">
        <GoBackButton onClick={handlePrevStep} />
        <CreateButton onClick={handleCreateClassroom} />
      </Container>
    </div>
  )
}
export default CreateClassroomScreen