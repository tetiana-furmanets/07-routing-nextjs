import { QueryClient, dehydrate, Hydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from '@/components/NotesDashboard/NotesDashboard'; 

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
  <Hydrate state={dehydrate(queryClient)}>
    <NoteDetailsClient noteId={id} />
  </Hydrate>
);

}
