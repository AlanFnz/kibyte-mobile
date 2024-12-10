import React from 'react';
import colors from '@theme/colors';
import { TouchableWithoutFeedback } from 'react-native';
import { useFloatingButtonHandlers } from './hooks/useFloatingButtonHandlers';
import { AnimatedButtonContainer, FullCircleIcon, PlusIcon } from './styles';

interface FloatingButtonProps {
  testID?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ testID }) => {
  const {
    isLongPressed,
    animatedStyles,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  } = useFloatingButtonHandlers();

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}>
      <AnimatedButtonContainer style={animatedStyles} testID={testID}>
        {isLongPressed ? (
          <FullCircleIcon color={colors.lowOpacity.redMid} />
        ) : (
          <PlusIcon color={colors.common.darkGray} />
        )}
      </AnimatedButtonContainer>
    </TouchableWithoutFeedback>
  );
};

export default FloatingButton;
