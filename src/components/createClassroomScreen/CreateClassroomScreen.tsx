import { useDispatch, useSelector } from "react-redux";
import { purgeEmptyEdges, resetGrid } from "../../state/slices/gridSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
import { RootState } from "../../state/store";
import { selectStudentIds } from "../../state/slices/studentSlice";
import H4 from "../headings/H4";
import Container from "../Container";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useI18n } from "../../hooks/useI18n";
import { useModal } from "../../context/ModalContext";

const CreateClassroomScreen = () => {
  const numberOfDesks = useSelector((state: RootState) => state.grid.numberOfDesks);
  const numberOfStudents = useSelector(selectStudentIds).length;
  const dispatch = useDispatch();
  const t = useI18n();
  const { showModal, hideModal } = useModal();

  const handlePrevStep = () => {
    dispatch(setProcessStep(1));
  }

  const handleCreateClassroom = () => {
    if (numberOfDesks === 0) {
      showModal({
        title: "Error",
        component: (
          <div className="mb-2 text-text-muted">
            {t("errors.noDesk")}
          </div>
        )
      })


      return;
    }
    if (numberOfDesks < numberOfStudents) {
      showModal({
        title: "Warning",
        component: (
          <div className="mb-2 text-text-muted">
            {t("errors.notEnoughDesks")}
          </div>
        ),
        cancelText: "Cancel",
        confirmText: "Continue anyways",
        onConfirm: () => {
          hideModal();
          dispatch(purgeEmptyEdges());
          dispatch(setProcessStep(3));
        },
        onCancel: hideModal
      });
      return;
    }

    dispatch(purgeEmptyEdges())
    dispatch(setProcessStep(3));
  }

  return (
    <>
      <Container className="">
        <div className="flex flex-col gap-2">

          <ClassroomGrid />

          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-col">
              <H4 value={`${t("screens.create.numberOfTables")} ${numberOfDesks}`} />
              <H4 value={`${t("screens.create.numberOfStudents")} ${numberOfStudents}`} />
            </div>

            <SecondaryButton onClick={() => dispatch(resetGrid())} >
              {t("common.reset")}
            </SecondaryButton>
          </div>
        </div>
      </Container>

      <Container className="flex flex-row justify-between">
        <TertiaryButton onClick={handlePrevStep} >
          {t("common.goBack")}
        </TertiaryButton>
        <PrimaryButton onClick={handleCreateClassroom} >
          {t("screens.create.create")}
        </PrimaryButton>
      </Container>
    </>
  )
}
export default CreateClassroomScreen