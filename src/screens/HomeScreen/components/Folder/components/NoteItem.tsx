import Divider from '@root/src/components/Divider';
import styled from 'styled-components/native';
import { NoteListItem } from '../types';

interface NoteProps {
  index: number;
  notesLength: number;
  item: NoteListItem;
}

const NoteItem: React.FC<NoteProps> = ({ index, item, notesLength }) => {
  return (
    <>
      <NoteItemContainer>
        <NoteText>{`${item.title}${item.snippet && `: ${item.snippet}`}`}</NoteText>
      </NoteItemContainer>
      {index < notesLength - 1 && (
        <Divider
          color="#e0e0e0"
          opacity={0.2}
          height={1}
          marginHorizontal={9}
        />
      )}
    </>
  );
};

const NoteItemContainer = styled.View`
  margin-top: 5px;
  padding: 8px;
  border-radius: 3px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`;

export default NoteItem;