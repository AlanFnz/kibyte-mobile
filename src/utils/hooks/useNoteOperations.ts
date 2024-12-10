import { useDispatch, useSelector } from 'react-redux';

import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '@store/queries/notes';
import { RootState } from '@store/index';
import { addNoteToFolder, setFolders } from '@store/foldersSlice';

export const useNoteOperations = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders);

  const [createNote] = useCreateNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();

  const createNewNote = async ({
    title,
    content,
    folderId,
  }: {
    title: string;
    content: string;
    folderId: number | null;
  }) => {
    if (!folderId) return;
    const createdNote = await createNote({
      title,
      content,
      folderId,
    }).unwrap();

    dispatch(
      addNoteToFolder({
        folderId,
        note: {
          id: createdNote.id,
          title: createdNote.title,
          snippet: createdNote.content ? createdNote.content.slice(0, 50) : '',
          modifiedDate: createdNote.modifiedDate,
        },
      }),
    );

    return createdNote;
  };

  const updateNote = async ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => {
    if (!id) return;
    const updatedNote = await updateNoteMutation({
      id,
      title,
      content,
    }).unwrap();

    const updatedFolders = folders.map(folder => ({
      ...folder,
      notes: folder.notes.map(note =>
        note.id === id
          ? {
              ...note,
              title: updatedNote.title,
              snippet: updatedNote.content
                ? updatedNote.content.slice(0, 50)
                : '',
              modifiedDate: updatedNote.modifiedDate,
            }
          : note,
      ),
    }));

    dispatch(setFolders(updatedFolders));

    return updatedNote;
  };

  return { createNewNote, updateNote };
};
