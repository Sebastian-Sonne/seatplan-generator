import FileUploadArea from "./UploadFile";

const AddStudentsScreen = () => {

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload Files or add Students manually</h2>
      <div className="flex gap-4 items-center">
        <FileUploadArea />
      </div>

    </div>
  )
}
export default AddStudentsScreen