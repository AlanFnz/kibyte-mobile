import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import colors from '@theme/colors'

const HeaderButton: React.FC<{
  onPress: () => void
  iconName: string
  containerStyle?: StyleProp<ViewStyle>
}> = ({ onPress, iconName, containerStyle }) => {
  return (
    <ButtonContainer
      style={containerStyle}
      onPress={onPress}
      testID="save-button">
      <Icon name={iconName} size={20} color={colors.common.offWhite} />
    </ButtonContainer>
  )
}

const ButtonContainer = styled(TouchableOpacity)`
  //padding: 0 10px;
`

export default HeaderButton
