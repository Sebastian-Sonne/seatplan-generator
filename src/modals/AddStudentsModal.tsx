import { useModal } from "../context/ModalContext";
import { useI18n } from "../hooks/useI18n";
import FileUploadArea from "../components/addStudentsScreen/fileUpload/UploadFileArea";
import AddedStudentsArea from "../components/addStudentsScreen/addedStudents/AddedStudentsArea";
import ManualUploadArea from "../components/addStudentsScreen/manualUpload/ManualUploadArea";

const AddStudentsModal = () => {

    return (
        <>
            <div className="flex flex-col gap-4 flex-grow">
                <div className="flex flex-col md:flex-row gap-4">
                    <FileUploadArea />
                    <ManualUploadArea />
                </div>

                <AddedStudentsArea />
            </div>
        </>
    )
};

export const useAddStudentsModal = () => {
    const { showModal, hideModal } = useModal();
    const t = useI18n();
    return () => showModal({
        title: t("modals.addStudents.heading"),
        component: <AddStudentsModal />,
        confirmText: t("common.done"),
        cancelText: t("common.cancel"),
        onCancel: hideModal
    });
};