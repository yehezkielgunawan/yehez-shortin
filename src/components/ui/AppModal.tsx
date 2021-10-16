import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import { ReactNode } from "react";

type AppModalProps = Pick<ModalProps, "isOpen" | "onClose" | "size"> & {
  header?: ReactNode;
  withCloseButton?: boolean;
  confirmButton?: ReactNode;
  body?: ReactNode;
  withFooter?: boolean;
  closeButtonText?: string;
};

const AppModal = ({
  isOpen,
  size,
  header,
  withCloseButton = false,
  confirmButton,
  body,
  withFooter = false,
  closeButtonText,
  onClose,
}: AppModalProps) => {
  return (
    <Modal size={size} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent margin={4} borderRadius={24}>
        {header && <ModalHeader>{header}</ModalHeader>}
        {withCloseButton && <ModalCloseButton />}

        {body && <ModalBody>{body}</ModalBody>}

        {withFooter && (
          <ModalFooter gridGap={2}>
            {withCloseButton && (
              <Button onClick={onClose}>{closeButtonText ?? "Close"}</Button>
            )}
            {confirmButton}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
