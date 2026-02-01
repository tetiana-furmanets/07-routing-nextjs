import axios from 'axios';
import type { Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  try {
    const response = await instance.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage,
        search,
        ...(tag ? { tag } : {}),
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching notes:', error.response?.data || error.message);
    throw error;
  }
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: Note['tag'];
}): Promise<Note> => {
  try {
    const response = await instance.post<Note>('/notes', note);
    return response.data;
  } catch (error: any) {
    console.error('Error creating note:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await instance.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting note:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await instance.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching note by ID:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchNotesByTag = async (tag?: string): Promise<Note[]> => {
  try {
    const tagParam =
      tag && tag.toLowerCase() !== 'all'
        ? tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
        : undefined;

    const data = await fetchNotes(1, 12, '', tagParam);

    return data.notes;
  } catch (error: any) {
    console.error(`Error fetching notes by tag "${tag}":`, error.response?.data || error.message);
    return [];
  }
};





