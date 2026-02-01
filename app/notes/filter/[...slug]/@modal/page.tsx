'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Note } from '@/types/note';

export default function NotePreview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
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
