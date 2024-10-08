import styled from 'styled-components/native';

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  padding: 20px;
  padding-top: ${props => props.insets.top}px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f6f6f6;
`;

const StyledTextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.6)',
  autoCapitalize: 'none',
})`
  height: 40px;
  color: #f6f6f6;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: rgba(255, 255, 255, 0.3);
  border-bottom-width: 2px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding: 10px;
  margin-bottom: 20px;
`;

const TextArea = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.6)',
  autoCapitalize: 'none',
})`
  height: 150px;
  color: #f6f6f6;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: rgba(255, 255, 255, 0.3);
  border-bottom-width: 2px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding: 10px;
  margin-bottom: 20px;
  text-align-vertical: top;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: #333;
`;

const ButtonText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
`;

export {
  Container,
  Label,
  StyledTextInput,
  TextArea,
  StyledText,
  ButtonText,
  Button,
};
