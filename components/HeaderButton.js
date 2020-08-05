import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props} //eslint-disable-line
    IconComponent={Ionicons}
    iconSize={23}
    color="white"
  />
)

export default CustomHeaderButton
