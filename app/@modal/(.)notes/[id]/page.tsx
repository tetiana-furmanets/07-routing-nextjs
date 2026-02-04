'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function NotePreview({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
      <p>Date: {new Date(note.createdAt).toLocaleString()}</p>
    </Modal>
  );
}
