import filesService from "@/services/filesService";
import { RegisterFile } from "@/types/registerFile";
import DocViewer from "@cyntler/react-doc-viewer";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomSuspense from "../custom-suspense";
import Loading from "../loading";

type DocumentPreviewModalProps = {
  document: RegisterFile;
};

const DocumentPreviewModal = ({ document }: DocumentPreviewModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileType, setFileType] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (document.hash) {
        const response = await filesService.getFile(document.hash);
        const fileType = response.headers["file-type"];
        const buffer = response.data;
        const blob = new Blob([buffer], { type: fileType });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setFileType(blob.type);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [document]);

  return (
    <>
      <Button
        className="text-sm font-medium"
        radius="sm"
        size="sm"
        color="primary"
        variant="flat"
        onPress={onOpen}
      >
        Preview
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full my-auto h-4/5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold">Document Preview</ModalHeader>
              <ModalBody className="h-2/4">
                <CustomSuspense isLoading={isLoading} fallback={<Loading />}>
                  <DocViewer
                    documents={[
                      {
                        uri: previewUrl,
                        fileType: fileType,
                        fileName: document.file_name
                      },
                    ]}
                  />
                </CustomSuspense>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentPreviewModal;
