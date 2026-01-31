import { QueryClient, dehydrate, hydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from '@/components/NotesDashboard/NotesDashboard'; 
import React from 'react';

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

  const HydrateWrapper = ({ children }: { children: React.ReactNode }) => (
    hydrate({ state: dehydrate(queryClient) }, children)
  );

  return (
    <HydrateWrapper>
      <NoteDetailsClient noteId={id} />
    </HydrateWrapper>
  );
}
