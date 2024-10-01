import React, { FC, memo, ReactNode, useCallback, useRef } from "react";
import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  isOpen?: boolean;
}

const Modal: FC<ModalProps> = memo(({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <DialogOverlay onClick={handleOverlayClick}>
      <Dialog ref={dialogRef} role="dialog" aria-modal="true">
        <CloseButton onClick={onClose} aria-label="Close dialog">
          ×
        </CloseButton>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </DialogOverlay>
  );
});
const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Dialog = styled.div`
  max-width: 500px;
  max-height: 80vh;
  width: 80%;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  position: relative;
`;

const DialogContent = styled.div`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

export default Modal;
