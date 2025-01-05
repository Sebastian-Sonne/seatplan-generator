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
import ThemeSwitcher from "../ThemeSwitcher";

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
    const notEnoughDesksString = "There are not enough desks for all students. Are you sure you want to continue? Some students will not have a desk assigned to them.";
    if (numberOfDesks < numberOfStudents && !confirm(notEnoughDesksString)) {
      return;
    }

    dispatch(purgeEmptyEdges())
    dispatch(setProcessStep(3));
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <H2 value="Create Classroom Layout" />
        <ThemeSwitcher />
      </div>

      <Container layout="">
        <div className="flex flex-col gap-2">

          <ClassroomGrid />

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <H4 value={`Number of Tables: ${numberOfDesks}`} />
              <H4 value={`Number of Students: ${numberOfStudents}`} />
            </div>

            <button onClick={() => dispatch(resetGrid())} className="text-sm font-semibold text-text-400 hover:text-text-500 transition-colors">
              Reset
            </button>

          </div>
        </div>
      </Container>

      <Container layout="flex flex-row justify-between">
        <GoBackButton onClick={handlePrevStep} />
        <CreateButton onClick={handleCreateClassroom} />
      </Container>
    </>
  )
}
export default CreateClassroomScreen