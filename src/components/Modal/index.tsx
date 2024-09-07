import type { ReactElement, ReactNode } from "react";
import { Modal as MantineModal } from "@mantine/core";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): ReactElement => {
  return (
    <MantineModal opened={isOpen} onClose={onClose} centered title={title}>
      {children}
    </MantineModal>
  );
};
