// app/@modal/(.)notes/[id]/page.tsx

import Modal from '@/components/Modal/Modal';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: { id: string };
};

export default function NoteModal({ params }: Props) {
  return (
    <Modal>
      <NotePreviewClient id={params.id} />
    </Modal>
  );
}

