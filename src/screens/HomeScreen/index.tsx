import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

import BackgroundLayers from '../../components/BackgroundLayers';
import FolderList from './components/FolderList';
import SearchBox from './components/SearchBox';
import NotesResultsList from './components/NotesResultsList';
import FloatingButton from './components/FloatingButton';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const folders = useSelector((state: RootState) => state.folders);
  const [searchQuery, setSearchQuery] = useState('');

  const allNotes = folders.flatMap(folder => folder.notes);
  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <BackgroundLayers testID={'background-layers'} />
      <Container testID={'container'} insets={insets}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {searchQuery ? (
          <NotesResultsList testID={'notes-results'} notes={filteredNotes} />
        ) : (
          <FolderList testID={'folder-list'} folders={folders} />
        )}
        <FloatingButton testID="new-note-button" />
      </Container>
    </>
  );
};

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  justify-content: center;
  padding-top: ${props => props.insets.top}px;
  padding-left: ${props => props.insets.left}px;
  padding-right: ${props => props.insets.right - 2}px;
`;

export default HomeScreen;
