import filesService from "@/services/filesService";
import { RegisterFile } from "@/types/registerFile";
import DocViewer from "@cyntler/react-doc-viewer";
import {
  Button,
  Image,
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
import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { Minus, Plus, Undo2 } from "lucide-react";

const ImageViewer = ({ previewUrl }: { previewUrl: string }) => {
  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="tools">
            <Button color="primary" variant="flat" onClick={() => zoomIn()}>
              <Plus size={24} />
            </Button>
            <Button color="primary" variant="flat" onClick={() => zoomOut()}>
              <Minus size={24} />
            </Button>
            <Button color="primary" variant="flat" onClick={() => resetTransform()}>
              <Undo2 size={24} />
            </Button>
          </div>
          <TransformComponent>
            <Image src={previewUrl} alt="test" />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

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
        Previsualizar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full my-auto h-4/5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold">Vista previa del documento</ModalHeader>
              <ModalBody className="h-2/4">
                <CustomSuspense isLoading={isLoading} fallback={<Loading />}>
                  {fileType === "application/pdf" ? (
                    <DocViewer
                      documents={[
                        {
                          uri: previewUrl,
                          fileType: fileType,
                          fileName: document.file_name,
                        },
                      ]}
                    />
                  ) : (
                    <ImageViewer previewUrl={previewUrl} />
                  )}
                </CustomSuspense>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
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
