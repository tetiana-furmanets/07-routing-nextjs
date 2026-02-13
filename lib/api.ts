// app/lib/api.ts

import axios from 'axios';
import type { Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchNotes = async (page = 1, perPage = 12, search = ''): Promise<FetchNotesResponse> => {
  try {
    const response = await instance.get<FetchNotesResponse>('/notes', { params: { page, perPage, search } });
    return response.data;
  } catch {
    return { notes: [], totalPages: 0 };
  }
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const response = await instance.get<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

export const createNote = async (note: { title: string; content: string; tag: Note['tag'] }): Promise<Note | null> => {
  try {
    const response = await instance.post<Note>('/notes', note);
    return response.data;
  } catch {
    return null;
  }
};

export const deleteNote = async (id: string): Promise<Note | null> => {
  try {
    const response = await instance.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await instance.get<Category[]>('/categories');
    return response.data;
  } catch {
    return [];
  }
};

export const fetchNotesByTag = async (tag?: string, search?: string): Promise<Note[]> => {
  const params: Record<string, string> = {};
  if (tag && tag.toLowerCase() !== 'all') params.tag = tag;
  if (search) params.search = search;

  try {
    const response = await instance.get<FetchNotesResponse>('/notes', { params });
    return response.data.notes;
  } catch {
    return [];
  }
};

