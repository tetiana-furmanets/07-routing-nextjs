import NoteList from '@/components/NoteList/NoteList';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNotesByTag } from '@/lib/api';

interface Props {
  params: { slug: string[] } | Promise<{ slug: string[] }>;
}

export default async function NotesByTagPage({ params }: Props) {
  const resolvedParams = await params;   
  const currentTag = resolvedParams.slug[0] || ''; 
  const notes = await fetchNotesByTag(currentTag);

  return (
    <>
      <NoteList notes={notes} currentTag={currentTag} />
      <NotePreview currentTag={currentTag} /> {/* передаємо тег */}
    </>
  );
}
