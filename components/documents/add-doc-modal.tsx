import filesService from "@/services/filesService";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

type AddDocModalProps = {
  registerType: string;
};

const AddDocModal = ({ registerType }: AddDocModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUploading, setIsUploading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/msword": [".doc"],
      "application/msexcel": [".xls"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });
  const params = useParams();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleUpload = async (onClose: any) => {
    setIsUploading(true);
    // upload file
    const file = acceptedFiles[0];
    const processedFile = await processFile(file);
    const formData = new FormData();
    formData.append("file", processedFile, file.name);
    const createdDate = new Date().toISOString();
    const fileName = file.name;
    const registerId = (params.allergyIntoleranceId ||
      params.familyRecordId) as string;
    const type = file.type;

    const response: any = (
      await filesService.uploadFile(
        createdDate,
        fileName,
        type,
        registerId,
        registerType,
        formData
      )
    ).data;

    const message =
      response.data && response.data instanceof Array
        ? response.data[0]
        : response.data;
    if (response.error) {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

    setIsUploading(false);
    onClose();
  };

  const processFile = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="text-white bg-blue-600 px-4 rounded-xl items-center gap-3 w-min ml-auto mb-3"
      >
        Add New <Plus className="h-4 w-4" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full my-auto"
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="font-bold">Add Document</ModalHeader>
              <ModalBody>
                <div
                  {...getRootProps({
                    className:
                      "dropzone border-dashed border-2 border-blue-400 p-4 h-20 rounded-xl",
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                  </p>
                </div>
                <aside>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside>
              </ModalBody>
              <ModalFooter>
                {!isUploading && (
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                )}
                <Button color="primary" onPress={() => handleUpload(onClose)}>
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDocModal;
