'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

interface NotePreviewProps {
  currentTag: string;
}

export default function NotePreview({ currentTag }: NotePreviewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
  });

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');
    router.push(`/notes/filter/${currentTag}?${params.toString()}`);
  };

  if (!id || isLoading || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Category: {note.category}</p>
      <p>Priority: {note.priority}</p>
      <p>Date: {note.date}</p>
    </Modal>
  );
}
