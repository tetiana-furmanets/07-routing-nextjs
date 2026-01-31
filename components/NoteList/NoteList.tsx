'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  readonly notes: readonly Note[];
  readonly currentTag?: string;
}

export default function NoteList({ notes, currentTag = 'all' }: Readonly<NoteListProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();

const openModal = (noteId: string, tag: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('id', noteId);
  router.push(`/notes/filter/${tag}?${params.toString()}`);
};



  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <div className={css.actions}>
            <button type="button" className={css.link} onClick={() => openModal(note.id, currentTag)}>
            View details
            </button>


          </div>
        </div>
      ))}
    </div>
  );
}
