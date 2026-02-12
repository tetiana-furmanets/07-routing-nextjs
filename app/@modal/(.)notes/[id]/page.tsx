// app/@modal/(.)notes/[id]/page.tsx
'use client';

import Modal from '@/components/Modal/Modal';
import NotePreviewClient from './NotePreview.client';
import { useRouter } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function NoteModal({ params }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); 
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreviewClient id={params.id} />
    </Modal>
  );
}
