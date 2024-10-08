import styled from 'styled-components/native';

const MainContainer = styled.View`
  width: 96%;
  margin-left: 2%;
  border-radius: 12px;
  margin-bottom: 18px;
  overflow: hidden;
`;

const FolderContainer = styled.View`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const FolderHeader = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 12px;
`;

const FolderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #f6f6f6;
`;

export { MainContainer, FolderContainer, FolderHeader, FolderTitle };
