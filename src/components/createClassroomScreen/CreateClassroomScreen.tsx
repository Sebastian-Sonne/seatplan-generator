import { useDispatch, useSelector } from "react-redux";
import { purgeEmptyEdges, resetGrid } from "../../state/slices/gridSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
import { RootState } from "../../state/store";
import { selectStudentIds } from "../../state/slices/studentSlice";
import H4 from "../headings/H4";
import Container from "../Container";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

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
      <Container layout="">
        <div className="flex flex-col gap-2">

          <ClassroomGrid />

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <H4 value={`Number of Tables: ${numberOfDesks}`} />
              <H4 value={`Number of Students: ${numberOfStudents}`} />
            </div>

            <button onClick={() => dispatch(resetGrid())} className="font-semibold text-text-muted px-4 rounded-lg border border-transparent hover:border-default active:bg-default transition-colors">
              Reset
            </button>

          </div>
        </div>
      </Container>

      <Container layout="flex flex-row justify-between">
        <SecondaryButton onClick={handlePrevStep} >
          Go Back
        </SecondaryButton>
        <PrimaryButton onClick={handleCreateClassroom} >
          Create Classroom
        </PrimaryButton>
      </Container>
    </>
  )
}
export default CreateClassroomScreen