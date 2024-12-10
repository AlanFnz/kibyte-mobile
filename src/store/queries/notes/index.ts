import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import notesMockData from '@store/mockData/notes.mockData';

export interface Note {
  id: number;
  title: string;
  content?: string;
  folderId: number;
  modifiedDate: number;
}

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Note'],
  endpoints: builder => ({
    fetchNoteDetails: builder.query<Note, number>({
      queryFn: noteId => {
        const note = notesMockData.find(n => n.id === noteId);
        if (note) {
          return { data: note };
        } else {
          return {
            error: {
              status: 404,
              data: { message: 'Note not found' },
            },
          };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Note', id }],
    }),
    createNote: builder.mutation<Note, Omit<Note, 'id' | 'modifiedDate'>>({
      queryFn: newNote => {
        const newId = notesMockData.length
          ? Math.max(...notesMockData.map(n => n.id)) + 1
          : 1;
        const note = { ...newNote, id: newId, modifiedDate: Date.now() };
        notesMockData.push(note);
        return { data: note };
      },
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, Partial<Note> & { id?: number }>({
      queryFn: updatedNote => {
        const index = notesMockData.findIndex(n => n.id === updatedNote.id);
        if (index === -1) {
          return {
            error: {
              status: 404,
              data: { message: 'Note not found' },
            },
          };
        }

        notesMockData[index] = { ...notesMockData[index], ...updatedNote };

        return { data: notesMockData[index] };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Note', id }],
    }),
  }),
});

export const {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
  useCreateNoteMutation,
} = noteApi;
