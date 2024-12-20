import { useEffect, useState } from 'react'

import { useFetchNoteDetailsQuery } from '@store/queries/notes'
import { useNoteOperations } from '@hooks/use-note-operations'

import { formatTimestampToDateTime } from '@utils/time'
import { useFolderSelection } from '@root/src/context/folder-selection'
import { useToast } from '@hooks/use-toast'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@navigation/types'

export const useNoteDetails = ({
  noteId,
  isNew,
}: {
  noteId: number
  isNew?: boolean
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { showToast } = useToast()
  const { createNewNote, updateNote, deleteNote } = useNoteOperations()
  const { showModal } = useFolderSelection()
  const { data: note, isLoading } = useFetchNoteDetailsQuery(noteId, {
    skip: isNew,
  })

  const [title, setTitle] = useState('')
  const [modifiedDate, setModifiedDate] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setModifiedDate(formatTimestampToDateTime(note.modifiedDate))
      setContent(note.content || '')
    } else if (isNew) {
      setTitle('')
      setContent('')
      setModifiedDate('')
    }
  }, [note, isNew])

  const handleSave = async () => {
    if (isNew) {
      showModal(async folderId => {
        try {
          await createNewNote({
            title,
            content,
            folderId,
          })
          showToast({
            isSuccess: true,
            message: 'Note created successfully!',
          })
        } catch (error) {
          console.error(error)
          showToast({
            isSuccess: false,
            message: 'Failed to create note.',
          })
        }
      })
    } else if (note) {
      try {
        await updateNote({ id: note.id, title, content })
        showToast({ isSuccess: true, message: 'Note updated successfully!' })
      } catch (error) {
        console.error(error)
        showToast({ isSuccess: false, message: 'Failed to update note.' })
      }
    }
  }

  const handleDelete = async () => {
    if (!note) return
    try {
      await deleteNote(note.id)
      navigation.navigate('Home')
      showToast({
        isSuccess: true,
        message: 'Note deleted successfully!',
        additionalOffset: 70,
      })
    } catch (error) {
      console.error(error)
      showToast({
        isSuccess: false,
        message: 'Failed to delete note.',
      })
    }
  }

  return {
    title,
    modifiedDate,
    content,
    isLoading,
    setTitle,
    setContent,
    handleSave,
    handleDelete,
  }
}
