import { useEffect, useMemo, useState } from 'react'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

import { usePermissions } from '@root/src/hooks/usePermissions'

export const useAudioRecorder = () => {
  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), [])
  const { requestAudioPermissions } = usePermissions()

  const [isRecording, setIsRecording] = useState(false)
  const [recordingResult, setRecordingResult] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener()
    }
  }, [audioRecorderPlayer])

  const startRecording = async () => {
    try {
      const hasPermissions = await requestAudioPermissions()
      if (!hasPermissions) return console.log('Permissions not granted')

      setIsRecording(true)
      await audioRecorderPlayer.startRecorder()

      audioRecorderPlayer.addRecordBackListener(event =>
        console.log('Adding listener', event),
      )
    } catch (error) {
      console.error('Failed to start recording:', error)
      setIsRecording(false)
    }
  }

  const stopRecording = async () => {
    if (!isRecording) return

    try {
      const result = await audioRecorderPlayer.stopRecorder()
      audioRecorderPlayer.removeRecordBackListener()

      setIsRecording(false)
      setRecordingResult(result)
      console.log('🚀 ~ stopRecording ~ result:', result)
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    recordingResult,
  }
}
