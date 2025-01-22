import AddStudentsScreen from "./components/addStudentsScreen/AddStudentsScreen";
import CreateClassroomScreen from "./components/createClassroomScreen/CreateClassroomScreen";
import AssignSeatsScreen from "./components/assignSeatsScreen/AssignSeatsScreen";
import Progressbar from "./components/Progressbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { ProcessSteps, setProcessStep } from "./state/slices/appSlice";
import { Footer } from "./components/footer/Footer";
import { useEffect } from "react";
import { setDeskGrid } from "./state/slices/gridSlice";
import { addStudents } from "./state/slices/studentSlice";
import { decodeData } from "./service/link.service";
import validate from "./service/validate.service";
import Container from "./components/Container";
import ThemeSwitcher from "./components/ThemeSwitcher";
import H1 from "./components/headings/H1";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useI18n } from "./hooks/useI18n";
import { useModal } from "./context/ModalContext";

const App = () => {
  const step = useSelector((state: RootState) => state.app.step);
  const theme = useSelector((state: RootState) => state.app.theme);
  const t = useI18n();
  const { showModal } = useModal();
  const dispatch = useDispatch();

  //parse url params for existing layout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const redirect = params.get('redirect');

    if (redirect === "true") {
      showModal({
        title: "We've moved to Seatplan.xyz!",
        component: (
          <div className="mb-2 text-text-muted">
            You’ve been redirected from our old domain. We’re now at <span className="font-bold text-default">SeatPlan.xyz</span> with some great new features! Make sure to update your bookmarks. 🎉
          </div>
        )
      })
      //params.delete('redirect');

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      setTimeout(() => {
        window.history.replaceState({}, '', newUrl);
      }, 0); //use a small delay to avoid interfering with React updates
    }

    if (!data) {
      dispatch(setProcessStep(1));
      return;
    }

    const { layout, students } = decodeData(data);
    if (!validate(layout, students)) {
      dispatch(setProcessStep(1));
      return;
    }

    dispatch(setProcessStep(3));
    dispatch(setDeskGrid(layout));
    dispatch(addStudents(students));

    params.delete('data');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    setTimeout(() => {
      window.history.replaceState({}, '', newUrl);
    }, 0); //use a small delay to avoid interfering with React updates
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="lg:px-[8%] flex flex-col items-center gap-2 bg-background min-h-screen pt-5">
      <div className="w-full max-w-[2000px] px-4">
        <Container className="flex flex-col gap-4">
          <Progressbar />
          <div className="flex flex-row justify-between items-center">
            {step === ProcessSteps.STEP_ONE && <H1 value={t("screens.addStudents.heading")} />}
            {step === ProcessSteps.STEP_TWO && <H1 value={t("screens.create.heading")} />}
            {step === ProcessSteps.STEP_THREE && <H1 value={t("screens.assign.heading")} />}

            <ThemeSwitcher />
          </div>
        </Container>

        {step === ProcessSteps.STEP_ONE && <AddStudentsScreen />}
        {step === ProcessSteps.STEP_TWO && <CreateClassroomScreen />}
        {step === ProcessSteps.STEP_THREE && (
          <DndProvider backend={HTML5Backend}>
            <AssignSeatsScreen />
          </DndProvider>
        )}
      </div>

      <LanguageSwitcher />

      <Footer />
    </div>
  );
};
export default App;