import H2 from "../headings/H2";
import AddedStudentsArea from "./addedStudents/AddedStudentsArea";
import FileUploadArea from "./fileUpload/UploadFileArea";
import ManualUploadArea from "./manualUpload/ManualUploadArea";

const AddStudentsScreen = () => {

  return (
    <div className="flex flex-col">
      <H2 value="Upload File or add Students manually" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 ">
          <FileUploadArea />

          <ManualUploadArea />
        </div>

        <AddedStudentsArea />
      </div>
    </div>
  )
}
export default AddStudentsScreen