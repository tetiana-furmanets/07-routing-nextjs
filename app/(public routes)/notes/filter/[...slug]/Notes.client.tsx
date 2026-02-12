// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const { data, isLoading, error } = useQuery<Note[]>({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotesByTag(tag),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="notes-container">
      <ul>
        {data?.map((note: Note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
