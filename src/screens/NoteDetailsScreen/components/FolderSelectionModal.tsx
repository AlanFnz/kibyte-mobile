import React from 'react'
import styled from 'styled-components/native'
import colors from '@theme/colors'
import { Modal, TouchableOpacity } from 'react-native'
import { Folder } from '@store/foldersSlice'

interface FolderSelectionModalProps {
  visible: boolean
  folders: Folder[]
  selectedFolderId: number | null
  onFolderSelect: (folderId: number | null) => void
  onConfirm: () => void
  onClose: () => void
}

const FolderSelectionModal: React.FC<FolderSelectionModalProps> = ({
  visible,
  folders,
  selectedFolderId,
  onFolderSelect,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <Overlay>
        <ModalContainer>
          <ModalTitle>Select a Folder</ModalTitle>
          <Dropdown>
            {folders.map(folder => (
              <DropdownItem
                key={folder.id}
                isSelected={selectedFolderId === folder.id}
                onPress={() => onFolderSelect(folder.id)}>
                <DropdownText isSelected={selectedFolderId === folder.id}>
                  {folder.folderName}
                </DropdownText>
              </DropdownItem>
            ))}
            <DropdownItem
              onPress={() => console.log('Mock: Create New Folder')}>
              <NewFolderText>+ Create New Folder</NewFolderText>
            </DropdownItem>
          </Dropdown>
          <ConfirmButton onPress={onConfirm}>
            <ConfirmButtonText>Confirm</ConfirmButtonText>
          </ConfirmButton>
        </ModalContainer>
      </Overlay>
    </Modal>
  )
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.View`
  width: 80%;
  border-width: 0.5px;
  background-color: ${colors.lowOpacity.whiteSuperLow};
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 20px;
  border-radius: 10px;
`

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${colors.common.offWhite};
`

const Dropdown = styled.View`
  margin-bottom: 15px;
`

const DropdownItem = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.common.offWhite : 'transparent'};
`

const DropdownText = styled.Text<{ isSelected?: boolean }>`
  font-size: 16px;
  color: ${({ isSelected }) =>
    isSelected ? colors.common.black : colors.common.offWhite};
`

const NewFolderText = styled(DropdownText)`
  color: ${colors.common.lightGray};
`

const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.lowOpacity.black};
  margin-top: 18px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.common.primaryGray};
  justify-content: center;
  align-items: center;
`

const ConfirmButtonText = styled.Text`
  color: white;
  font-weight: bold;
`

export default FolderSelectionModal
