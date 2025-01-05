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
import Container from "./components/Container";
import ThemeSwitcher from "./components/ThemeSwitcher";
import H1 from "./components/headings/H1";

const App = () => {
  const step = useSelector((state: RootState) => state.app.step);
  const exportVisible = useSelector((state: RootState) => state.app.exportVisible);
  const theme = useSelector((state: RootState) => state.app.theme);
  const dispatch = useDispatch();

  //parse url params for existing layout
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

    params.delete('data');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    setTimeout(() => {
      window.history.replaceState({}, '', newUrl);
    }, 0); //use a small delay to avoid interfering with React updates
  }, []);

  useEffect(() => {
    (theme === "dark") ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="bg-background min-h-screen pt-5">
      <div className="w-full max-w-4xl mx-auto mb-4 p-4">
        <Container layout="flex flex-col gap-4">
          <Progressbar />
          <div className="flex flex-row justify-between items-center">
            {step === ProcessSteps.STEP_ONE && <H1 value="Upload File or add Students manually" />}
            {step === ProcessSteps.STEP_TWO && <H1 value="Create Classroom Layout" />}
            {step === ProcessSteps.STEP_THREE && <H1 value="Assign Students" />}

            <ThemeSwitcher />
          </div>
        </Container>

        {step === ProcessSteps.STEP_ONE && <AddStudentsScreen />}
        {step === ProcessSteps.STEP_TWO && <CreateClassroomScreen />}
        {step === ProcessSteps.STEP_THREE && <AssignSeatsScreen />}
      </div>

      {exportVisible && <ExportScreen />}

      <Footer />
    </div>
  );
};
export default App;