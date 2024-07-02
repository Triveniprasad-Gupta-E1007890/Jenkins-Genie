import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// const sizes = definePartsStyle({
//   dialog: {
//     borderRadius: 'xl',
//     width: '800px'
//   },
// })
const baseStyle = {
  // xl: definePartsStyle({ dialog: {
  //   minW: 'fit-content'
  // } })
  dialog: {
    _dark: {
      color: '#e3e3e3'
    }
  }
}

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})