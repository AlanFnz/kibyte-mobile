import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useFetchNoteDetailsQuery } from '@store/queries/notes';
import { useNoteOperations } from '@hooks/useNoteOperations';
import { formatTimestampToDateTime } from '@utils/time';

export const useNoteDetails = ({
  noteId,
  isNew,
}: {
  noteId: number;
  isNew?: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const { createNewNote, updateNote } = useNoteOperations();
  const { data: note, isLoading } = useFetchNoteDetailsQuery(noteId, {
    skip: isNew,
  });

  const [title, setTitle] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setModifiedDate(formatTimestampToDateTime(note.modifiedDate));
      setContent(note.content || '');
    } else if (isNew) {
      setTitle('');
      setContent('');
      setModifiedDate('');
    }
  }, [note, isNew]);

  const showToast = (isSuccess: boolean) => {
    Toast.show({
      type: isSuccess ? 'success' : 'error',
      text1: isSuccess ? 'Saved successfully!' : 'Something went wrong',
      position: 'bottom',
      bottomOffset: insets.bottom * 3,
      visibilityTime: 1750,
    });
  };

  const handleSave = async () => {
    if (isNew) {
      setIsModalVisible(true);
    } else if (note) {
      try {
        await updateNote({ id: note.id, title, content });
        showToast(true);
      } catch (error) {
        console.error(error);
        showToast(false);
      }
    }
  };

  const handleFolderSelect = (folderId: number | null) => {
    setSelectedFolderId(folderId);
  };

  const handleConfirmFolderSelection = async () => {
    if (selectedFolderId) {
      setIsModalVisible(false);
      try {
        await createNewNote({
          title,
          content,
          folderId: selectedFolderId,
        });
        showToast(true);
      } catch (error) {
        console.error(error);
        showToast(false);
      }
    }
  };

  return {
    title,
    modifiedDate,
    content,
    selectedFolderId,
    isModalVisible,
    isLoading,
    setTitle,
    setContent,
    setIsModalVisible,
    handleSave,
    handleFolderSelect,
    handleConfirmFolderSelection,
  };
};
