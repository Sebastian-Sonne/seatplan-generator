import AddStudentsScreen from "./components/addStudentsScreen/AddStudentsScreen";
import CreateClassroomScreen from "./components/createClassroomScreen/CreateClassroomScreen";
import AssignSeatsScreen from "./components/assignSeatsScreen/AssignSeatsScreen";
import Progressbar from "./components/Progressbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { ProcessSteps, setProcessStep, setShuffled } from "./state/slices/appSlice";
import { Footer } from "./components/footer/Footer";
import { useEffect } from "react";
import ExportScreen from "./components/exportScreen/ExportScreen";
import { setDeskGrid } from "./state/slices/gridSlice";
import { addStudents } from "./state/slices/studentSlice";
import { decodeData } from "./service/link.service";
import validate from "./service/validate.service";

const App = () => {
  const step = useSelector((state: RootState) => state.app.step);
  const exportVisible = useSelector((state: RootState) => state.app.exportVisible);
  const dispatch = useDispatch();

  //parse params for existing layout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');

    if (!data) {
      dispatch(setProcessStep(1));
      return;
    }

    const { layout, students } = decodeData(data);
    if (!validate(layout, students)) {
      dispatch(setProcessStep(1));
      return;
    }

    dispatch(setShuffled(true)); //set true to prevent reshuffle on component mount
    dispatch(setProcessStep(3));
    dispatch(setDeskGrid(layout));
    dispatch(addStudents(students));
  }, []);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mb-4 p-4 bg-gray-50 mt-5 rounded-3xl shadow-md">
        <Progressbar />

        {step === ProcessSteps.STEP_ONE && <AddStudentsScreen />}
        {step === ProcessSteps.STEP_TWO && <CreateClassroomScreen />}
        {step === ProcessSteps.STEP_THREE && <AssignSeatsScreen />}
      </div>

      {exportVisible && <ExportScreen />}

      <Footer />
    </>
  );
};
export default App;