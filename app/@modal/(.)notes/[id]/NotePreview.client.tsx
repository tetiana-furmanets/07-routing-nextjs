// app/@modal/(.)notes/[id]/NotePreview.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </>
  );
}
