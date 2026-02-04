'use client';

import { useEffect, useState } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Link from 'next/link';

const queryClient = new QueryClient();

function NotesDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debounced],
    queryFn: () => fetchNotes(page, 12, debounced),
    placeholderData: keepPreviousData, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <>
      <h1>Notes</h1>

      <nav>
        <ul>
          <li><Link href="/notes/filter/work">Work</Link></li>
          <li><Link href="/notes/filter/personal">Personal</Link></li>
          <li><Link href="/notes/filter/work/today">Work · Today</Link></li>
          <li><Link href="/notes/filter/work/high">Work · High priority</Link></li>
        </ul>
      </nav>

      <SearchBox value={search} onSearch={setSearch} />
      <button onClick={() => setIsOpen(true)}>Add note</button>

      <NoteList notes={data.notes} />

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default function NotesDashboardWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesDashboard />
    </QueryClientProvider>
  );
}
