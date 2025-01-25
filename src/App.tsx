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
import H1 from "./components/headings/H1";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useI18n } from "./hooks/useI18n";
import { useModal } from "./context/ModalContext";
import SettingsButton from "./components/buttons/SettingsButton";

const App = () => {
  const step = useSelector((state: RootState) => state.app.step);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const t = useI18n();
  const { showModal } = useModal();
  const dispatch = useDispatch();

  //parse and handle url params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let shouldUpdateUrl = false;

    const actions: { [key: string]: (value: string) => void } = {
      redirect: (value: string) => {
        if (value === "true") {
          showModal({
            title: t("messages.newDomain.title"),
            component: (
              <div className="mb-2 text-text-muted">
                {t("messages.newDomain.content")}
              </div>
            ),
          });
          shouldUpdateUrl = true;
        }
      },
      data: (value: string) => {
        if (!value) {
          dispatch(setProcessStep(1));
          shouldUpdateUrl = true;
          return;
        }

        try {
          const { layout, students } = decodeData(value);
          if (!validate(layout, students)) throw new Error("Invalid data");

          dispatch(setProcessStep(3));
          dispatch(setDeskGrid(layout));
          dispatch(addStudents(students));
        } catch {
          dispatch(setProcessStep(1));
        }

        shouldUpdateUrl = true;
      }
    };

    //proccess url params dynamically -> for new params, add new action
    for (const [key, value] of params.entries()) {
      if (actions[key]) {
        actions[key](value);
        params.delete(key);
      }
    }

    if (shouldUpdateUrl) {
      //ensure url update runs after react update
      setTimeout(() => {
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      }, 0);
    }
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

            <SettingsButton />
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

      <Footer />
    </div>
  );
};
export default App;