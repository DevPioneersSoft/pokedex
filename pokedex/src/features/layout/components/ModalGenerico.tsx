import { Modal } from "@mantine/core";
import type { ReactNode } from "react";

interface ModalGenericoProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: string | number;
}

export default function ModalGenerico({
  opened,
  onClose,
  title,
  children,
  size = "md"
}: ModalGenericoProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={size}
      centered
      styles={{
        title: {
          color: "var(--color-secondary-600)",
          fontSize: 18,
          fontWeight: 700
        }
      }}
    >
      {children}
    </Modal>
  );
}