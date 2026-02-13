// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/api';
import type { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery<Note[]>({
    queryKey: ['notes', tag, debounced],
    queryFn: () => fetchNotesByTag(tag, debounced), // додатковий параметр пошуку можна додати у fetchNotesByTag
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="notes-container">
      <SearchBox value={search} onChange={setSearch} />
      <ul>
        {data?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
