// app/(public routes)/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilterPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0];
  const normalizedTag = tag === 'all' ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', normalizedTag],
    queryFn: () => fetchNotes(1, 12, '', normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}
