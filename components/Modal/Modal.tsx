'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  readonly children: ReactNode;
  readonly onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
 const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

useEffect(() => {
  const root = document.getElementById('modal-root');
  setModalRoot(root);

  const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  window.addEventListener('keydown', handleEscape);

  return () => {
    window.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = originalOverflow;
  };
}, [onClose]);


  if (!modalRoot) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
