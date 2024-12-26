import { useDispatch, useSelector } from "react-redux";
import { purgeEmptyEdges, resetGrid } from "../../state/slices/gridSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
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
    if (numberOfDesks === 0) {
      alert("Please add at least one desk in order to continue.")
      return;
    }
    dispatch(purgeEmptyEdges())
    dispatch(setProcessStep(3));
  }

  return (
    <div>
      <H2 value="Create Classroom Layout" />

      <Container layout="">
        <div className="flex flex-col gap-2">

          <ClassroomGrid />

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <H4 value={`Number of Tables: ${numberOfDesks}`} />
              <H4 value={`Number of Students: ${numberOfStudents}`} />
            </div>

            <button onClick={() => dispatch(resetGrid())} className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
              Reset
            </button>

          </div>
        </div>
      </Container>

      <Container layout="flex flex-row justify-between">
        <GoBackButton onClick={handlePrevStep}/>
        <CreateButton onClick={handleCreateClassroom} />
      </Container>
    </div>
  )
}
export default CreateClassroomScreen