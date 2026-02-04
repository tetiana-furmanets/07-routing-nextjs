import NoteList from '@/components/NoteList/NoteList';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNotesByTag } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const tag = slug[0] ?? 'all';

  const notes = await fetchNotesByTag(tag);

  return (
    <section>
      <main>
        <h1>
          {tag === 'all' ? 'All notes' : `Notes with tag: ${tag}`}
        </h1>

        <NoteList notes={notes} />

        <NotePreview currentTag={tag} />
      </main>
    </section>
  );
}
